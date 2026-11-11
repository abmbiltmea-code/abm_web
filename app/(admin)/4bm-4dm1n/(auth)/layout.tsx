import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import ClientSideLink from "../client-side-link";
import AdminNavbar from "@/app/components/admin/AdminNavbar/Index";
import Image from "next/image";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-cream-bg">
      {/* Sidebar */}
      <aside className="w-[264px] shrink-0 bg-white flex flex-col h-screen border-r border-gray-200 shadow-[2px_0_12px_-6px_rgba(0,0,0,0.08)]">
        {/* Brand */}
        <Link
          href="/4bm-4dm1n"
          className="flex flex-col items-center gap-2 px-6 pt-7 pb-6 border-b border-gray-200"
        >
          <Image
            src="/assets/images/logos/header-logo.png"
            alt="Logo"
            width={150}
            height={150}
            className="h-auto w-[150px]"
          />
          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-500">
            Admin Console
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-0.5 [scrollbar-width:thin]">
          <AdminNavbar />
        </nav>

        {/* Logout */}
        <div className="px-3 py-3 border-t border-gray-200">
          <ClientSideLink
            href="/admin/logout"
            name="Logout"
            icon={<ArrowRightOnRectangleIcon className="h-4 w-4" />}
            className="text-red-600 hover:bg-red-50 hover:text-red-700"
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {/* Scrollable Content */}
        <div className="h-full overflow-y-auto px-8 pb-8 pt-15 bg-[#F4F3F1] bg-[radial-gradient(ellipse_at_top_right,rgba(227,30,38,0.06),transparent_50%)]">
          {children}
        </div>
      </main>
    </div>
  );
}
