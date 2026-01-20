"use client";

import { Icons } from "@/utils/sidebar/icons";
import { useState } from "react";

export default function Home() {
  const [isDark, setIsDark] = useState(false);

  // Toggle Theme Helper (for demo purposes)
  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-text-primary">
            Welcome back, Ali! 👋
          </h1>
          <p className="text-text-secondary mt-1">
            Here's what's happening with your child today.
          </p>
        </div>

        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium hover:bg-surface-hover self-start md:self-auto"
        >
          Toggle {isDark ? "Light" : "Dark"} Mode
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-background rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-accent-light rounded-xl text-accent">
              <Icons.Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-text-muted font-medium">Attendance</p>
              <p className="text-2xl font-bold text-text-primary">92%</p>
            </div>
          </div>
          <div className="w-full bg-surface-active h-2 rounded-full overflow-hidden">
            <div className="bg-accent h-full w-[92%]" />
          </div>
        </div>

        <div className="bg-background rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-success-light rounded-xl text-success">
              <Icons.BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-text-muted font-medium">Assignments</p>
              <p className="text-2xl font-bold text-text-primary">12/15</p>
            </div>
          </div>
          <div className="w-full bg-surface-active h-2 rounded-full overflow-hidden">
            <div className="bg-success h-full w-[80%]" />
          </div>
        </div>

        <div className="bg-background rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-warning-light rounded-xl text-warning">
              <Icons.Wallet className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-text-muted font-medium">Fee Status</p>
              <p className="text-2xl font-bold text-text-primary">Paid</p>
            </div>
          </div>
          <p className="text-xs text-text-secondary mt-2">
            Next due: Feb 10, 2026
          </p>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-background rounded-2xl border border-border shadow-sm">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="font-heading font-bold text-lg text-text-primary">
            Recent Activity
          </h2>
          <button className="text-sm text-accent font-medium hover:underline">
            View All
          </button>
        </div>
        <div className="divide-y divide-border">
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="p-4 flex items-start gap-4 hover:bg-surface transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-surface-active flex items-center justify-center flex-shrink-0 text-text-secondary">
                <Icons.MessageSquare className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-text-primary">
                  New Announcement
                </h4>
                <p className="text-sm text-text-secondary mt-1">
                  School will be closed on Friday for maintenance.
                </p>
                <p className="text-xs text-text-muted mt-2">2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
