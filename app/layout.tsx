import type { Metadata } from "next";
import { Montserrat, Inter, Rubik } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/ui/sidebar/Sidebar";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Student Portal",
  description: "School Management System",
};

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/ui/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${inter.variable} ${rubik.variable} antialiased flex h-screen bg-surface overflow-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex h-full w-full">
            <Sidebar />
            <main className="flex-1 min-w-0 overflow-auto relative flex flex-col">
              <Navbar />
              <div className="flex-1 overflow-auto ">
                <div className="p-4 md:px-8 md:py-6 max-w-7xl mx-auto">
                  {children}
                </div>
              </div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
