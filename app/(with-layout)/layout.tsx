import { Navbar } from "@/components/ui/Navbar";
import { Sidebar } from "@/components/ui/sidebar/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full">
      <Sidebar />
      <main className="flex-1 min-w-0 w-full overflow-auto relative flex flex-col">
        <Navbar />
        <div className="flex-1 overflow-auto w-full">
          <div className="p-4 md:px-8 md:py-6 w-full max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
