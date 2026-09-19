"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";

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

const REACTIONS = ["❤️", "👍", "🔥", "😂", "😮", "👏", "🚀"];

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
    strokeLinejoin="round"
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

const ExternalIcon = ({ size = 17 }: IconProps) => (
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

const EyeIcon = ({ size = 17 }: IconProps) => (
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
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const HomeIcon = ({ size = 18 }: IconProps) => (
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
    <path d="m3 10 9-7 9 7" />
    <path d="M5 9v11h14V9" />
    <path d="M9 20v-6h6v6" />
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

/* -------------------------------------------------------
   SMART CONTENT DETECTION
------------------------------------------------------- */

function isValidHttpUrl(value: string) {
  try {
    const url = new URL(value.trim());

    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function detectContentType(value: string): BlockType {
  const trimmed = value.trim();

  if (!trimmed) {
    return "text";
  }

  if (!isValidHttpUrl(trimmed)) {
    return "text";
  }

  const lower = trimmed.toLowerCase();

  if (
    /\.(jpg|jpeg|png|gif|webp|avif|svg)(\?.*)?$/i.test(lower)
  ) {
    return "image";
  }

  if (
    /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(lower)
  ) {
    return "video";
  }

  if (/\.(pdf)(\?.*)?$/i.test(lower)) {
    return "pdf";
  }

  if (
    lower.includes("youtube.com/watch") ||
    lower.includes("youtu.be/") ||
    lower.includes("youtube.com/shorts/") ||
    lower.includes("youtube.com/embed/") ||
    lower.includes("vimeo.com/")
  ) {
    return "video";
  }

  return "link";
}

function getBlockLabel(type: BlockType) {
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

    default:
      return "Content";
  }
}

function getBlockEmoji(type: BlockType) {
  switch (type) {
    case "text":
      return "T";

    case "image":
      return "🖼️";

    case "video":
      return "▶";

    case "pdf":
      return "📄";

    case "link":
      return "🔗";

    default:
      return "•";
  }
}

function createBlock(value = ""): ContentBlock {
  const type = detectContentType(value);

  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    type,
    value,
  };
}

function parseContent(content: string): ContentBlock[] {
  if (!content) return [];

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
                "value" in block
            )
        )
        .map((block) => ({
          id: block.id || `${Date.now()}-${Math.random()}`,
          type: block.type,
          value: block.value,
          title: block.title || "",
          description: block.description || "",
        }));
    }
  } catch {
    // Legacy plain text content.
  }

  return [
    {
      id: `legacy-${Date.now()}`,
      type: "text",
      value: content,
    },
  ];
}

function serializeBlocks(blocks: ContentBlock[]) {
  return JSON.stringify({
    version: 2,
    blocks,
  });
}

function getYouTubeEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace("/", "").trim();

      if (id) {
        return `https://www.youtube.com/embed/${id}`;
      }
    }

    if (parsed.hostname.includes("youtube.com")) {
      const videoId = parsed.searchParams.get("v");

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }

      if (parsed.pathname.startsWith("/shorts/")) {
        const id = parsed.pathname.split("/")[2];

        if (id) {
          return `https://www.youtube.com/embed/${id}`;
        }
      }

      if (parsed.pathname.startsWith("/embed/")) {
        return url;
      }
    }

    return null;
  } catch {
    return null;
  }
}

function sanitizeExternalUrl(url: string) {
  if (!isValidHttpUrl(url)) return "#";

  return url.trim();
}

export default function MyPostPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [expiredCount, setExpiredCount] = useState(0);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [showCreatePost, setShowCreatePost] = useState(false);

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [duration, setDuration] =
    useState<DurationOption>("7-days");

  const [blocks, setBlocks] = useState<ContentBlock[]>([
    createBlock(""),
  ]);

  const [commentNames, setCommentNames] =
    useState<Record<string, string>>({});

  const [commentTexts, setCommentTexts] =
    useState<Record<string, string>>({});

  const [showComments, setShowComments] =
    useState<Record<string, boolean>>({});

  const [reactionOpen, setReactionOpen] =
    useState<Record<string, boolean>>({});

  const [selectedReactions, setSelectedReactions] =
    useState<Record<string, string>>({});

  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const [, setTimerTick] = useState(0);

  const detectedSummary = useMemo(() => {
    return blocks.map((block) => getBlockLabel(block.type));
  }, [blocks]);

  /* -------------------------------------------------------
     LOAD POSTS
  ------------------------------------------------------- */

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
          : "Could not load posts."
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
      30_000
    );

    return () => window.clearInterval(timer);
  }, []);

  /* -------------------------------------------------------
     SMART BLOCK FUNCTIONS
  ------------------------------------------------------- */

  function updateBlock(
    blockId: string,
    value: string
  ) {
    setBlocks((current) =>
      current.map((block) => {
        if (block.id !== blockId) return block;

        return {
          ...block,
          value,
          type: detectContentType(value),
        };
      })
    );
  }

  function updateBlockMeta(
    blockId: string,
    field: "title" | "description",
    value: string
  ) {
    setBlocks((current) =>
      current.map((block) =>
        block.id === blockId
          ? {
              ...block,
              [field]: value,
            }
          : block
      )
    );
  }

  function addBlock() {
    setBlocks((current) => [
      ...current,
      createBlock(""),
    ]);
  }

  function addPresetBlock(type: BlockType) {
    setBlocks((current) => [
      ...current,
      {
        ...createBlock(""),
        type,
      },
    ]);
  }

  function removeBlock(blockId: string) {
    setBlocks((current) => {
      const next = current.filter(
        (block) => block.id !== blockId
      );

      return next.length
        ? next
        : [createBlock("")];
    });
  }

  function duplicateBlock(blockId: string) {
    setBlocks((current) => {
      const index = current.findIndex(
        (block) => block.id === blockId
      );

      if (index === -1) return current;

      const original = current[index];

      const duplicate: ContentBlock = {
        ...original,
        id: `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2)}`,
      };

      return [
        ...current.slice(0, index + 1),
        duplicate,
        ...current.slice(index + 1),
      ];
    });
  }

  function moveBlock(
    blockId: string,
    direction: "up" | "down"
  ) {
    setBlocks((current) => {
      const index = current.findIndex(
        (block) => block.id === blockId
      );

      if (index === -1) return current;

      const newIndex =
        direction === "up" ? index - 1 : index + 1;

      if (
        newIndex < 0 ||
        newIndex >= current.length
      ) {
        return current;
      }

      const next = [...current];

      [next[index], next[newIndex]] = [
        next[newIndex],
        next[index],
      ];

      return next;
    });
  }

  function resetEditor() {
    setTitle("");
    setImageUrl("");
    setDuration("7-days");
    setBlocks([createBlock("")]);
  }

  /* -------------------------------------------------------
     CREATE POST
  ------------------------------------------------------- */

  async function createPost(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const cleanBlocks = blocks.filter(
      (block) => block.value.trim()
    );

    if (!title.trim()) {
      setError("Post title is required.");
      return;
    }

    if (!cleanBlocks.length) {
      setError(
        "Please add at least one content value."
      );
      return;
    }

    try {
      setActionLoading(true);
      setError("");
      setNotice("");

      const content = serializeBlocks(cleanBlocks);

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: title.trim(),
          content,
          imageUrl: imageUrl.trim(),
          duration,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Could not create post."
        );
      }

      resetEditor();
      setShowCreatePost(false);

      setNotice(
        "Post published successfully."
      );

      await loadPosts();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Could not create post."
      );
    } finally {
      setActionLoading(false);
    }
  }

  /* -------------------------------------------------------
     DELETE POST
  ------------------------------------------------------- */

  async function deletePost(postId: string) {
    if (
      !window.confirm(
        "Delete this post permanently?"
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
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Could not delete post."
        );
      }

      setNotice(
        "Post deleted successfully."
      );

      await loadPosts();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Could not delete post."
      );
    }
  }

  /* -------------------------------------------------------
     LIKE
  ------------------------------------------------------- */

  async function toggleLike(postId: string) {
    try {
      const response = await fetch(
        `/api/posts/${postId}/like`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Could not update like."
        );
      }

      setPosts((current) =>
        current.map((post) =>
          post.id === postId
            ? {
                ...post,
                likedByMe: Boolean(
                  data.liked
                ),
                likesCount: Number(
                  data.likesCount
                ),
              }
            : post
        )
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Could not update like."
      );
    }
  }

  /* -------------------------------------------------------
     COMMENTS
  ------------------------------------------------------- */

  async function addComment(postId: string) {
    const name =
      commentNames[postId]?.trim();

    const message =
      commentTexts[postId]?.trim();

    if (!name || !message) {
      setError(
        "Name and comment are required."
      );

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
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Could not add comment."
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
          : "Could not add comment."
      );
    }
  }

  async function deleteComment(
    postId: string,
    commentId: string
  ) {
    if (
      !window.confirm(
        "Delete this comment?"
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        `/api/posts/${postId}/comments/${commentId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Could not delete comment."
        );
      }

      await loadPosts();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Could not delete comment."
      );
    }
  }

  /* -------------------------------------------------------
     EMOJI REACTIONS
     
     These are UI/local reactions.
     Persistent database reactions require backend support.
  ------------------------------------------------------- */

  function selectReaction(
    postId: string,
    reaction: string
  ) {
    setSelectedReactions((current) => ({
      ...current,
      [postId]:
        current[postId] === reaction
          ? ""
          : reaction,
    }));

    setReactionOpen((current) => ({
      ...current,
      [postId]: false,
    }));
  }

  /* -------------------------------------------------------
     LOGOUT
  ------------------------------------------------------- */

  async function logout() {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    setAuthenticated(false);
    setShowCreatePost(false);

    setNotice(
      "Logged out. Public view is active."
    );

    await loadPosts();
  }

  /* -------------------------------------------------------
     COPY POST LINK
  ------------------------------------------------------- */

  async function copyPostLink(postId: string) {
    try {
      const url =
        `${window.location.origin}/my-post?post=${encodeURIComponent(
          postId
        )}`;

      await navigator.clipboard.writeText(url);

      setNotice(
        "Post link copied to clipboard."
      );
    } catch {
      setError(
        "Could not copy the post link."
      );
    }
  }

  /* -------------------------------------------------------
     RENDER CONTENT BLOCK
  ------------------------------------------------------- */

  function renderContentBlock(
    block: ContentBlock
  ) {
    const value = block.value.trim();

    if (!value) return null;

    return (
      <div
        key={block.id}
        className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]"
      >
        {(block.title ||
          block.description) && (
          <div className="border-b border-white/10 px-4 py-4 sm:px-5">
            {block.title && (
              <h3 className="text-base font-semibold text-white sm:text-lg">
                {block.title}
              </h3>
            )}

            {block.description && (
              <p className="mt-1 text-sm leading-6 text-slate-400">
                {block.description}
              </p>
            )}
          </div>
        )}

        {block.type === "text" && (
          <div className="px-4 py-5 sm:px-6">
            <p className="whitespace-pre-wrap break-words text-[15px] leading-7 text-slate-300 sm:text-base">
              {value}
            </p>
          </div>
        )}

        {block.type === "image" && (
          <div className="bg-black/20">
            <img
              src={sanitizeExternalUrl(value)}
              alt={
                block.title ||
                "Post image"
              }
              className="mx-auto block max-h-[720px] w-full object-contain"
              loading="lazy"
              onError={(event) => {
                event.currentTarget.style.display =
                  "none";
              }}
            />
          </div>
        )}

        {block.type === "video" && (
          <div className="bg-black/30">
            {getYouTubeEmbedUrl(value) ? (
              <div className="aspect-video w-full">
                <iframe
                  src={
                    getYouTubeEmbedUrl(value) ||
                    undefined
                  }
                  title={
                    block.title ||
                    "Embedded video"
                  }
                  className="h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : (
              <video
                controls
                preload="metadata"
                className="block max-h-[720px] w-full bg-black object-contain"
              >
                <source src={value} />
                Your browser does not support
                video playback.
              </video>
            )}
          </div>
        )}

        {block.type === "pdf" && (
          <div className="bg-black/20">
            <div className="h-[420px] w-full sm:h-[600px] lg:h-[720px]">
              <iframe
                src={value}
                title={
                  block.title ||
                  "PDF document"
                }
                className="h-full w-full border-0"
              />
            </div>

            <div className="border-t border-white/10 p-4">
              <a
                href={sanitizeExternalUrl(
                  value
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
              >
                <ExternalIcon size={16} />
                Open PDF
              </a>
            </div>
          </div>
        )}

        {block.type === "link" && (
          <a
            href={sanitizeExternalUrl(value)}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-5 transition hover:bg-cyan-400/[0.04] sm:p-6"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-400/20 text-cyan-300">
                <ExternalIcon size={21} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-semibold text-white transition group-hover:text-cyan-300">
                  {block.title ||
                    "Open Website"}
                </p>

                <p className="mt-1 break-all text-sm leading-6 text-slate-500">
                  {value}
                </p>
              </div>

              <ExternalIcon
                size={18}
              />
            </div>
          </a>
        )}
      </div>
    );
  }

  /* -------------------------------------------------------
     LOADING
  ------------------------------------------------------- */

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#020817] px-4">
        <div className="rounded-2xl border border-cyan-400/20 bg-slate-950/70 px-6 py-4 text-sm text-cyan-300 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
          Loading posts...
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020817] px-4 py-10 text-white sm:px-6 lg:px-8">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize:
              "42px 42px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* HEADER */}
        <section className="mb-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400" />
                Personal Publishing
              </div>

              <p className="mb-2 text-sm font-semibold text-cyan-400">
                Tamim Hasan
              </p>

              <h1 className="bg-gradient-to-r from-white via-white to-cyan-300 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl lg:text-6xl">
                My Posts
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                Create rich posts with smart text,
                images, videos, PDFs and website
                links. Paste a value and the editor
                automatically detects what it is.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  window.location.href = "/";
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-400/20 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-cyan-200 transition hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-cyan-400/10"
              >
                <HomeIcon size={18} />
                Back to Home
              </button>

              {authenticated && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setShowCreatePost(true)
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-bold text-white shadow-xl shadow-blue-500/20 transition hover:-translate-y-1 hover:shadow-cyan-500/20"
                  >
                    <PlusIcon size={18} />
                    Create Post
                  </button>

                  <button
                    type="button"
                    onClick={logout}
                    className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5"
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
            <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm text-cyan-200 backdrop-blur-xl">
              {notice}
            </div>
          )}

          {/* STATS */}
          <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
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
                  (sum, post) =>
                    sum + post.likesCount,
                  0
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
                  0
                )}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Comments
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl">
              <p className="text-3xl font-black text-cyan-300">
                {expiredCount}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Expired Hidden
              </p>
            </div>
          </div>
        </section>

        {/* EMPTY STATE */}
        {posts.length === 0 && (
          <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-10 text-center shadow-2xl backdrop-blur-xl sm:p-16">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-400/20 text-cyan-300">
              <CommentIcon size={28} />
            </div>

            <h2 className="text-2xl font-bold text-white">
              No active posts
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Create your first post and it will
              appear here.
            </p>

            {authenticated && (
              <button
                type="button"
                onClick={() =>
                  setShowCreatePost(true)
                }
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-bold text-white"
              >
                <PlusIcon size={18} />
                Create Your First Post
              </button>
            )}
          </div>
        )}

        {/* POSTS */}
        <section className="space-y-7">
          {posts.map((post) => (
            <article
              key={post.id}
              className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/65 shadow-2xl shadow-black/20 backdrop-blur-2xl"
            >
              {/* POST HEADER */}
              <div className="p-5 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-400/20 text-cyan-300">
                      <UserIcon size={22} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-bold text-white">
                        Tamim Hasan
                      </p>

                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                        <span className="inline-flex items-center gap-1">
                          <CalendarIcon size={13} />
                          {formatDate(
                            post.createdAt
                          )}
                        </span>

                        <span className="inline-flex items-center gap-1 text-cyan-400">
                          <ClockIcon size={13} />
                          {remainingTime(
                            post.expiresAt
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        copyPostLink(post.id)
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-500 transition hover:bg-cyan-400/10 hover:text-cyan-300"
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
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
                        aria-label="Delete post"
                      >
                        <TrashIcon size={17} />
                      </button>
                    )}
                  </div>
                </div>

                <h2 className="mt-6 break-words text-2xl font-black tracking-tight text-white sm:text-3xl">
                  {post.title}
                </h2>
              </div>

              {/* FEATURED IMAGE */}
              {post.imageUrl && (
                <div className="border-y border-white/10 bg-black/30">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="mx-auto block max-h-[720px] w-full object-contain"
                    loading="lazy"
                  />
                </div>
              )}

              {/* SMART CONTENT */}
              <div className="space-y-4 p-5 sm:p-7">
                {parseContent(
                  post.content
                ).map(renderContentBlock)}
              </div>

              {/* REACTION / COUNTS */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-y border-white/10 px-5 py-3 text-sm text-slate-500 sm:px-7">
                <div className="flex items-center gap-3">
                  <span>
                    {post.likesCount}{" "}
                    {post.likesCount === 1
                      ? "Like"
                      : "Likes"}
                  </span>

                  {selectedReactions[
                    post.id
                  ] && (
                    <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 text-base">
                      {
                        selectedReactions[
                          post.id
                        ]
                      }
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowComments(
                      (current) => ({
                        ...current,
                        [post.id]:
                          !current[post.id],
                      })
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

              {/* ACTION BUTTONS */}
              <div className="grid grid-cols-3 border-b border-white/10">
                <button
                  type="button"
                  onClick={() =>
                    toggleLike(post.id)
                  }
                  className={`flex items-center justify-center gap-2 py-3.5 text-sm font-semibold transition ${
                    post.likedByMe
                      ? "bg-cyan-400/10 text-cyan-300"
                      : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <HeartIcon
                    size={18}
                    fill={
                      post.likedByMe
                        ? "currentColor"
                        : "none"
                    }
                  />
                  Like
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setShowComments(
                      (current) => ({
                        ...current,
                        [post.id]: true,
                      })
                    )
                  }
                  className="flex items-center justify-center gap-2 border-l border-white/10 py-3.5 text-sm font-semibold text-slate-400 transition hover:bg-white/[0.04] hover:text-white"
                >
                  <CommentIcon size={18} />
                  Comment
                </button>

                <div className="relative border-l border-white/10">
                  <button
                    type="button"
                    onClick={() =>
                      setReactionOpen(
                        (current) => ({
                          ...current,
                          [post.id]:
                            !current[post.id],
                        })
                      )
                    }
                    className="flex w-full items-center justify-center gap-2 py-3.5 text-sm font-semibold text-slate-400 transition hover:bg-white/[0.04] hover:text-white"
                  >
                    <span className="text-lg">
                      😊
                    </span>
                    React
                  </button>

                  {reactionOpen[
                    post.id
                  ] && (
                    <div className="absolute bottom-[calc(100%+8px)] right-2 z-30 flex gap-1 rounded-2xl border border-white/10 bg-[#071426]/95 p-2 shadow-2xl backdrop-blur-xl">
                      {REACTIONS.map(
                        (reaction) => (
                          <button
                            key={reaction}
                            type="button"
                            onClick={() =>
                              selectReaction(
                                post.id,
                                reaction
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-xl text-lg transition hover:scale-110 hover:bg-white/10"
                            aria-label={`React ${reaction}`}
                          >
                            {reaction}
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* COMMENTS */}
              {showComments[
                post.id
              ] && (
                <div className="p-5 sm:p-7">
                  <div className="space-y-4">
                    {post.comments.map(
                      (comment) => (
                        <div
                          key={comment.id}
                          className="flex items-start gap-3"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-slate-400">
                            <UserIcon size={16} />
                          </div>

                          <div className="min-w-0 flex-1 rounded-2xl border border-white/5 bg-white/[0.035] px-4 py-3">
                            <div className="flex justify-between gap-3">
                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-white">
                                  {
                                    comment.name
                                  }
                                </p>

                                <p className="mt-0.5 text-[11px] text-slate-600">
                                  {formatDate(
                                    comment.createdAt
                                  )}
                                </p>
                              </div>

                              {authenticated && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    deleteComment(
                                      post.id,
                                      comment.id
                                    )
                                  }
                                  className="shrink-0 text-slate-600 transition hover:text-red-400"
                                  aria-label="Delete comment"
                                >
                                  <CloseIcon
                                    size={15}
                                  />
                                </button>
                              )}
                            </div>

                            <p className="mt-2 break-words text-sm leading-6 text-slate-300">
                              {
                                comment.message
                              }
                            </p>
                          </div>
                        </div>
                      )
                    )}

                    {post.comments
                      .length === 0 && (
                      <p className="py-4 text-center text-sm text-slate-600">
                        No comments yet.
                        Be the first to
                        comment.
                      </p>
                    )}
                  </div>

                  {/* COMMENT FORM */}
                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                    <input
                      type="text"
                      value={
                        commentNames[
                          post.id
                        ] || ""
                      }
                      onChange={(event) =>
                        setCommentNames(
                          (current) => ({
                            ...current,
                            [post.id]:
                              event.target.value,
                          })
                        )
                      }
                      placeholder="Your name"
                      maxLength={100}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
                    />

                    <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                      <textarea
                        value={
                          commentTexts[
                            post.id
                          ] || ""
                        }
                        onChange={(event) =>
                          setCommentTexts(
                            (current) => ({
                              ...current,
                              [post.id]:
                                event.target
                                  .value,
                            })
                          )
                        }
                        placeholder="Write a comment..."
                        maxLength={2000}
                        rows={3}
                        className="min-h-[90px] flex-1 resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          addComment(
                            post.id
                          )
                        }
                        className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 text-sm font-bold text-white shadow-lg shadow-blue-500/10 transition hover:-translate-y-0.5 sm:self-end"
                      >
                        <SendIcon size={17} />
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </article>
          ))}
        </section>

        {authenticated &&
          expiredCount > 0 && (
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-center text-sm text-slate-600">
              {expiredCount} expired{" "}
              {expiredCount === 1
                ? "post"
                : "posts"}{" "}
              hidden from visitors.
            </div>
          )}
      </div>

      {/* =====================================================
          CREATE POST MODAL
      ===================================================== */}

      {authenticated &&
        showCreatePost && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 backdrop-blur-md sm:p-5">
            <div className="flex max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-[28px] border border-cyan-400/10 bg-[#04101e] shadow-2xl shadow-black/50">
              {/* MODAL HEADER */}
              <div className="sticky top-0 z-20 flex shrink-0 items-center justify-between border-b border-white/10 bg-[#04101e]/95 px-5 py-4 backdrop-blur-xl sm:px-6">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-400/20 text-cyan-300">
                      <PlusIcon size={18} />
                    </div>

                    <h2 className="text-lg font-black text-white sm:text-xl">
                      Create New Post
                    </h2>
                  </div>

                  <p className="mt-1 hidden text-xs text-slate-600 sm:block">
                    Paste any value. The editor
                    automatically detects the
                    content type.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowCreatePost(
                      false
                    )
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-white"
                  aria-label="Close"
                >
                  <CloseIcon size={18} />
                </button>
              </div>

              <form
                onSubmit={createPost}
                className="min-h-0 flex-1 overflow-y-auto"
              >
                <div className="space-y-6 p-5 sm:p-7">
                  {/* TITLE */}
                  <div>
                    <label className="text-sm font-bold text-slate-300">
                      Post Title
                    </label>

                    <input
                      value={title}
                      onChange={(event) =>
                        setTitle(
                          event.target.value
                        )
                      }
                      required
                      maxLength={200}
                      placeholder="Enter your post title"
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3.5 text-white outline-none placeholder:text-slate-700 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
                    />
                  </div>

                  {/* SMART CONTENT EDITOR */}
                  <div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <label className="text-sm font-bold text-slate-300">
                          Smart Content
                        </label>

                        <p className="mt-1 text-xs leading-5 text-slate-600">
                          One Value field is enough.
                          Paste text, image URL,
                          video URL, PDF URL or
                          website URL.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={addBlock}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2.5 text-xs font-bold text-white transition hover:-translate-y-0.5"
                      >
                        <PlusIcon size={16} />
                        Add Value
                      </button>
                    </div>

                    {/* QUICK ADD */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {(
                        [
                          [
                            "text",
                            "Text",
                          ],
                          [
                            "image",
                            "Image",
                          ],
                          [
                            "video",
                            "Video",
                          ],
                          [
                            "pdf",
                            "PDF",
                          ],
                          [
                            "link",
                            "Website",
                          ],
                        ] as [
                          BlockType,
                          string
                        ][]
                      ).map(
                        ([type, label]) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() =>
                              addPresetBlock(
                                type
                              )
                            }
                            className="rounded-lg border border-white/10 bg-white/[0.025] px-3 py-2 text-xs font-semibold text-slate-400 transition hover:border-cyan-400/30 hover:bg-cyan-400/5 hover:text-cyan-300"
                          >
                            {getBlockEmoji(
                              type
                            )}{" "}
                            {label}
                          </button>
                        )
                      )}
                    </div>

                    {/* DETECTION SUMMARY */}
                    <div className="mt-4 flex flex-wrap items-center gap-2 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.025] p-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-500">
                        Auto Detect:
                      </span>

                      {detectedSummary.map(
                        (item, index) => (
                          <span
                            key={`${item}-${index}`}
                            className="rounded-full border border-cyan-400/10 bg-cyan-400/5 px-2.5 py-1 text-[11px] text-cyan-300"
                          >
                            {item}
                          </span>
                        )
                      )}
                    </div>

                    {/* BLOCKS */}
                    <div className="mt-4 space-y-4">
                      {blocks.map(
                        (block, index) => (
                          <div
                            key={block.id}
                            className="rounded-2xl border border-white/10 bg-white/[0.025] p-4 sm:p-5"
                          >
                            {/* BLOCK TOP */}
                            <div className="flex flex-wrap items-center justify-between gap-3">
                              <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600/20 to-cyan-400/20 text-sm text-cyan-300">
                                  {getBlockEmoji(
                                    block.type
                                  )}
                                </div>

                                <div>
                                  <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                                    {getBlockLabel(
                                      block.type
                                    )}
                                  </p>

                                  <p className="text-[10px] text-slate-600">
                                    Block{" "}
                                    {index +
                                      1}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() =>
                                    moveBlock(
                                      block.id,
                                      "up"
                                    )
                                  }
                                  disabled={
                                    index ===
                                    0
                                  }
                                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-slate-500 transition hover:bg-cyan-400/10 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-30"
                                  aria-label="Move up"
                                >
                                  <ArrowUpIcon />
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    moveBlock(
                                      block.id,
                                      "down"
                                    )
                                  }
                                  disabled={
                                    index ===
                                    blocks.length -
                                      1
                                  }
                                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-slate-500 transition hover:bg-cyan-400/10 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-30"
                                  aria-label="Move down"
                                >
                                  <ArrowDownIcon />
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    duplicateBlock(
                                      block.id
                                    )
                                  }
                                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-slate-500 transition hover:bg-cyan-400/10 hover:text-cyan-300"
                                  aria-label="Duplicate block"
                                >
                                  <CopyIcon size={15} />
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    removeBlock(
                                      block.id
                                    )
                                  }
                                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
                                  aria-label="Delete block"
                                >
                                  <TrashIcon size={15} />
                                </button>
                              </div>
                            </div>

                            {/* VALUE */}
                            <div className="mt-4">
                              <label className="text-xs font-semibold text-slate-400">
                                Value
                              </label>

                              <textarea
                                value={
                                  block.value
                                }
                                onChange={(
                                  event
                                ) =>
                                  updateBlock(
                                    block.id,
                                    event
                                      .target
                                      .value
                                  )
                                }
                                rows={
                                  block.type ===
                                  "text"
                                    ? 5
                                    : 2
                                }
                                placeholder="Type text or paste an image/video/PDF/website URL..."
                                className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-slate-700 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
                              />

                              {/* AUTO DETECT RESULT */}
                              <div className="mt-2 flex items-center justify-between gap-2">
                                <span className="text-[11px] text-slate-600">
                                  Detected automatically
                                </span>

                                <span className="rounded-full bg-cyan-400/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                                  {getBlockEmoji(
                                    block.type
                                  )}{" "}
                                  {getBlockLabel(
                                    block.type
                                  )}
                                </span>
                              </div>
                            </div>

                            {/* OPTIONAL TITLE/DESCRIPTION */}
                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                              <div>
                                <label className="text-xs font-semibold text-slate-500">
                                  Block Title
                                </label>

                                <input
                                  value={
                                    block.title ||
                                    ""
                                  }
                                  onChange={(
                                    event
                                  ) =>
                                    updateBlockMeta(
                                      block.id,
                                      "title",
                                      event
                                        .target
                                        .value
                                    )
                                  }
                                  placeholder="Optional title"
                                  maxLength={
                                    150
                                  }
                                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-700 focus:border-cyan-400/40"
                                />
                              </div>

                              <div>
                                <label className="text-xs font-semibold text-slate-500">
                                  Description
                                </label>

                                <input
                                  value={
                                    block.description ||
                                    ""
                                  }
                                  onChange={(
                                    event
                                  ) =>
                                    updateBlockMeta(
                                      block.id,
                                      "description",
                                      event
                                        .target
                                        .value
                                    )
                                  }
                                  placeholder="Optional description"
                                  maxLength={
                                    250
                                  }
                                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-700 focus:border-cyan-400/40"
                                />
                              </div>
                            </div>

                            {/* LIVE PREVIEW */}
                            {block.value.trim() && (
                              <div className="mt-4 overflow-hidden rounded-xl border border-cyan-400/10 bg-black/20">
                                <div className="border-b border-white/5 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                                  Live Preview
                                </div>

                                <div className="p-3">
                                  {renderContentBlock(
                                    block
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* FEATURED IMAGE */}
                  <div>
                    <label className="text-sm font-bold text-slate-300">
                      Featured Image URL{" "}
                      <span className="font-normal text-slate-600">
                        Optional
                      </span>
                    </label>

                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(event) =>
                        setImageUrl(
                          event.target.value
                        )
                      }
                      placeholder="https://example.com/featured-image.jpg"
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3.5 text-sm text-white outline-none placeholder:text-slate-700 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
                    />

                    {imageUrl && (
                      <div className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                        <img
                          src={imageUrl}
                          alt="Featured preview"
                          className="max-h-[360px] w-full object-contain"
                        />
                      </div>
                    )}
                  </div>

                  {/* DURATION */}
                  <div>
                    <label className="text-sm font-bold text-slate-300">
                      Post Duration
                    </label>

                    <select
                      value={duration}
                      onChange={(event) =>
                        setDuration(
                          event.target
                            .value as DurationOption
                        )
                      }
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-[#091525] px-4 py-3.5 text-sm text-white outline-none focus:border-cyan-400/50"
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

                    <p className="mt-2 text-xs leading-5 text-slate-600">
                      After the selected duration,
                      the post will automatically
                      disappear from the public
                      active-post list.
                    </p>
                  </div>
                </div>

                {/* MODAL FOOTER */}
                <div className="sticky bottom-0 flex flex-col-reverse gap-3 border-t border-white/10 bg-[#04101e]/95 p-5 backdrop-blur-xl sm:flex-row sm:justify-end sm:px-7">
                  <button
                    type="button"
                    onClick={() =>
                      setShowCreatePost(
                        false
                      )
                    }
                    className="rounded-xl border border-white/10 bg-white/[0.025] px-5 py-3 text-sm font-semibold text-slate-400 transition hover:bg-white/5 hover:text-white"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={
                      actionLoading
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-blue-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
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
        )}
    </main>
  );
}