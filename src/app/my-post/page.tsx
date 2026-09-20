import { redirect } from "next/navigation";

export default function LegacyMyPostsPage() {
  redirect("/dashboard/posts");
}
