"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

type PostComment = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

type Post = {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  createdAt: string;
  expiresAt: string | null;
  likesCount: number;
  commentsCount: number;
  likedByMe: boolean;
  comments: PostComment[];
};

type DurationOption =
  | "1-hour"
  | "6-hours"
  | "12-hours"
  | "1-day"
  | "3-days"
  | "7-days"
  | "30-days"
  | "never";

type BlockType = "text" | "image" | "video" | "pdf" | "link";

type ContentBlock = {
  id: string;
  type: BlockType;
  value: string;
  title?: string;
  description?: string;
};

type IconProps = {
  size?: number;
  fill?: string;
};

const REACTIONS = ["👍", "❤️", "🔥", "😍", "👏", "🚀", "💯", "😂"];

const HeartIcon = ({ size = 20, fill = "none" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21.2l7.8-7.7 1.1-1.1a5.5 5.5 0 0 0-.1-7.8z" />
  </svg>
);

const CommentIcon = ({ size = 20 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
  </svg>
);

const PlusIcon = ({ size = 20 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const SendIcon = ({ size = 20 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
);

const TrashIcon = ({ size = 20 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 6h18" />
    <path d="M8 6V4h8v2" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v5M14 11v5" />
  </svg>
);

const UserIcon = ({ size = 20 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" />
  </svg>
);

const ClockIcon = ({ size = 20 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const CalendarIcon = ({ size = 20 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M16 3v4M8 3v4M3 10h18" />
  </svg>
);

const CloseIcon = ({ size = 20 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const ArrowUpIcon = ({ size = 17 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m18 15-6-6-6 6" />
  </svg>
);

const ArrowDownIcon = ({ size = 17 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const CopyIcon = ({ size = 17 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const ExternalLinkIcon = ({ size = 18 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M14 3h7v7" />
    <path d="M10 14 21 3" />
    <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
  </svg>
);

const ImageIcon = ({ size = 20 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="m21 15-5-5L5 21" />
  </svg>
);

const VideoIcon = ({ size = 20 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="5" width="15" height="14" rx="2" />
    <path d="m18 10 3-2v8l-3-2z" />
  </svg>
);

const FileIcon = ({ size = 20 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
  </svg>
);

const TypeIcon = ({ size = 20 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 7V4h16v3" />
    <path d="M9 20h6" />
    <path d="M12 4v16" />
  </svg>
);

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

function remainingTime(expiresAt: string | null) {
  if (!expiresAt) return "No expiry";

  const difference = new Date(expiresAt).getTime() - Date.now();

  if (difference <= 0) return "Expired";

  const days = Math.floor(difference / 86_400_000);
  const hours = Math.floor((difference / 3_600_000) % 24);
  const minutes = Math.floor((difference / 60_000) % 60);

  if (days > 0) return `${days}d ${hours}h remaining`;
  if (hours > 0) return `${hours}h ${minutes}m remaining`;

  return `${Math.max(minutes, 1)}m remaining`;
}

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function normalizeUrl(value: string) {
  const trimmed = value.trim();

  if (!trimmed) return "";

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

function isHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Automatically detects what the user pasted.
 *
 * Examples:
 * image.jpg      -> image
 * video.mp4      -> video
 * document.pdf   -> pdf
 * https://...    -> link
 * hello world    -> text
 */
function detectValueType(value: string): BlockType {
  const trimmed = value.trim();

  if (!trimmed) return "text";

  const normalized = normalizeUrl(trimmed);

  if (!isHttpUrl(normalized)) {
    return "text";
  }

  try {
    const url = new URL(normalized);
    const pathname = url.pathname.toLowerCase();

    if (/\.(jpg|jpeg|png|webp|gif|svg|avif|bmp)(?:$|\?)/i.test(pathname)) {
      return "image";
    }

    if (/\.(mp4|webm|ogg|mov|m4v)(?:$|\?)/i.test(pathname)) {
      return "video";
    }

    if (/\.pdf(?:$|\?)/i.test(pathname)) {
      return "pdf";
    }

    return "link";
  } catch {
    return "text";
  }
}

function createBlock(type: BlockType, value = ""): ContentBlock {
  return {
    id: makeId(),
    type,
    value,
    title: "",
    description: "",
  };
}

function parseContent(content: string): ContentBlock[] {
  if (!content?.trim()) {
    return [];
  }

  try {
    const parsed = JSON.parse(content);

    if (
      parsed &&
      typeof parsed === "object" &&
      Array.isArray(parsed.blocks)
    ) {
      return parsed.blocks
        .filter(
          (block: unknown): block is ContentBlock =>
            Boolean(
              block &&
                typeof block === "object" &&
                "type" in block &&
                "value" in block,
            ),
        )
        .map((block) => ({
          id: block.id || makeId(),
          type: block.type,
          value: String(block.value || ""),
          title: block.title || "",
          description: block.description || "",
        }));
    }
  } catch {
    // Legacy plain text content.
  }

  return [
    {
      id: makeId(),
      type: "text",
      value: content,
      title: "",
      description: "",
    },
  ];
}

function serializeBlocks(blocks: ContentBlock[]) {
  return JSON.stringify({
    version: 2,
    blocks,
  });
}

function blockLabel(type: BlockType) {
  switch (type) {
    case "text":
      return "Text";
    case "image":
      return "Image";
    case "video":
      return "Video";
    case "pdf":
      return "PDF";
    case "link":
      return "Website";
  }
}

function BlockTypeIcon({
  type,
  size = 18,
}: {
  type: BlockType;
  size?: number;
}) {
  if (type === "text") return <TypeIcon size={size} />;
  if (type === "image") return <ImageIcon size={size} />;
  if (type === "video") return <VideoIcon size={size} />;
  if (type === "pdf") return <FileIcon size={size} />;
  return <ExternalLinkIcon size={size} />;
}

function renderBlocksForPost(content: string) {
  const blocks = parseContent(content);

  return blocks.map((block) => {
    if (!block.value.trim()) return null;

    if (block.type === "text") {
      return (
        <div key={block.id} className="space-y-2">
          {block.title && (
            <h3 className="text-lg font-bold text-white sm:text-xl">
              {block.title}
            </h3>
          )}

          {block.description && (
            <p className="text-sm leading-6 text-cyan-100/70">
              {block.description}
            </p>
          )}

          <p className="whitespace-pre-wrap break-words text-[15px] leading-8 text-slate-300 sm:text-base">
            {block.value}
          </p>
        </div>
      );
    }

    if (block.type === "image") {
      return (
        <div
          key={block.id}
          className="overflow-hidden rounded-2xl border border-cyan-400/10 bg-black/30"
        >
          {block.title && (
            <div className="border-b border-white/10 px-4 py-3">
              <h3 className="font-semibold text-white">{block.title}</h3>
              {block.description && (
                <p className="mt-1 text-sm text-slate-500">
                  {block.description}
                </p>
              )}
            </div>
          )}

          <div className="flex min-h-[180px] items-center justify-center bg-black/20 p-2 sm:min-h-[280px] sm:p-4">
            <img
              src={block.value}
              alt={block.title || "Post image"}
              className="max-h-[720px] w-full rounded-xl object-contain"
              loading="lazy"
            />
          </div>
        </div>
      );
    }

    if (block.type === "video") {
      return (
        <div
          key={block.id}
          className="overflow-hidden rounded-2xl border border-cyan-400/10 bg-black"
        >
          {block.title && (
            <div className="border-b border-white/10 bg-white/[0.03] px-4 py-3">
              <h3 className="font-semibold text-white">{block.title}</h3>
              {block.description && (
                <p className="mt-1 text-sm text-slate-500">
                  {block.description}
                </p>
              )}
            </div>
          )}

          <div className="aspect-video w-full">
            <video
              src={block.value}
              controls
              playsInline
              preload="metadata"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      );
    }

    if (block.type === "pdf") {
      return (
        <div
          key={block.id}
          className="overflow-hidden rounded-2xl border border-cyan-400/10 bg-black/30"
        >
          <div className="flex flex-col gap-3 border-b border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-semibold text-white">
                {block.title || "PDF Document"}
              </h3>

              {block.description && (
                <p className="mt-1 text-sm text-slate-500">
                  {block.description}
                </p>
              )}
            </div>

            <a
              href={block.value}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2.5 text-xs font-bold text-white transition hover:-translate-y-0.5"
            >
              <ExternalLinkIcon size={15} />
              Open PDF
            </a>
          </div>

          <iframe
            src={block.value}
            title={block.title || "PDF document"}
            className="h-[420px] w-full bg-white sm:h-[600px] lg:h-[700px]"
          />
        </div>
      );
    }

    return (
      <a
        key={block.id}
        href={block.value}
        target="_blank"
        rel="noopener noreferrer"
        className="group block rounded-2xl border border-cyan-400/15 bg-gradient-to-br from-blue-500/[0.08] to-cyan-400/[0.04] p-5 transition hover:border-cyan-400/30 hover:bg-cyan-400/[0.08]"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/10">
            <ExternalLinkIcon size={21} />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-white transition group-hover:text-cyan-300">
              {block.title || "Open Website"}
            </h3>

            {block.description && (
              <p className="mt-1 text-sm leading-6 text-slate-500">
                {block.description}
              </p>
            )}

            <p className="mt-2 break-all text-xs text-cyan-400/70">
              {block.value}
            </p>
          </div>
        </div>
      </a>
    );
  });
}

export default function MyPostPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [expiredCount, setExpiredCount] = useState(0);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [showCreatePost, setShowCreatePost] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [duration, setDuration] =
    useState<DurationOption>("7-days");

  const [commentNames, setCommentNames] = useState<
    Record<string, string>
  >({});
  const [commentTexts, setCommentTexts] = useState<
    Record<string, string>
  >({});
  const [showComments, setShowComments] = useState<
    Record<string, boolean>
  >({});

  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const [, setTimerTick] = useState(0);

  /**
   * New content editor state.
   */
  const [blocks, setBlocks] = useState<ContentBlock[]>([
    createBlock("text"),
  ]);

  /**
   * One universal Value field.
   * User can paste anything here.
   */
  const [smartValue, setSmartValue] = useState("");

  /**
   * Local emoji reactions.
   *
   * These are intentionally local because the current backend
   * has no reaction endpoint.
   */
  const [reactionState, setReactionState] = useState<
    Record<
      string,
      {
        selected: string | null;
        counts: Record<string, number>;
      }
    >
  >({});

  const detectedType = useMemo(
    () => detectValueType(smartValue),
    [smartValue],
  );

  const loadPosts = useCallback(async () => {
    try {
      setError("");

      const response = await fetch("/api/posts", {
        cache: "no-store",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not load posts.");
      }

      setPosts(data.posts || []);
      setAuthenticated(Boolean(data.authenticated));
      setExpiredCount(Number(data.expiredCount || 0));
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Could not load posts.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPosts();
  }, [loadPosts]);

  useEffect(() => {
    const timer = window.setInterval(
      () => setTimerTick((tick) => tick + 1),
      30_000,
    );

    return () => window.clearInterval(timer);
  }, []);

  function resetEditor() {
    setTitle("");
    setContent("");
    setImageUrl("");
    setDuration("7-days");
    setSmartValue("");
    setBlocks([createBlock("text")]);
  }

  function addManualBlock(type: BlockType) {
    setBlocks((current) => [...current, createBlock(type)]);
  }

  function updateBlock(
    blockId: string,
    changes: Partial<ContentBlock>,
  ) {
    setBlocks((current) =>
      current.map((block) =>
        block.id === blockId
          ? { ...block, ...changes }
          : block,
      ),
    );
  }

  function removeBlock(blockId: string) {
    setBlocks((current) => {
      const next = current.filter((block) => block.id !== blockId);

      return next.length ? next : [createBlock("text")];
    });
  }

  function duplicateBlock(blockId: string) {
    setBlocks((current) => {
      const index = current.findIndex(
        (block) => block.id === blockId,
      );

      if (index === -1) return current;

      const original = current[index];

      const copy: ContentBlock = {
        ...original,
        id: makeId(),
        title: original.title
          ? `${original.title} Copy`
          : "",
      };

      const next = [...current];
      next.splice(index + 1, 0, copy);

      return next;
    });
  }

  function moveBlock(blockId: string, direction: -1 | 1) {
    setBlocks((current) => {
      const index = current.findIndex(
        (block) => block.id === blockId,
      );

      const targetIndex = index + direction;

      if (
        index === -1 ||
        targetIndex < 0 ||
        targetIndex >= current.length
      ) {
        return current;
      }

      const next = [...current];
      const temp = next[index];

      next[index] = next[targetIndex];
      next[targetIndex] = temp;

      return next;
    });
  }

  /**
   * Add the universal Value automatically.
   *
   * Example:
   * https://site.com/photo.jpg
   * -> Image block
   *
   * https://site.com/video.mp4
   * -> Video block
   *
   * https://site.com/file.pdf
   * -> PDF block
   *
   * https://google.com
   * -> Website block
   *
   * Hello world
   * -> Text block
   */
  function addSmartValue() {
    const value = smartValue.trim();

    if (!value) {
      setError("Please enter a value first.");
      return;
    }

    const type = detectValueType(value);

    const block = createBlock(type, value);

    if (type === "text") {
      block.title = "Text";
    }

    if (type === "image") {
      block.title = "Image";
    }

    if (type === "video") {
      block.title = "Video";
    }

    if (type === "pdf") {
      block.title = "PDF Document";
    }

    if (type === "link") {
      block.title = "Website";
    }

    setBlocks((current) => {
      if (
        current.length === 1 &&
        current[0].type === "text" &&
        !current[0].value.trim()
      ) {
        return [block];
      }

      return [...current, block];
    });

    setSmartValue("");
    setError("");
  }

  function addSmartValuesFromLines() {
    const values = smartValue
      .split(/\r?\n/)
      .map((item) => item.trim())
      .filter(Boolean);

    if (!values.length) {
      setError("Please enter at least one value.");
      return;
    }

    const generated = values.map((value) => {
      const type = detectValueType(value);

      return {
        ...createBlock(type, value),
        title:
          type === "text"
            ? "Text"
            : type === "image"
              ? "Image"
              : type === "video"
                ? "Video"
                : type === "pdf"
                  ? "PDF Document"
                  : "Website",
      };
    });

    setBlocks((current) => {
      if (
        current.length === 1 &&
        current[0].type === "text" &&
        !current[0].value.trim()
      ) {
        return generated;
      }

      return [...current, ...generated];
    });

    setSmartValue("");
    setError("");
  }

  function toggleReaction(postId: string, reaction: string) {
    setReactionState((current) => {
      const existing = current[postId] || {
        selected: null,
        counts: {},
      };

      const selected = existing.selected;

      if (selected === reaction) {
        return {
          ...current,
          [postId]: {
            selected: null,
            counts: {
              ...existing.counts,
              [reaction]: Math.max(
                0,
                Number(existing.counts[reaction] || 0) - 1,
              ),
            },
          },
        };
      }

      const nextCounts = {
        ...existing.counts,
      };

      if (selected) {
        nextCounts[selected] = Math.max(
          0,
          Number(nextCounts[selected] || 0) - 1,
        );
      }

      nextCounts[reaction] =
        Number(nextCounts[reaction] || 0) + 1;

      return {
        ...current,
        [postId]: {
          selected: reaction,
          counts: nextCounts,
        },
      };
    });
  }

  async function createPost(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const cleanBlocks = blocks.filter(
      (block) => block.value.trim() !== "",
    );

    if (!title.trim()) {
      setError("Post title is required.");
      return;
    }

    if (!cleanBlocks.length) {
      setError("Please add at least one content value.");
      return;
    }

    try {
      setActionLoading(true);
      setError("");
      setNotice("");

      const serializedContent =
        serializeBlocks(cleanBlocks);

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: title.trim(),
          content: serializedContent,
          imageUrl: imageUrl.trim(),
          duration,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Could not create post.",
        );
      }

      resetEditor();

      setShowCreatePost(false);

      setNotice("Post published successfully.");

      await loadPosts();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Could not create post.",
      );
    } finally {
      setActionLoading(false);
    }
  }

  async function deletePost(postId: string) {
    if (
      !window.confirm(
        "Delete this post permanently?",
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        `/api/posts/${postId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Could not delete post.",
        );
      }

      setNotice("Post deleted successfully.");

      await loadPosts();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Could not delete post.",
      );
    }
  }

  async function toggleLike(postId: string) {
    try {
      const response = await fetch(
        `/api/posts/${postId}/like`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Could not update like.",
        );
      }

      setPosts((current) =>
        current.map((post) =>
          post.id === postId
            ? {
                ...post,
                likedByMe: Boolean(data.liked),
                likesCount: Number(data.likesCount),
              }
            : post,
        ),
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Could not update like.",
      );
    }
  }

  async function addComment(postId: string) {
    const name = commentNames[postId]?.trim();
    const message = commentTexts[postId]?.trim();

    if (!name || !message) {
      setError("Name and comment are required.");
      return;
    }

    try {
      setError("");

      const response = await fetch(
        `/api/posts/${postId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            message,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Could not add comment.",
        );
      }

      setCommentTexts((current) => ({
        ...current,
        [postId]: "",
      }));

      setShowComments((current) => ({
        ...current,
        [postId]: true,
      }));

      await loadPosts();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Could not add comment.",
      );
    }
  }

  async function deleteComment(
    postId: string,
    commentId: string,
  ) {
    if (!window.confirm("Delete this comment?")) {
      return;
    }

    try {
      const response = await fetch(
        `/api/posts/${postId}/comments/${commentId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Could not delete comment.",
        );
      }

      await loadPosts();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Could not delete comment.",
      );
    }
  }

  async function logout() {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    setAuthenticated(false);
    setShowCreatePost(false);

    setNotice("Logged out. Public view is active.");

    await loadPosts();
  }

  function goHome() {
    window.location.href = "/";
  }

  function copyPostLink(postId: string) {
    const url = `${window.location.origin}/my-post#post-${postId}`;

    void navigator.clipboard
      ?.writeText(url)
      .then(() => {
        setNotice("Post link copied.");
      })
      .catch(() => {
        setError("Could not copy post link.");
      });
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#020617] px-4">
        <div className="relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-slate-950/70 px-7 py-5 text-sm font-medium text-cyan-300 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
          Loading posts...
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] px-4 py-20 text-white sm:px-6 lg:px-8">
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[650px] w-[900px] -translate-x-1/2 rounded-full bg-blue-600/[0.12] blur-[150px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-[-200px] h-[500px] w-[500px] rounded-full bg-cyan-500/[0.08] blur-[150px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "55px 55px",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* Header */}
        <section className="mb-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
                <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
                Personal Content Studio
              </div>

              <p className="mb-2 text-sm font-semibold text-cyan-400">
                Tamim Hasan
              </p>

              <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                My Posts
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                Create and manage text, images, videos, PDFs,
                websites, reactions, likes and comments from one
                premium responsive dashboard.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={goHome}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-400/20 bg-white/[0.04] px-5 py-3 text-sm font-bold text-cyan-200 transition hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-cyan-400/[0.08]"
              >
                ← Back to Home
              </button>

              {authenticated && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setError("");
                      setNotice("");
                      setShowCreatePost(true);
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:shadow-cyan-500/20"
                  >
                    <PlusIcon size={18} />
                    Create Post
                  </button>

                  <button
                    type="button"
                    onClick={logout}
                    className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-700 to-cyan-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>

          {error && (
            <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300 backdrop-blur-xl">
              {error}
            </div>
          )}

          {notice && (
            <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.06] p-4 text-sm text-cyan-200 backdrop-blur-xl">
              {notice}
            </div>
          )}

          {/* Stats */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl">
              <p className="text-3xl font-black text-white">
                {posts.length}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Active Posts
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl">
              <p className="text-3xl font-black text-white">
                {posts.reduce(
                  (sum, post) => sum + post.likesCount,
                  0,
                )}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Total Likes
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl">
              <p className="text-3xl font-black text-white">
                {posts.reduce(
                  (sum, post) =>
                    sum + post.commentsCount,
                  0,
                )}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Comments
              </p>
            </div>
          </div>
        </section>

        {posts.length === 0 && (
          <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-12 text-center shadow-2xl backdrop-blur-xl">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-400/20 text-cyan-300">
              <CommentIcon size={28} />
            </div>

            <h2 className="text-2xl font-bold text-white">
              No active posts
            </h2>

            <p className="mt-2 text-slate-500">
              Create your first post to get started.
            </p>
          </div>
        )}

        {/* Posts */}
        <section className="space-y-7">
          {posts.map((post) => {
            const localReactions =
              reactionState[post.id];

            return (
              <article
                id={`post-${post.id}`}
                key={post.id}
                className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/65 shadow-2xl shadow-black/30 backdrop-blur-2xl"
              >
                {/* Post Header */}
                <div className="p-5 sm:p-7">
                  <div className="flex justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/10">
                        <UserIcon size={22} />
                      </div>

                      <div className="min-w-0">
                        <p className="font-bold text-white">
                          Tamim Hasan
                        </p>

                        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <CalendarIcon size={13} />
                            {formatDate(post.createdAt)}
                          </span>

                          <span className="flex items-center gap-1 text-cyan-400">
                            <ClockIcon size={13} />
                            {remainingTime(post.expiresAt)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          copyPostLink(post.id)
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-500 transition hover:border-cyan-400/20 hover:bg-cyan-400/[0.06] hover:text-cyan-300"
                        aria-label="Copy post link"
                      >
                        <CopyIcon size={16} />
                      </button>

                      {authenticated && (
                        <button
                          type="button"
                          onClick={() =>
                            deletePost(post.id)
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-500 transition hover:border-red-400/20 hover:bg-red-500/10 hover:text-red-400"
                          aria-label="Delete post"
                        >
                          <TrashIcon size={17} />
                        </button>
                      )}
                    </div>
                  </div>

                  <h2 className="mt-6 text-2xl font-black tracking-tight text-white sm:text-3xl">
                    {post.title}
                  </h2>

                  {/* Featured image */}
                  {post.imageUrl && (
                    <div className="mt-6 overflow-hidden rounded-2xl border border-cyan-400/10 bg-black/30">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="max-h-[720px] w-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Dynamic content */}
                  <div className="mt-6 space-y-5">
                    {renderBlocksForPost(
                      post.content,
                    )}
                  </div>
                </div>

                {/* Reactions */}
                <div className="border-t border-white/10 bg-white/[0.015] px-5 py-4 sm:px-7">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="mr-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
                      React
                    </span>

                    {REACTIONS.map((reaction) => {
                      const count = Number(
                        localReactions?.counts[
                          reaction
                        ] || 0,
                      );

                      const selected =
                        localReactions?.selected ===
                        reaction;

                      return (
                        <button
                          key={reaction}
                          type="button"
                          onClick={() =>
                            toggleReaction(
                              post.id,
                              reaction,
                            )
                          }
                          className={`group inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition ${
                            selected
                              ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-200"
                              : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-cyan-400/20 hover:bg-cyan-400/[0.05] hover:text-white"
                          }`}
                        >
                          <span className="text-base transition group-hover:scale-110">
                            {reaction}
                          </span>

                          {count > 0 && (
                            <span className="text-xs">
                              {count}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Counts */}
                <div className="flex items-center justify-between border-y border-white/10 px-5 py-3 text-sm text-slate-500 sm:px-7">
                  <span>
                    {post.likesCount}{" "}
                    {post.likesCount === 1
                      ? "Like"
                      : "Likes"}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setShowComments(
                        (current) => ({
                          ...current,
                          [post.id]:
                            !current[post.id],
                        }),
                      )
                    }
                    className="transition hover:text-cyan-300"
                  >
                    {post.commentsCount}{" "}
                    {post.commentsCount === 1
                      ? "Comment"
                      : "Comments"}
                  </button>
                </div>

                {/* Like / Comment */}
                <div className="grid grid-cols-2">
                  <button
                    type="button"
                    onClick={() =>
                      toggleLike(post.id)
                    }
                    className={`flex items-center justify-center gap-2 py-4 text-sm font-bold transition ${
                      post.likedByMe
                        ? "bg-cyan-400/[0.06] text-cyan-300"
                        : "text-slate-400 hover:bg-white/[0.03] hover:text-white"
                    }`}
                  >
                    <HeartIcon
                      size={19}
                      fill={
                        post.likedByMe
                          ? "currentColor"
                          : "none"
                      }
                    />
                    {post.likedByMe
                      ? "Liked"
                      : "Like"}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setShowComments(
                        (current) => ({
                          ...current,
                          [post.id]: true,
                        }),
                      )
                    }
                    className="flex items-center justify-center gap-2 border-l border-white/10 py-4 text-sm font-bold text-slate-400 transition hover:bg-white/[0.03] hover:text-white"
                  >
                    <CommentIcon size={19} />
                    Comment
                  </button>
                </div>

                {/* Comments */}
                {showComments[post.id] && (
                  <div className="border-t border-white/10 p-5 sm:p-7">
                    <div className="space-y-4">
                      {post.comments.map(
                        (comment) => (
                          <div
                            key={comment.id}
                            className="flex items-start gap-3"
                          >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-400/20 text-cyan-300">
                              <UserIcon size={17} />
                            </div>

                            <div className="min-w-0 flex-1 rounded-2xl border border-white/5 bg-white/[0.035] px-4 py-3">
                              <div className="flex justify-between gap-3">
                                <div>
                                  <p className="text-sm font-bold text-white">
                                    {comment.name}
                                  </p>

                                  <p className="text-[11px] text-slate-600">
                                    {formatDate(
                                      comment.createdAt,
                                    )}
                                  </p>
                                </div>

                                {authenticated && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      deleteComment(
                                        post.id,
                                        comment.id,
                                      )
                                    }
                                    className="text-slate-600 transition hover:text-red-400"
                                    aria-label="Delete comment"
                                  >
                                    <CloseIcon
                                      size={15}
                                    />
                                  </button>
                                )}
                              </div>

                              <p className="mt-2 break-words text-sm leading-6 text-slate-300">
                                {comment.message}
                              </p>
                            </div>
                          </div>
                        ),
                      )}

                      {post.comments.length ===
                        0 && (
                        <p className="py-4 text-center text-sm text-slate-600">
                          No comments yet. Be the
                          first to comment.
                        </p>
                      )}
                    </div>

                    {/* Comment form */}
                    <div className="mt-5 rounded-2xl border border-cyan-400/10 bg-white/[0.025] p-4">
                      <input
                        type="text"
                        value={
                          commentNames[post.id] ||
                          ""
                        }
                        onChange={(event) =>
                          setCommentNames(
                            (current) => ({
                              ...current,
                              [post.id]:
                                event.target.value,
                            }),
                          )
                        }
                        placeholder="Your name"
                        maxLength={100}
                        className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-700 focus:border-cyan-400/40"
                      />

                      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                        <textarea
                          value={
                            commentTexts[post.id] ||
                            ""
                          }
                          onChange={(event) =>
                            setCommentTexts(
                              (current) => ({
                                ...current,
                                [post.id]:
                                  event.target.value,
                              }),
                            )
                          }
                          placeholder="Write a comment..."
                          maxLength={2000}
                          rows={3}
                          className="min-w-0 flex-1 resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-slate-700 focus:border-cyan-400/40"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            addComment(post.id)
                          }
                          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 text-sm font-bold text-white shadow-lg shadow-cyan-500/10 transition hover:-translate-y-0.5"
                        >
                          <SendIcon size={17} />
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </section>

        {authenticated && expiredCount > 0 && (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-center text-sm text-slate-600">
            {expiredCount} expired{" "}
            {expiredCount === 1 ? "post" : "posts"}{" "}
            hidden from visitors.
          </div>
        )}
      </div>

      {/* ======================================================
          CREATE POST MODAL
      ====================================================== */}
      {authenticated && showCreatePost && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/80 p-3 backdrop-blur-md sm:p-5">
          <div className="flex min-h-full items-center justify-center py-4">
            <div className="w-full max-w-5xl overflow-hidden rounded-[28px] border border-cyan-400/15 bg-[#04101f] shadow-2xl shadow-cyan-500/10">
              {/* Modal header */}
              <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-[#04101f]/95 p-5 backdrop-blur-xl sm:p-6">
                <div>
                  <div className="mb-2 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-300">
                    Content Studio
                  </div>

                  <h2 className="text-xl font-black text-white sm:text-2xl">
                    Create New Post
                  </h2>

                  <p className="mt-1 text-xs text-slate-600">
                    Paste any value and the editor will
                    automatically detect its type.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowCreatePost(false)
                  }
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-500 transition hover:border-cyan-400/20 hover:text-white"
                  aria-label="Close"
                >
                  <CloseIcon size={19} />
                </button>
              </div>

              <form
                onSubmit={createPost}
                className="p-5 sm:p-6"
              >
                <div className="grid gap-7 lg:grid-cols-[0.85fr_1.15fr]">
                  {/* LEFT */}
                  <div className="space-y-5">
                    {/* Title */}
                    <div>
                      <label className="text-sm font-bold text-slate-300">
                        Post Title
                      </label>

                      <input
                        value={title}
                        onChange={(event) =>
                          setTitle(event.target.value)
                        }
                        required
                        maxLength={200}
                        placeholder="Enter post title"
                        className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-white outline-none placeholder:text-slate-700 focus:border-cyan-400/40"
                      />
                    </div>

                    {/* Universal Value */}
                    <div className="rounded-2xl border border-cyan-400/15 bg-gradient-to-br from-blue-500/[0.07] to-cyan-400/[0.04] p-4 sm:p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <label className="text-sm font-black text-white">
                            Smart Value
                          </label>

                          <p className="mt-1 text-xs leading-5 text-slate-500">
                            Paste text, image URL, video
                            URL, PDF URL or website URL.
                            Type is detected automatically.
                          </p>
                        </div>

                        <div className="shrink-0 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-3 py-2 text-xs font-black text-white">
                          {blockLabel(
                            detectedType,
                          )}
                        </div>
                      </div>

                      <textarea
                        value={smartValue}
                        onChange={(event) =>
                          setSmartValue(
                            event.target.value,
                          )
                        }
                        rows={6}
                        placeholder={`Examples:

Hello world

https://example.com/image.jpg

https://example.com/video.mp4

https://example.com/document.pdf

https://example.com`}
                        className="mt-4 w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-slate-700 focus:border-cyan-400/40"
                      />

                      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                        <button
                          type="button"
                          onClick={addSmartValue}
                          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 text-sm font-black text-white transition hover:-translate-y-0.5"
                        >
                          <PlusIcon size={17} />
                          Add Detected Value
                        </button>

                        <button
                          type="button"
                          onClick={
                            addSmartValuesFromLines
                          }
                          className="flex items-center justify-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/[0.05] px-4 py-3 text-sm font-bold text-cyan-200 transition hover:bg-cyan-400/[0.1]"
                        >
                          Add All Lines
                        </button>
                      </div>
                    </div>

                    {/* Featured Image */}
                    <div>
                      <label className="text-sm font-bold text-slate-300">
                        Featured Image URL{" "}
                        <span className="font-normal text-slate-600">
                          optional
                        </span>
                      </label>

                      <input
                        type="url"
                        value={imageUrl}
                        onChange={(event) =>
                          setImageUrl(
                            event.target.value,
                          )
                        }
                        placeholder="https://example.com/cover.jpg"
                        className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-white outline-none placeholder:text-slate-700 focus:border-cyan-400/40"
                      />
                    </div>

                    {/* Duration */}
                    <div>
                      <label className="text-sm font-bold text-slate-300">
                        Post Duration
                      </label>

                      <select
                        value={duration}
                        onChange={(event) =>
                          setDuration(
                            event.target
                              .value as DurationOption,
                          )
                        }
                        className="mt-2 w-full rounded-xl border border-white/10 bg-[#081525] px-4 py-3 text-white outline-none focus:border-cyan-400/40"
                      >
                        <option value="1-hour">
                          1 Hour
                        </option>
                        <option value="6-hours">
                          6 Hours
                        </option>
                        <option value="12-hours">
                          12 Hours
                        </option>
                        <option value="1-day">
                          1 Day
                        </option>
                        <option value="3-days">
                          3 Days
                        </option>
                        <option value="7-days">
                          7 Days
                        </option>
                        <option value="30-days">
                          30 Days
                        </option>
                        <option value="never">
                          Keep Forever
                        </option>
                      </select>
                    </div>

                    {/* Manual add */}
                    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-600">
                        Manual Blocks
                      </p>

                      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                        <button
                          type="button"
                          onClick={() =>
                            addManualBlock("text")
                          }
                          className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-xs font-bold text-slate-300 transition hover:border-cyan-400/20 hover:text-cyan-300"
                        >
                          + Text
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            addManualBlock("image")
                          }
                          className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-xs font-bold text-slate-300 transition hover:border-cyan-400/20 hover:text-cyan-300"
                        >
                          + Image
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            addManualBlock("video")
                          }
                          className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-xs font-bold text-slate-300 transition hover:border-cyan-400/20 hover:text-cyan-300"
                        >
                          + Video
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            addManualBlock("pdf")
                          }
                          className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-xs font-bold text-slate-300 transition hover:border-cyan-400/20 hover:text-cyan-300"
                        >
                          + PDF
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            addManualBlock("link")
                          }
                          className="col-span-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-xs font-bold text-slate-300 transition hover:border-cyan-400/20 hover:text-cyan-300 sm:col-span-4"
                        >
                          + Website Link
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT / BLOCK EDITOR */}
                  <div className="min-w-0">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-black text-white">
                          Content Blocks
                        </h3>
                        <p className="text-xs text-slate-600">
                          {blocks.length}{" "}
                          {blocks.length === 1
                            ? "block"
                            : "blocks"}{" "}
                          • Drag-free ordering with
                          arrows
                        </p>
                      </div>

                      <div className="rounded-full border border-cyan-400/15 bg-cyan-400/[0.05] px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-cyan-300">
                        Auto Layout
                      </div>
                    </div>

                    <div className="space-y-4">
                      {blocks.map(
                        (block, index) => (
                          <div
                            key={block.id}
                            className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]"
                          >
                            {/* Block toolbar */}
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-white/[0.025] px-3 py-3">
                              <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600/20 to-cyan-400/20 text-cyan-300">
                                  <BlockTypeIcon
                                    type={
                                      block.type
                                    }
                                    size={16}
                                  />
                                </div>

                                <div>
                                  <p className="text-xs font-black text-white">
                                    {blockLabel(
                                      block.type,
                                    )}
                                  </p>

                                  <p className="text-[10px] text-slate-600">
                                    Block #
                                    {index + 1}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() =>
                                    moveBlock(
                                      block.id,
                                      -1,
                                    )
                                  }
                                  disabled={
                                    index === 0
                                  }
                                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/5 hover:text-cyan-300 disabled:opacity-20"
                                  aria-label="Move block up"
                                >
                                  <ArrowUpIcon />
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    moveBlock(
                                      block.id,
                                      1,
                                    )
                                  }
                                  disabled={
                                    index ===
                                    blocks.length -
                                      1
                                  }
                                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/5 hover:text-cyan-300 disabled:opacity-20"
                                  aria-label="Move block down"
                                >
                                  <ArrowDownIcon />
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    duplicateBlock(
                                      block.id,
                                    )
                                  }
                                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/5 hover:text-cyan-300"
                                  aria-label="Duplicate block"
                                >
                                  <CopyIcon
                                    size={15}
                                  />
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    removeBlock(
                                      block.id,
                                    )
                                  }
                                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition hover:bg-red-500/10 hover:text-red-400"
                                  aria-label="Delete block"
                                >
                                  <TrashIcon
                                    size={15}
                                  />
                                </button>
                              </div>
                            </div>

                            {/* Block editor */}
                            <div className="space-y-3 p-4">
                              <div className="grid gap-3 sm:grid-cols-2">
                                <input
                                  value={
                                    block.title ||
                                    ""
                                  }
                                  onChange={(event) =>
                                    updateBlock(
                                      block.id,
                                      {
                                        title:
                                          event
                                            .target
                                            .value,
                                      },
                                    )
                                  }
                                  placeholder="Block title (optional)"
                                  className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-700 focus:border-cyan-400/30"
                                />

                                <input
                                  value={
                                    block.description ||
                                    ""
                                  }
                                  onChange={(event) =>
                                    updateBlock(
                                      block.id,
                                      {
                                        description:
                                          event
                                            .target
                                            .value,
                                      },
                                    )
                                  }
                                  placeholder="Description (optional)"
                                  className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-700 focus:border-cyan-400/30"
                                />
                              </div>

                              <textarea
                                value={block.value}
                                onChange={(event) =>
                                  updateBlock(
                                    block.id,
                                    {
                                      value:
                                        event
                                          .target
                                          .value,
                                    },
                                  )
                                }
                                rows={
                                  block.type ===
                                  "text"
                                    ? 6
                                    : 3
                                }
                                placeholder={
                                  block.type ===
                                  "text"
                                    ? "Write your text..."
                                    : block.type ===
                                        "image"
                                      ? "Paste image URL..."
                                      : block.type ===
                                          "video"
                                        ? "Paste video URL..."
                                        : block.type ===
                                            "pdf"
                                          ? "Paste PDF URL..."
                                          : "Paste website URL..."
                                }
                                className="w-full resize-y rounded-xl border border-white/10 bg-black/20 px-3 py-3 text-sm leading-6 text-white outline-none placeholder:text-slate-700 focus:border-cyan-400/30"
                              />

                              {/* Live preview */}
                              {block.value.trim() && (
                                <div className="rounded-xl border border-cyan-400/10 bg-black/20 p-3">
                                  <p className="mb-2 text-[10px] font-black uppercase tracking-[0.15em] text-slate-700">
                                    Preview
                                  </p>

                                  {block.type ===
                                    "text" && (
                                    <p className="whitespace-pre-wrap break-words text-sm leading-6 text-slate-300">
                                      {
                                        block.value
                                      }
                                    </p>
                                  )}

                                  {block.type ===
                                    "image" && (
                                    <div className="overflow-hidden rounded-lg bg-black/30">
                                      <img
                                        src={
                                          block.value
                                        }
                                        alt={
                                          block.title ||
                                          "Preview"
                                        }
                                        className="max-h-[320px] w-full object-contain"
                                      />
                                    </div>
                                  )}

                                  {block.type ===
                                    "video" && (
                                    <video
                                      src={
                                        block.value
                                      }
                                      controls
                                      playsInline
                                      className="aspect-video w-full rounded-lg bg-black object-contain"
                                    />
                                  )}

                                  {block.type ===
                                    "pdf" && (
                                    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                                      <div className="flex items-center gap-3">
                                        <FileIcon
                                          size={20}
                                        />
                                        <span className="text-sm text-slate-300">
                                          PDF
                                          document
                                        </span>
                                      </div>

                                      <a
                                        href={
                                          block.value
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-3 py-2 text-xs font-bold text-white"
                                      >
                                        Open
                                      </a>
                                    </div>
                                  )}

                                  {block.type ===
                                    "link" && (
                                    <a
                                      href={
                                        block.value
                                      }
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-3 rounded-xl border border-cyan-400/10 bg-cyan-400/[0.04] p-4 text-sm text-cyan-300"
                                    >
                                      <ExternalLinkIcon
                                        size={18}
                                      />
                                      <span className="break-all">
                                        {
                                          block.value
                                        }
                                      </span>
                                    </a>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-7 flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-end">
                  <button
                    type="button"
                    onClick={() =>
                      setShowCreatePost(false)
                    }
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-bold text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 px-6 py-3 text-sm font-black text-white shadow-lg shadow-cyan-500/10 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <SendIcon size={17} />

                    {actionLoading
                      ? "Publishing..."
                      : "Publish Post"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}