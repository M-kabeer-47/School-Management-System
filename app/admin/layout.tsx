import { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/ui/sidebar/Sidebar";
import { Navbar } from "@/components/ui/Navbar";

export const metadata: Metadata = {
  title: "Admin Portal | School Management System",
  description: "School Administration Dashboard",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-background h-screen w-full overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 w-full h-full relative flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-auto w-full">
          <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">{children}</div>
        </div>
      </main>
    </div>
  );
}
