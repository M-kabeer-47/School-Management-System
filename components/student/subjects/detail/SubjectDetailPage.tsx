"use client";

import { useState } from "react";
import {
  SubjectDetail,
  SubjectDetailTab,
} from "@/lib/student/types/subjectDetail";
import { SubjectHeader } from "./SubjectHeader";
import { TopicsList } from "./TopicsList";
import { MaterialsList } from "./MaterialsList";
import { TestsTable } from "./TestsTable";
import { ResponsiveTabs } from "@/components/ui/ResponsiveTabs";
import { Icons, SubjectIcons } from "@/utils/student/icons";
import { motion } from "framer-motion";

interface SubjectDetailPageProps {
  subject: SubjectDetail;
}

export const SubjectDetailPage = ({ subject }: SubjectDetailPageProps) => {
  const [activeTab, setActiveTab] = useState("topics");

  const tabOptions = [
    {
      value: "topics",
      label: "Topics",
      icon: <SubjectIcons.Topics className="w-5 h-5" />,
    },
    {
      value: "materials",
      label: "Materials",
      icon: <SubjectIcons.Materials className="w-5 h-5" />,
    },
    {
      value: "tests",
      label: "Tests",
      icon: <SubjectIcons.Tests className="w-5 h-5" />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Subject Header */}
      <SubjectHeader subject={subject} />

      {/* Responsive Navigation */}
      <ResponsiveTabs
        value={activeTab}
        onValueChange={setActiveTab}
        options={tabOptions}
        className="mb-6"
      />

      {/* Content Panels */}
      <div className="w-full">
        {activeTab === "topics" && (
          <TopicsList topicUnits={subject.topicUnits} />
        )}
        {activeTab === "materials" && (
          <MaterialsList materials={subject.materials} />
        )}
        {activeTab === "tests" && <TestsTable tests={subject.tests} />}
      </div>
    </motion.div>
  );
};
