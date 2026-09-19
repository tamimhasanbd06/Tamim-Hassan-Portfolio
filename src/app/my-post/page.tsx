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
  content: string;
  title?: string;
  description?: string;
};

type IconProps = {
  size?: number;
  fill?: string;
};

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
    aria-hidden="true"
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const ArrowUpIcon = ({ size = 18 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m18 15-6-6-6 6" />
  </svg>
);

const ArrowDownIcon = ({ size = 18 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
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
  >
    <rect x="9" y="9" width="13" height="13" rx="2" />
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
  >
    <path d="M14 3h7v7" />
    <path d="M10 14 21 3" />
    <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
  </svg>
);

const FileTextIcon = ({ size = 22 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
    <path d="M14 2v6h6" />
    <path d="M8 13h8M8 17h6" />
  </svg>
);

const ImageIcon = ({ size = 22 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="m21 15-5-5L5 21" />
  </svg>
);

const VideoIcon = ({ size = 22 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="5" width="15" height="14" rx="2" />
    <path d="m18 10 3-2v8l-3-2z" />
  </svg>
);

const LinkIcon = ({ size = 22 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
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

  const difference =
    new Date(expiresAt).getTime() - Date.now();

  if (difference <= 0) return "Expired";

  const days = Math.floor(difference / 86_400_000);
  const hours = Math.floor(
    (difference / 3_600_000) % 24
  );
  const minutes = Math.floor(
    (difference / 60_000) % 60
  );

  if (days > 0) return `${days}d ${hours}h remaining`;
  if (hours > 0) return `${hours}h ${minutes}m remaining`;

  return `${Math.max(minutes, 1)}m remaining`;
}

function createBlock(type: BlockType): ContentBlock {
  const labels: Record<BlockType, string> = {
    text: "Text Block",
    image: "Image Block",
    video: "Video Block",
    pdf: "PDF Document",
    link: "Website Link",
  };

  return {
    id: `${type}-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}`,
    type,
    content: "",
    title: labels[type],
    description: "",
  };
}

function parseContent(content: string): ContentBlock[] {
  try {
    const parsed = JSON.parse(content);

    if (
      parsed &&
      typeof parsed === "object" &&
      parsed.version === 1 &&
      Array.isArray(parsed.blocks)
    ) {
      return parsed.blocks;
    }
  } catch {
    // Existing plain-text post.
  }

  return [
    {
      id: "legacy-text",
      type: "text",
      content,
      title: "",
      description: "",
    },
  ];
}

function serializeBlocks(blocks: ContentBlock[]) {
  return JSON.stringify({
    version: 1,
    blocks,
  });
}

function BlockTypeIcon({
  type,
  size = 20,
}: {
  type: BlockType;
  size?: number;
}) {
  if (type === "text") return <FileTextIcon size={size} />;
  if (type === "image") return <ImageIcon size={size} />;
  if (type === "video") return <VideoIcon size={size} />;
  if (type === "pdf") return <FileTextIcon size={size} />;
  return <LinkIcon size={size} />;
}

function blockLabel(type: BlockType) {
  const labels: Record<BlockType, string> = {
    text: "Text",
    image: "Image",
    video: "Video",
    pdf: "PDF",
    link: "Website Link",
  };

  return labels[type];
}

function renderContentBlocks(blocks: ContentBlock[]) {
  return (
    <div className="space-y-6">
      {blocks.map((block) => {
        if (block.type === "text") {
          return (
            <div key={block.id}>
              {block.title && (
                <h3 className="mb-2 text-lg font-bold text-white">
                  {block.title}
                </h3>
              )}

              <p className="whitespace-pre-wrap break-words text-[15px] leading-7 text-slate-300 sm:text-base">
                {block.content}
              </p>

              {block.description && (
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {block.description}
                </p>
              )}
            </div>
          );
        }

        if (block.type === "image") {
          return (
            <figure
              key={block.id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-black/20"
            >
              {block.title && (
                <div className="border-b border-white/10 px-4 py-3">
                  <h3 className="font-semibold text-white">
                    {block.title}
                  </h3>
                </div>
              )}

              <img
                src={block.content}
                alt={block.title || "Post image"}
                className="max-h-[650px] w-full object-cover"
              />

              {block.description && (
                <figcaption className="border-t border-white/10 px-4 py-3 text-sm text-slate-400">
                  {block.description}
                </figcaption>
              )}
            </figure>
          );
        }

        if (block.type === "video") {
          return (
            <div
              key={block.id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-black"
            >
              {block.title && (
                <div className="border-b border-white/10 bg-white/[0.03] px-4 py-3">
                  <h3 className="font-semibold text-white">
                    {block.title}
                  </h3>
                </div>
              )}

              <video
                src={block.content}
                controls
                preload="metadata"
                className="max-h-[650px] w-full"
              />

              {block.description && (
                <p className="border-t border-white/10 px-4 py-3 text-sm text-slate-400">
                  {block.description}
                </p>
              )}
            </div>
          );
        }

        if (block.type === "pdf") {
          return (
            <div
              key={block.id}
              className="overflow-hidden rounded-2xl border border-cyan-400/15 bg-cyan-400/[0.03]"
            >
              <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-300">
                    <FileTextIcon size={24} />
                  </div>

                  <div>
                    <h3 className="font-bold text-white">
                      {block.title || "PDF Document"}
                    </h3>

                    {block.description && (
                      <p className="mt-1 text-sm text-slate-500">
                        {block.description}
                      </p>
                    )}
                  </div>
                </div>

                <a
                  href={block.content}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5"
                >
                  <ExternalLinkIcon size={16} />
                  Open PDF
                </a>
              </div>

              <iframe
                src={block.content}
                title={block.title || "PDF document"}
                className="h-[500px] w-full border-t border-white/10 bg-white"
              />
            </div>
          );
        }

        return (
          <a
            key={block.id}
            href={block.content}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-4 rounded-2xl border border-cyan-400/15 bg-gradient-to-r from-blue-500/[0.06] to-cyan-400/[0.04] p-5 transition hover:border-cyan-400/35 hover:bg-cyan-400/[0.07] sm:flex-row sm:items-center"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
              <LinkIcon size={23} />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-white group-hover:text-cyan-300">
                {block.title || "Website Link"}
              </h3>

              <p className="mt-1 break-all text-sm text-cyan-400/80">
                {block.content}
              </p>

              {block.description && (
                <p className="mt-2 text-sm text-slate-500">
                  {block.description}
                </p>
              )}
            </div>

            <ExternalLinkIcon
              size={19}
            />
          </a>
        );
      })}
    </div>
  );
}

export default function MyPostPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [expiredCount, setExpiredCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [showCreatePost, setShowCreatePost] =
    useState(false);

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [duration, setDuration] =
    useState<DurationOption>("7-days");

  const [blocks, setBlocks] = useState<ContentBlock[]>([
    createBlock("text"),
  ]);

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

  const totalBlocks = useMemo(
    () => blocks.length,
    [blocks]
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
        throw new Error(
          data.message || "Could not load posts."
        );
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
    const timer = window.setInterval(() => {
      setTimerTick((tick) => tick + 1);
    }, 30_000);

    return () => window.clearInterval(timer);
  }, []);

  function updateBlock(
    blockId: string,
    field: keyof ContentBlock,
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

  function addBlock(type: BlockType) {
    setBlocks((current) => [
      ...current,
      createBlock(type),
    ]);
  }

  function deleteBlock(blockId: string) {
    setBlocks((current) => {
      if (current.length === 1) {
        return current;
      }

      return current.filter(
        (block) => block.id !== blockId
      );
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
        id: `${original.type}-${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 8)}`,
      };

      const next = [...current];
      next.splice(index + 1, 0, duplicate);

      return next;
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

      const targetIndex =
        direction === "up" ? index - 1 : index + 1;

      if (
        targetIndex < 0 ||
        targetIndex >= current.length
      ) {
        return current;
      }

      const next = [...current];

      [next[index], next[targetIndex]] = [
        next[targetIndex],
        next[index],
      ];

      return next;
    });
  }

  function resetEditor() {
    setTitle("");
    setImageUrl("");
    setDuration("7-days");
    setBlocks([createBlock("text")]);
  }

  async function createPost(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const cleanBlocks = blocks
      .map((block) => ({
        ...block,
        content: block.content.trim(),
        title: block.title?.trim() || "",
        description: block.description?.trim() || "",
      }))
      .filter((block) => block.content);

    if (!title.trim()) {
      setError("Post title is required.");
      return;
    }

    if (cleanBlocks.length === 0) {
      setError(
        "Add at least one content block before publishing."
      );
      return;
    }

    try {
      setActionLoading(true);
      setError("");
      setNotice("");

      const structuredContent =
        serializeBlocks(cleanBlocks);

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: title.trim(),
          content: structuredContent,
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
      setNotice("Post published successfully.");

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

      setNotice("Post deleted successfully.");
      await loadPosts();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Could not delete post."
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
                likedByMe: Boolean(data.liked),
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
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Could not add comment."
        );
      }

      setCommentNames((current) => ({
        ...current,
        [postId]: "",
      }));

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
    if (!window.confirm("Delete this comment?")) {
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
          data.message || "Could not delete comment."
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

  async function logout() {
    try {
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
    } catch {
      setError("Could not log out.");
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#020817] px-4">
        <div className="rounded-2xl border border-cyan-400/20 bg-slate-950/70 px-6 py-4 text-sm text-cyan-300 backdrop-blur-xl">
          Loading posts...
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020817] px-4 py-10 text-white sm:px-6 lg:px-8">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[130px]" />

        <div className="absolute right-[-10%] top-[10%] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[140px]" />

        <div className="absolute bottom-[-15%] left-[30%] h-[450px] w-[450px] rounded-full bg-blue-500/10 blur-[130px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34,211,238,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,.7) 1px, transparent 1px)",
            backgroundSize: "45px 45px",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-6xl">
        {/* Top Navigation */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => {
              window.location.href = "/";
            }}
            className="group inline-flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-blue-500/5 px-4 py-2.5 text-sm font-semibold text-cyan-300 transition-all hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-white"
          >
            <span className="transition-transform group-hover:-translate-x-1">
              ←
            </span>
            Back to Home
          </button>

          <div className="rounded-full border border-cyan-400/15 bg-cyan-400/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
            Content Dashboard
          </div>
        </div>

        {/* Header */}
        <section className="mb-10">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">
                Tamim Hasan
              </p>

              <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
                <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
                  My Posts
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                Create and manage rich posts with text,
                images, videos, PDF documents and website
                links.
              </p>
            </div>

            {authenticated && (
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    resetEditor();
                    setShowCreatePost(true);
                    setError("");
                    setNotice("");
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-bold text-white shadow-[0_0_30px_rgba(6,182,212,.15)] transition hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(6,182,212,.25)]"
                >
                  <PlusIcon size={18} />
                  Create Post
                </button>

                <button
                  type="button"
                  onClick={logout}
                  className="rounded-xl border border-cyan-400/25 bg-blue-500/10 px-5 py-3 text-sm font-bold text-cyan-300 transition hover:-translate-y-1 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 hover:text-white"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {(error || notice) && (
            <div className="mt-6 space-y-3">
              {error && (
                <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-5 py-4 text-sm text-red-300">
                  {error}
                </div>
              )}

              {notice && (
                <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-4 text-sm text-cyan-200">
                  {notice}
                </div>
              )}
            </div>
          )}

          {/* Stats */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Active Posts
              </p>
              <p className="mt-3 text-3xl font-black text-white">
                {posts.length}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Total Likes
              </p>
              <p className="mt-3 text-3xl font-black text-white">
                {posts.reduce(
                  (sum, post) =>
                    sum + post.likesCount,
                  0
                )}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Comments
              </p>
              <p className="mt-3 text-3xl font-black text-white">
                {posts.reduce(
                  (sum, post) =>
                    sum + post.commentsCount,
                  0
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Empty */}
        {posts.length === 0 && (
          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-16 text-center backdrop-blur-xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
              <FileTextIcon size={28} />
            </div>

            <h2 className="mt-5 text-2xl font-black text-white">
              No active posts
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Create your first rich post to get started.
            </p>
          </div>
        )}

        {/* Posts */}
        <section className="space-y-7">
          {posts.map((post) => {
            const contentBlocks =
              parseContent(post.content);

            return (
              <article
                key={post.id}
                className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 shadow-2xl backdrop-blur-xl"
              >
                <div className="p-5 sm:p-7">
                  {/* Author */}
                  <div className="flex justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-600/30 to-cyan-400/20 text-cyan-300">
                        <UserIcon size={21} />
                      </div>

                      <div>
                        <p className="font-bold text-white">
                          Tamim Hasan
                        </p>

                        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
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

                    {authenticated && (
                      <button
                        type="button"
                        onClick={() =>
                          deletePost(post.id)
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 transition hover:bg-red-500/10 hover:text-red-400"
                        aria-label="Delete post"
                      >
                        <TrashIcon size={17} />
                      </button>
                    )}
                  </div>

                  <h2 className="mt-6 text-2xl font-black tracking-tight text-white">
                    {post.title}
                  </h2>

                  <div className="mt-6">
                    {renderContentBlocks(
                      contentBlocks
                    )}
                  </div>
                </div>

                {/* Engagement */}
                <div className="flex items-center justify-between border-t border-white/10 px-5 py-3 text-sm text-slate-500 sm:px-7">
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

                <div className="grid grid-cols-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() =>
                      toggleLike(post.id)
                    }
                    className={`flex items-center justify-center gap-2 py-3 text-sm font-semibold transition ${
                      post.likedByMe
                        ? "text-pink-400"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
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
                        })
                      )
                    }
                    className="flex items-center justify-center gap-2 border-l border-white/10 py-3 text-sm font-semibold text-slate-400 transition hover:bg-white/5 hover:text-white"
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
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 text-slate-400">
                              <UserIcon size={17} />
                            </div>

                            <div className="flex-1 rounded-2xl bg-white/[0.04] px-4 py-3">
                              <div className="flex justify-between gap-3">
                                <div>
                                  <p className="text-sm font-semibold text-white">
                                    {
                                      comment.name
                                    }
                                  </p>

                                  <p className="text-[11px] text-slate-600">
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
                                    className="text-slate-600 hover:text-red-400"
                                  >
                                    <TrashIcon
                                      size={15}
                                    />
                                  </button>
                                )}
                              </div>

                              <p className="mt-2 text-sm leading-6 text-slate-300">
                                {
                                  comment.message
                                }
                              </p>
                            </div>
                          </div>
                        )
                      )}

                      {post.comments.length ===
                        0 && (
                        <p className="py-3 text-center text-sm text-slate-500">
                          No comments yet.
                        </p>
                      )}
                    </div>

                    <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.025] p-4">
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
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/40"
                      />

                      <div className="mt-3 flex gap-2">
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
                          rows={2}
                          className="flex-1 resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/40"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            addComment(post.id)
                          }
                          className="flex h-11 w-11 shrink-0 items-center justify-center self-end rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                        >
                          <SendIcon size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </section>

        {expiredCount > 0 && (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-center text-sm text-slate-600">
            {expiredCount} expired{" "}
            {expiredCount === 1
              ? "post"
              : "posts"}{" "}
            hidden from visitors.
          </div>
        )}
      </div>

      {/* Create Post Editor */}
      {authenticated && showCreatePost && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/80 p-3 backdrop-blur-md sm:p-6">
          <div className="mx-auto my-4 w-full max-w-5xl overflow-hidden rounded-3xl border border-cyan-400/15 bg-[#06101d] shadow-[0_0_100px_rgba(6,182,212,.12)] sm:my-8">
            {/* Editor Header */}
            <div className="sticky top-0 z-30 flex flex-col gap-4 border-b border-white/10 bg-[#06101d]/95 p-5 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500">
                    <FileTextIcon size={20} />
                  </div>

                  <div>
                    <h2 className="text-xl font-black text-white">
                      Create Rich Post
                    </h2>

                    <p className="text-xs text-slate-500">
                      {totalBlocks} content{" "}
                      {totalBlocks === 1
                        ? "block"
                        : "blocks"}
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowCreatePost(false)
                }
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white sm:static"
              >
                <CloseIcon size={18} />
              </button>
            </div>

            <form
              onSubmit={createPost}
              className="p-5 sm:p-7"
            >
              {/* Basic Info */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                <div className="mb-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-400">
                    Post Information
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Set the main information for your
                    post.
                  </p>
                </div>

                <div className="grid gap-5">
                  <div>
                    <label className="text-sm font-semibold text-slate-300">
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
                      placeholder="Enter post title"
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/50"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-300">
                      Featured Image URL
                      <span className="ml-2 font-normal text-slate-600">
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
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/50"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-300">
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
                      className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1726] px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/50"
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
                </div>
              </div>

              {/* Add Block Toolbar */}
              <div className="mt-6 rounded-2xl border border-cyan-400/15 bg-gradient-to-r from-blue-500/[0.04] to-cyan-400/[0.04] p-4">
                <div className="mb-4">
                  <p className="font-bold text-white">
                    Add Content
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Add as many blocks as you need and
                    arrange them in any order.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                  {(
                    [
                      "text",
                      "image",
                      "video",
                      "pdf",
                      "link",
                    ] as BlockType[]
                  ).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() =>
                        addBlock(type)
                      }
                      className="group flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-3 py-4 text-xs font-semibold text-slate-400 transition hover:border-cyan-400/30 hover:bg-cyan-400/[0.06] hover:text-cyan-300"
                    >
                      <BlockTypeIcon
                        type={type}
                        size={21}
                      />
                      {blockLabel(type)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Blocks */}
              <div className="mt-6 space-y-4">
                {blocks.map(
                  (block, index) => (
                    <div
                      key={block.id}
                      className="rounded-2xl border border-white/10 bg-white/[0.025] p-4 sm:p-5"
                    >
                      {/* Block Header */}
                      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
                            <BlockTypeIcon
                              type={block.type}
                              size={18}
                            />
                          </div>

                          <div>
                            <p className="text-sm font-bold text-white">
                              {blockLabel(
                                block.type
                              )}
                            </p>

                            <p className="text-[11px] text-slate-600">
                              Block {index + 1}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={
                              index === 0
                            }
                            onClick={() =>
                              moveBlock(
                                block.id,
                                "up"
                              )
                            }
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-white/5 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-20"
                            aria-label="Move block up"
                          >
                            <ArrowUpIcon />
                          </button>

                          <button
                            type="button"
                            disabled={
                              index ===
                              blocks.length - 1
                            }
                            onClick={() =>
                              moveBlock(
                                block.id,
                                "down"
                              )
                            }
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-white/5 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-20"
                            aria-label="Move block down"
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
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-white/5 hover:text-cyan-300"
                            aria-label="Duplicate block"
                          >
                            <CopyIcon />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              deleteBlock(
                                block.id
                              )
                            }
                            disabled={
                              blocks.length === 1
                            }
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-red-500/10 hover:text-red-400 disabled:opacity-20"
                            aria-label="Delete block"
                          >
                            <TrashIcon
                              size={17}
                            />
                          </button>
                        </div>
                      </div>

                      {/* Optional Block Title */}
                      <div className="mb-4">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Block Title
                        </label>

                        <input
                          value={block.title || ""}
                          onChange={(event) =>
                            updateBlock(
                              block.id,
                              "title",
                              event.target.value
                            )
                          }
                          placeholder={`Optional ${blockLabel(
                            block.type
                          ).toLowerCase()} title`}
                          className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-700 focus:border-cyan-400/40"
                        />
                      </div>

                      {/* Text */}
                      {block.type ===
                        "text" && (
                        <div>
                          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Text Content
                          </label>

                          <textarea
                            value={block.content}
                            onChange={(event) =>
                              updateBlock(
                                block.id,
                                "content",
                                event.target
                                  .value
                              )
                            }
                            rows={7}
                            placeholder="Write your content here..."
                            className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-7 text-white outline-none placeholder:text-slate-700 focus:border-cyan-400/40"
                          />
                        </div>
                      )}

                      {/* Image */}
                      {block.type ===
                        "image" && (
                        <div>
                          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Image URL
                          </label>

                          <input
                            type="url"
                            value={
                              block.content
                            }
                            onChange={(event) =>
                              updateBlock(
                                block.id,
                                "content",
                                event.target
                                  .value
                              )
                            }
                            placeholder="https://example.com/image.jpg"
                            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-700 focus:border-cyan-400/40"
                          />

                          {block.content && (
                            <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
                              <img
                                src={
                                  block.content
                                }
                                alt={
                                  block.title ||
                                  "Preview"
                                }
                                className="max-h-72 w-full object-cover"
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Video */}
                      {block.type ===
                        "video" && (
                        <div>
                          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Video URL
                          </label>

                          <input
                            type="url"
                            value={
                              block.content
                            }
                            onChange={(event) =>
                              updateBlock(
                                block.id,
                                "content",
                                event.target
                                  .value
                              )
                            }
                            placeholder="https://example.com/video.mp4"
                            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-700 focus:border-cyan-400/40"
                          />

                          {block.content && (
                            <video
                              src={
                                block.content
                              }
                              controls
                              className="mt-4 max-h-72 w-full rounded-xl bg-black"
                            />
                          )}
                        </div>
                      )}

                      {/* PDF */}
                      {block.type === "pdf" && (
                        <div>
                          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                            PDF URL
                          </label>

                          <input
                            type="url"
                            value={
                              block.content
                            }
                            onChange={(event) =>
                              updateBlock(
                                block.id,
                                "content",
                                event.target
                                  .value
                              )
                            }
                            placeholder="https://example.com/document.pdf"
                            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-700 focus:border-cyan-400/40"
                          />

                          {block.content && (
                            <div className="mt-4 flex items-center gap-3 rounded-xl border border-red-400/10 bg-red-500/[0.04] p-4">
                              <FileTextIcon
                                size={24}
                              />

                              <span className="min-w-0 flex-1 truncate text-sm text-slate-300">
                                {
                                  block.content
                                }
                              </span>

                              <a
                                href={
                                  block.content
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-semibold text-cyan-300 hover:text-cyan-200"
                              >
                                Preview
                              </a>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Link */}
                      {block.type ===
                        "link" && (
                        <div>
                          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Website URL
                          </label>

                          <input
                            type="url"
                            value={
                              block.content
                            }
                            onChange={(event) =>
                              updateBlock(
                                block.id,
                                "content",
                                event.target
                                  .value
                              )
                            }
                            placeholder="https://example.com"
                            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-700 focus:border-cyan-400/40"
                          />

                          {block.content && (
                            <div className="mt-3 break-all rounded-xl border border-cyan-400/10 bg-cyan-400/[0.03] px-4 py-3 text-sm text-cyan-300">
                              {block.content}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Description */}
                      {block.type !==
                        "text" && (
                        <div className="mt-4">
                          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Description
                            <span className="ml-2 font-normal normal-case tracking-normal text-slate-700">
                              Optional
                            </span>
                          </label>

                          <textarea
                            value={
                              block.description ||
                              ""
                            }
                            onChange={(event) =>
                              updateBlock(
                                block.id,
                                "description",
                                event.target
                                  .value
                              )
                            }
                            rows={2}
                            placeholder="Add a short description..."
                            className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-700 focus:border-cyan-400/40"
                          />
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>

              {/* Editor Footer */}
              <div className="mt-7 flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() =>
                    setShowCreatePost(false)
                  }
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-bold text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={actionLoading}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-3 text-sm font-bold text-white shadow-[0_0_25px_rgba(6,182,212,.12)] transition hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(6,182,212,.2)] disabled:cursor-not-allowed disabled:opacity-50"
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