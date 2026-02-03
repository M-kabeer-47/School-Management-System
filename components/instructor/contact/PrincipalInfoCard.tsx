"use client";

import { motion } from "framer-motion";
import { Briefcase, User, Mail } from "lucide-react";
import { schoolContact } from "@/lib/student/mock-data/contact";
import { ContactItem } from "./ContactItem";

export const PrincipalInfoCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-background rounded-2xl border border-border shadow-sm overflow-hidden"
    >
      <div className="px-5 py-4 border-b border-border bg-surface/50">
        <h2 className="font-semibold text-text-primary font-heading flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-accent" /> Principal's Office
        </h2>
      </div>
      <div className="p-5 space-y-4">
        <ContactItem icon={User} label="Principal">
          {schoolContact.principalName}
        </ContactItem>
        <ContactItem icon={Mail} label="Direct Email">
          <a
            href={`mailto:${schoolContact.principalEmail}`}
            className="hover:text-accent transition-colors break-all"
          >
            {schoolContact.principalEmail}
          </a>
        </ContactItem>
      </div>
    </motion.div>
  );
};
