"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { mockInstructorComplaints } from "@/lib/instructor/mock-data/contact";
import { SchoolInfoCard } from "@/components/common/contact/SchoolInfoCard";
import { PrincipalInfoCard } from "@/components/common/contact/PrincipalInfoCard";
import { ContactRequestsPanel } from "@/components/common/contact/ContactRequestsPanel";

export default function InstructorContactSchoolPage() {
  const handleComplaintSubmit = (data: {
    subject: string;
    category: string;
    message: string;
  }) => {
    console.log("Instructor complaint submitted:", data);
    // In a real app, you'd send this to your backend
  };

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
          Contact School
          <Phone className="w-6 h-6 md:w-8 md:h-8 text-accent" />
        </motion.h1>
        <p className="text-text-secondary mt-1 md:mt-2 text-xs md:text-base">
          Get in touch with administration or submit a request.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Column - Contact Details */}
        <div className="lg:col-span-2 space-y-4">
          <SchoolInfoCard />
          <PrincipalInfoCard />
        </div>

        {/* Right Column - Complaints/Requests */}
        <div className="lg:col-span-3">
          <ContactRequestsPanel
            role="instructor"
            complaints={mockInstructorComplaints}
            onSubmit={handleComplaintSubmit}
          />
        </div>
      </div>
    </motion.div>
  );
}
