"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FeesTable } from "@/components/fees";
import {
  challans,
  getPendingChallans,
  getPaidChallans,
} from "@/lib/mockData/fees";
import { Button } from "@/components/ui/Button";
import { Eye, EyeOff } from "lucide-react";

export default function FeesPage() {
  const [showAll, setShowAll] = useState(false);

  const pendingChallans = getPendingChallans();
  const paidChallans = getPaidChallans();
  const displayChallans = showAll ? challans : pendingChallans;

  const hasPendingFees = pendingChallans.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Page Header */}
      <div className="mb-6 md:mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-4xl font-bold font-heading text-text-primary flex items-center gap-2 md:gap-3"
        >
          Fees
          <span className="text-xl md:text-3xl">💰</span>
        </motion.h1>
        <p className="text-text-secondary mt-1 md:mt-2 text-xs md:text-base">
          {hasPendingFees
            ? "View and download your fee challans."
            : "All fees are paid for this session."}
        </p>
      </div>

      {/* Empty State */}
      {!hasPendingFees && !showAll ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-success-light border border-success/20 rounded-2xl p-6 md:p-8 text-center"
        >
          <div className="text-4xl md:text-5xl mb-3">✅</div>
          <h2 className="text-lg md:text-xl font-bold text-success mb-2">
            No Pending Fees
          </h2>
          <p className="text-text-secondary text-sm md:text-base">
            All challans are paid for this session.
          </p>
        </motion.div>
      ) : (
        /* Challans Table */
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <FeesTable challans={displayChallans} showPaid={showAll} />
        </motion.div>
      )}

      {/* View All / Hide Paid Button */}
      {paidChallans.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mt-6 flex justify-center"
        >
          <Button
            onClick={() => setShowAll(!showAll)}
            variant="outline"
            className="gap-2"
          >
            {showAll ? (
              <>
                <EyeOff className="w-4 h-4" />
                Hide Paid Challans
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                View All Challans
              </>
            )}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
