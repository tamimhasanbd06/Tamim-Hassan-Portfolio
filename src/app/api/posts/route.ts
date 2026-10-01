import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { cleanText, validateHttpUrl, validateImageValue } from "@/lib/content-security";
import { ensurePostSchema, getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

type DurationOption = "1-hour" | "6-hours" | "12-hours" | "1-day" | "3-days" | "7-days" | "30-days" | "never";
const durationMs: Record<Exclude<DurationOption, "never">, number> = {
  "1-hour": 3600000, "6-hours": 21600000, "12-hours": 43200000, "1-day": 86400000,
  "3-days": 259200000, "7-days": 604800000, "30-days": 2592000000,
};
function isDuration(value: unknown): value is DurationOption {
  return ["1-hour","6-hours","12-hours","1-day","3-days","7-days","30-days","never"].includes(String(value));
}
function expiryFor(duration: DurationOption) { return duration === "never" ? null : new Date(Date.now() + durationMs[duration]).toISOString(); }

export async function GET(request: NextRequest) {
  try {
    await ensurePostSchema();
    const sql = getDb();
    const visitorId = request.cookies.get("tamim_post_visitor")?.value || "";
    const admin = isAdminRequest(request);
    const posts = await sql`
      SELECT p.id,p.title,p.content,p.image_url,p.link_url,p.created_at,p.expires_at,
        COUNT(DISTINCT pl.id)::int AS likes_count, COUNT(DISTINCT pc.id)::int AS comments_count,
        EXISTS (SELECT 1 FROM post_likes mine WHERE mine.post_id=p.id AND mine.visitor_id=${visitorId}) AS liked_by_me
      FROM posts p LEFT JOIN post_likes pl ON pl.post_id=p.id LEFT JOIN post_comments pc ON pc.post_id=p.id
      WHERE p.expires_at IS NULL OR p.expires_at > NOW() GROUP BY p.id ORDER BY p.created_at DESC`;
    const comments = await sql`SELECT pc.id,pc.post_id,pc.name,pc.message,pc.created_at FROM post_comments pc INNER JOIN posts p ON p.id=pc.post_id WHERE p.expires_at IS NULL OR p.expires_at>NOW() ORDER BY pc.created_at ASC`;
    const grouped = new Map<string, unknown[]>();
    for (const c of comments) { const id=String(c.post_id); const list=grouped.get(id)||[]; list.push({id:String(c.id),name:String(c.name),message:String(c.message),createdAt:new Date(String(c.created_at)).toISOString()}); grouped.set(id,list); }
    return NextResponse.json({success:true,authenticated:admin,posts:posts.map(p=>({id:String(p.id),title:String(p.title||""),content:String(p.content),imageUrl:p.image_url?String(p.image_url):null,linkUrl:p.link_url?String(p.link_url):null,createdAt:new Date(String(p.created_at)).toISOString(),expiresAt:p.expires_at?new Date(String(p.expires_at)).toISOString():null,likesCount:Number(p.likes_count||0),commentsCount:Number(p.comments_count||0),likedByMe:Boolean(p.liked_by_me),comments:grouped.get(String(p.id))||[]}))});
  } catch (error) { console.error(error); return NextResponse.json({success:false,message:"Could not load posts."},{status:500}); }
}

export async function POST(request: NextRequest) {
  try {
    if (!isAdminRequest(request)) return NextResponse.json({success:false,message:"Admin login required."},{status:401});
    await ensurePostSchema();
    const body=await request.json();
    const title=cleanText(body.title,200);
    const content=cleanText(body.content,10000);
    const imageUrl=body.imageUrl ? validateImageValue(body.imageUrl) : null;
    const linkUrl=body.linkUrl ? validateHttpUrl(body.linkUrl) : null;
    const duration=isDuration(body.duration)?body.duration:"never";
    if (!content && !imageUrl && !linkUrl) return NextResponse.json({success:false,message:"Add text, an image, or a link."},{status:400});
    if (body.imageUrl && !imageUrl) return NextResponse.json({success:false,message:"Invalid image or image is too large."},{status:400});
    if (body.linkUrl && !linkUrl) return NextResponse.json({success:false,message:"Enter a valid http(s) link."},{status:400});
    const sql=getDb(); const id=randomUUID();
    await sql`INSERT INTO posts (id,title,content,image_url,link_url,expires_at) VALUES (${id},${title},${content},${imageUrl},${linkUrl},${expiryFor(duration)})`;
    return NextResponse.json({success:true,id},{status:201});
  } catch (error) { console.error(error); return NextResponse.json({success:false,message:"Could not create post."},{status:500}); }
}
