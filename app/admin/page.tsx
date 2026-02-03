"use client";

import { motion } from "framer-motion";

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

      <div className="bg-surface border border-border rounded-2xl p-12 text-center text-text-muted">
        <p>Chart and detailed analytics modules coming soon...</p>
      </div>
    </motion.div>
  );
}
