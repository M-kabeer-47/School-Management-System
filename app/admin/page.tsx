"use client";

import { motion } from "framer-motion";
import { Icons } from "@/utils/sidebar/icons";

export default function AdminDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-screen-2xl mx-auto"
    >
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-heading text-text-primary">
          Admin Dashboard
        </h1>
        <p className="text-text-secondary mt-2">
          Overview of school performance and key metrics.
        </p>
      </header>

      {/* Stats Grid Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: "Total Students",
            value: "2,540",
            icon: Icons.GraduationCap,
            color: "bg-blue-500",
          },
          {
            label: "Total Staff",
            value: "128",
            icon: Icons.User,
            color: "bg-purple-500",
          },
          {
            label: "Attendance Today",
            value: "96%",
            icon: Icons.Calendar,
            color: "bg-green-500",
          },
          {
            label: "Total Revenue",
            value: "$45k",
            icon: Icons.Wallet,
            color: "bg-orange-500",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-surface border border-border rounded-2xl p-6 shadow-sm flex items-center gap-4"
          >
            <div
              className={`w-12 h-12 rounded-xl ${stat.color} bg-opacity-10 flex items-center justify-center text-${stat.color.split("-")[1]}-600`}
            >
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-text-secondary text-sm font-medium">
                {stat.label}
              </p>
              <h3 className="text-2xl font-bold text-text-primary">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-surface border border-border rounded-2xl p-12 text-center text-text-muted">
        <p>Chart and detailed analytics modules coming soon...</p>
      </div>
    </motion.div>
  );
}
