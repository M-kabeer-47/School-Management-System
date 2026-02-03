"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { StudentCard } from "@/components/student/profile/StudentCard";
import { ParentCard } from "@/components/student/profile/ParentCard";
import { AddressCard } from "@/components/student/profile/AddressCard";
import { mockProfile } from "@/lib/student/mock-data/profile";
import { ProfileData, ParentInfo } from "@/lib/student/types/profile";
import { PageHeaderIcons } from "@/utils/student/icons";

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData>(mockProfile);

  const handlePhotoChange = (file: File) => {
    // In a real app, you'd upload the file and get a URL back
    console.log("Photo changed:", file.name);
  };

  const handleFatherSave = (data: ParentInfo) => {
    setProfile((prev) => ({ ...prev, father: data }));
  };

  const handleMotherSave = (data: ParentInfo) => {
    setProfile((prev) => ({ ...prev, mother: data }));
  };

  const handleSetFatherPrimary = () => {
    setProfile((prev) => ({ ...prev, primaryContact: "father" }));
  };

  const handleSetMotherPrimary = () => {
    setProfile((prev) => ({ ...prev, primaryContact: "mother" }));
  };

  const handleAddressSave = (
    address: ProfileData["address"],
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
    >
      {/* Page Header */}
      <div className="mb-6 md:mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-4xl font-bold font-heading text-text-primary flex items-center gap-2 md:gap-3"
        >
          My Profile
          <PageHeaderIcons.Profile className="w-8 h-8 md:w-12 md:h-12" />
        </motion.h1>
        <p className="text-text-secondary mt-1 md:mt-2 text-xs md:text-base">
          View and manage your child&apos;s profile and family information.
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Student Information */}
        <section>
          <StudentCard
            student={profile.student}
            onPhotoChange={handlePhotoChange}
          />
        </section>

        {/* Parent Information */}
        <section>
          <h2 className="text-lg md:text-xl font-semibold text-text-primary font-heading mb-4 flex items-center gap-2">
            <span>Parent / Guardian Information</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <ParentCard
              title="Father"
              parent={profile.father}
              isPrimary={profile.primaryContact === "father"}
              onSave={handleFatherSave}
              onSetPrimary={handleSetFatherPrimary}
            />
            <ParentCard
              title="Mother"
              parent={profile.mother}
              isPrimary={profile.primaryContact === "mother"}
              onSave={handleMotherSave}
              onSetPrimary={handleSetMotherPrimary}
            />
          </div>
        </section>

        {/* Address & Emergency Contact */}
        <section>
          <h2 className="text-lg md:text-xl font-semibold text-text-primary font-heading mb-4 flex items-center gap-2">
            <span>Address</span>
          </h2>
          <AddressCard address={profile.address} onSave={handleAddressSave} />
        </section>
      </div>
    </motion.div>
  );
}
