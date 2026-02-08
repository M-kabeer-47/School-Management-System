"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Phone,
  Mail,
  Globe,
  MapPin,
  User,
  Hash,
  Calendar,
  Upload,
  GraduationCap,
  Landmark,
  Layers,
  Languages,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/admin/PageHeader";
import {
  InfoGridCard,
  InfoField,
} from "@/components/admin/students/detail/InfoGridCard";
import { schoolProfile as initialData } from "@/lib/admin/mock-data/settings";
import { SchoolProfile } from "@/lib/admin/types/settings";

export default function SchoolProfilePage() {
  const [data, setData] = useState<SchoolProfile>(initialData);

  const handleSaveIdentity = (updated: Partial<SchoolProfile>) => {
    setData((prev) => ({ ...prev, ...updated }));
    console.log("Save Identity:", updated);
  };

  const handleSaveContact = (updated: Partial<SchoolProfile>) => {
    setData((prev) => ({ ...prev, ...updated }));
    console.log("Save Contact:", updated);
  };

  const handleSavePrincipal = (updated: Partial<SchoolProfile>) => {
    setData((prev) => ({ ...prev, ...updated }));
    console.log("Save Principal:", updated);
  };

  // Field definitions for each section
  const identityFields: InfoField[] = [
    { key: "name", label: "School Name", icon: Building2 },
    {
      key: "schoolType",
      label: "School Type",
      icon: Landmark,
      type: "select",
      options: [
        { label: "Government", value: "Government" },
        { label: "Semi-Government", value: "Semi-Government" },
        { label: "Private", value: "Private" },
      ],
    },
    {
      key: "schoolLevel",
      label: "School Level",
      icon: Layers,
      type: "select",
      options: [
        { label: "Primary (1–5)", value: "Primary (1–5)" },
        { label: "Middle (1–8)", value: "Middle (1–8)" },
        { label: "High (1–10)", value: "High (1–10)" },
        { label: "Higher Secondary (1–12)", value: "Higher Secondary (1–12)" },
      ],
    },
    { key: "board", label: "Board / Affiliation", icon: GraduationCap },
    {
      key: "medium",
      label: "Medium of Instruction",
      icon: Languages,
      type: "select",
      options: [
        { label: "English Medium", value: "English Medium" },
        { label: "Urdu Medium", value: "Urdu Medium" },
        {
          label: "Bilingual (English + Urdu)",
          value: "Bilingual (English + Urdu)",
        },
      ],
    },
    {
      key: "genderPolicy",
      label: "Gender Policy",
      icon: Users,
      type: "select",
      options: [
        { label: "Co-Education", value: "Co-Education" },
        { label: "Boys Only", value: "Boys Only" },
        { label: "Girls Only", value: "Girls Only" },
      ],
    },
    { key: "establishedYear", label: "Established Year", icon: Calendar },
    { key: "registrationNo", label: "Registration No.", icon: Hash },
  ];

  const contactFields: InfoField[] = [
    { key: "address", label: "Address", icon: MapPin },
    { key: "city", label: "City", icon: MapPin },
    { key: "phone", label: "Phone", icon: Phone },
    { key: "phone2", label: "Phone 2", icon: Phone },
    { key: "email", label: "Email", icon: Mail },
    { key: "website", label: "Website", icon: Globe },
  ];

  const principalFields: InfoField[] = [
    { key: "principalName", label: "Name", icon: User },
    { key: "principalPhone", label: "Phone", icon: Phone },
    { key: "principalEmail", label: "Email", icon: Mail },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 pb-8 sm:pb-0"
    >
      {/* Header */}
      <PageHeader
        title="School Profile"
        subtitle="School identity, contact information, and principal details"
      />

      {/* Logo Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-surface rounded-2xl border border-border p-6 shadow-sm"
      >
        <div className="flex items-center gap-6">
          {/* Logo Preview */}
          <div className="w-24 h-24 rounded-2xl bg-accent/10 border-2 border-dashed border-accent/30 flex items-center justify-center shrink-0 group hover:border-accent/50 transition-colors cursor-pointer">
            {data.logo ? (
              <img
                src={data.logo}
                alt="School Logo"
                className="w-full h-full object-contain rounded-2xl"
              />
            ) : (
              <Building2 className="w-10 h-10 text-accent/60 group-hover:text-accent transition-colors" />
            )}
          </div>

          {/* Logo Info */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-text-primary">{data.name}</h3>
            <p className="text-sm text-text-muted mt-1">
              School logo appears on report cards, challans, and admit cards
            </p>
            <Button variant="outline" size="sm" className="mt-3 gap-2">
              <Upload className="w-3.5 h-3.5" /> Upload Logo
            </Button>
          </div>
        </div>
      </motion.div>
      <div className="grid gap-5 items-stretch">
        {/* School Identity */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="pb-4 md:pb-6"
        >
          <InfoGridCard
            title="School Identity"
            icon={Building2}
            data={data}
            fields={identityFields}
            onSave={handleSaveIdentity}
            columns={2}
            className="h-full"
          />
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="pb-4 md:pb-6"
        >
          <InfoGridCard
            title="Contact Information"
            icon={Phone}
            data={data}
            fields={contactFields}
            onSave={handleSaveContact}
            columns={2}
            className="h-full"
          />
        </motion.div>

        {/* Principal Details */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="pb-4 md:pb-6"
        >
          <InfoGridCard
            title="Principal Details"
            icon={User}
            data={data}
            fields={principalFields}
            onSave={handleSavePrincipal}
            columns={2}
            className="h-full"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
