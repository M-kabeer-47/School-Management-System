"use client";

import { Subject } from "@/lib/types/subjects";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, User } from "lucide-react";

interface SubjectListItemProps {
  subject: Subject;
  isLast?: boolean;
}

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export const SubjectListItem = ({
  subject,
  isLast = false,
}: SubjectListItemProps) => {
  return (
    <motion.div variants={item}>
      <Link
        href={`/subjects/${subject.id}`}
        className={`flex items-center gap-3 md:gap-4 px-4 py-3.5 md:px-5 md:py-4 hover:bg-surface-hover active:bg-surface-active transition-colors group ${
          !isLast ? "border-b border-border" : ""
        }`}
      >
        {/* Subject Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm md:text-base font-semibold text-text-primary">
            {subject.name}
          </h3>
          <div className="flex items-center gap-1.5 mt-0.5">
            <User className="w-3 h-3 text-text-muted" />
            <p className="text-xs md:text-sm text-text-muted truncate">
              {subject.teacher.name}
            </p>
          </div>
        </div>

        {/* Chevron */}
        <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-text-muted group-hover:text-text-secondary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
      </Link>
    </motion.div>
  );
};
