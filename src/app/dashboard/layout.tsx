import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { ADMIN_COOKIE_NAME, verifyAdminSessionToken } from "@/lib/admin-auth";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const store = await cookies();
  if (!verifyAdminSessionToken(store.get(ADMIN_COOKIE_NAME)?.value)) redirect("/login");
  return <DashboardShell>{children}</DashboardShell>;
}
