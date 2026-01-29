"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { InstructorCard } from "@/components/instructor/profile/InstructorCard";
import { ContactCard } from "@/components/instructor/profile/ContactCard";
import { AddressCard } from "@/components/instructor/profile/AddressCard";
import { mockInstructorProfile } from "@/lib/instructor/mock-data/profile";
import { InstructorProfileData } from "@/lib/instructor/types/profile";

export default function InstructorProfilePage() {
  const [profile, setProfile] = useState<InstructorProfileData>(
    mockInstructorProfile,
  );

  const handlePhotoChange = (file: File) => {
    console.log("Photo changed:", file.name);
    // In a real app, upload the file and update the profile
  };

  const handleContactSave = (contact: InstructorProfileData["contact"]) => {
    setProfile((prev) => ({ ...prev, contact }));
  };

  const handleAddressSave = (
    address: InstructorProfileData["address"],
    emergencyContact?: string,
  ) => {
    setProfile((prev) => ({
      ...prev,
      address,
      emergencyContact: emergencyContact || prev.emergencyContact,
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-4xl font-heading font-bold tracking-tight text-text-primary flex items-center gap-2 md:gap-3">
          My Profile
          <User className="w-6 h-6 md:w-8 md:h-8 text-accent" />
        </h1>
        <p className="text-text-muted mt-1 text-sm md:text-base">
          View and manage your profile information.
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Instructor Information */}
        <section>
          <InstructorCard
            instructor={profile.instructor}
            onPhotoChange={handlePhotoChange}
          />
        </section>

        {/* Contact & Address */}
        <section>
          <h2 className="text-lg md:text-xl font-semibold text-text-primary font-heading mb-4 flex items-center gap-2">
            Contact Details
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <ContactCard contact={profile.contact} onSave={handleContactSave} />
            <AddressCard address={profile.address} onSave={handleAddressSave} />
          </div>
        </section>
      </div>
    </motion.div>
  );
}
