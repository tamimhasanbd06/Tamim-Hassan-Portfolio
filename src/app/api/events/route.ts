import { NextRequest } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { ensurePostSchema, getDb } from "@/lib/db";
import { VISITOR_COOKIE, readVisitorId } from "@/lib/visitor";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

/**
 * Short lived SSE stream for cross-browser updates on serverless deployments.
 * It checks the authoritative database snapshot and sends a small invalidation
 * event; clients reload through the normal, access-controlled APIs.
 */
export async function GET(request: NextRequest) {
  const channel = request.nextUrl.searchParams.get("channel");
  if (channel !== "posts" && channel !== "messages") return new Response("Invalid channel", { status: 400 });
  const admin = isAdminRequest(request);
  const visitorId = readVisitorId(request, VISITOR_COOKIE) ?? "";
  if (channel === "messages" && !admin && !visitorId) return new Response("Conversation session required", { status: 401 });

  try {
    await ensurePostSchema();
    const sql = getDb();
    const snapshot = async () => {
      if (channel === "posts") {
        const rows = await sql`SELECT
          (SELECT COUNT(*)::int FROM posts WHERE expires_at IS NULL OR expires_at > NOW()) AS posts,
          (SELECT COUNT(*)::int FROM post_comments c JOIN posts p ON p.id=c.post_id WHERE p.expires_at IS NULL OR p.expires_at > NOW()) AS comments,
          (SELECT COUNT(*)::int FROM post_likes l JOIN posts p ON p.id=l.post_id WHERE p.expires_at IS NULL OR p.expires_at > NOW()) AS likes,
          GREATEST(
            COALESCE((SELECT MAX(updated_at) FROM posts), 'epoch'::timestamptz),
            COALESCE((SELECT MAX(created_at) FROM post_comments), 'epoch'::timestamptz),
            COALESCE((SELECT MAX(created_at) FROM post_likes), 'epoch'::timestamptz)
          )::text AS latest`;
        const row = rows[0];
        return `${row.posts}:${row.comments}:${row.likes}:${row.latest}`;
      }

      const rows = admin
        ? await sql`SELECT COUNT(DISTINCT m.id)::int AS messages, COUNT(r.id)::int AS replies,
            GREATEST(COALESCE(MAX(m.updated_at), 'epoch'::timestamptz), COALESCE(MAX(r.created_at), 'epoch'::timestamptz))::text AS latest
            FROM messages m LEFT JOIN message_replies r ON r.message_id=m.id`
        : await sql`SELECT COUNT(DISTINCT m.id)::int AS messages, COUNT(r.id)::int AS replies,
            GREATEST(COALESCE(MAX(m.updated_at), 'epoch'::timestamptz), COALESCE(MAX(r.created_at), 'epoch'::timestamptz))::text AS latest
            FROM messages m LEFT JOIN message_replies r ON r.message_id=m.id WHERE m.visitor_id=${visitorId}`;
      return `${rows[0].messages}:${rows[0].replies}:${rows[0].latest}`;
    };

    let initial: string;
    try { initial = await snapshot(); }
    catch { return new Response("Live updates unavailable", { status: 503 }); }

    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        const encoder = new TextEncoder();
        let last = initial;
        let closed = false;
        let checking = false;
        controller.enqueue(encoder.encode("retry: 3000\n\n"));
        const send = (event: string, value = "") => {
          if (!closed) controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(value)}\n\n`));
        };
        send("ready", initial);
        const interval = setInterval(async () => {
          if (closed || checking) return;
          if (channel === "messages" && admin && !isAdminRequest(request)) {
            send("auth-expired");
            cleanup();
            return;
          }
          checking = true;
          try {
            const current = await snapshot();
            if (current !== last) { last = current; send("change", current); }
          } catch { send("degraded", "Reconnecting to live updates"); }
          finally { checking = false; }
        }, 1500);
        const maxAge = setTimeout(cleanup, 25000);
        const abort = () => cleanup();
        function cleanup() {
          if (closed) return;
          closed = true;
          clearInterval(interval);
          clearTimeout(maxAge);
          request.signal.removeEventListener("abort", abort);
          try { controller.close(); } catch { /* Stream already closed by the client. */ }
        }
        request.signal.addEventListener("abort", abort, { once: true });
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error) {
    console.error("LIVE UPDATE STREAM ERROR", error);
    return new Response("Live updates unavailable", { status: 503 });
  }
}
