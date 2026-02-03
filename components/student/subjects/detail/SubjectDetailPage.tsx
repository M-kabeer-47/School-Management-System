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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { SubjectIcons } from "@/utils/common/icons";
import { motion } from "framer-motion";

interface SubjectDetailPageProps {
  subject: SubjectDetail;
}

export const SubjectDetailPage = ({ subject }: SubjectDetailPageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Subject Header */}
      <SubjectHeader subject={subject} />

      {/* Tabs using @coss/tabs - with horizontal scroll */}
      <Tabs defaultValue="topics" className="w-full">
        <div className=" pb-2 h-fit">
          <TabsList className="overflow-x-auto overflow-y-hidden max-w-full md:w-[60%] mb-2">
            <TabsTrigger value="topics" className="flex-1">
              <SubjectIcons.Topics className="w-5 h-5" />
              Topics
            </TabsTrigger>
            <TabsTrigger value="materials" className="flex-1">
              <SubjectIcons.Materials className="w-5 h-5" />
              Materials
            </TabsTrigger>
            <TabsTrigger value="tests" className="flex-1">
              <SubjectIcons.Tests className="w-5 h-5" />
              Tests
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="topics">
          <TopicsList topicUnits={subject.topicUnits} />
        </TabsContent>

        <TabsContent value="materials">
          <MaterialsList materials={subject.materials} />
        </TabsContent>

        <TabsContent value="tests">
          <TestsTable tests={subject.tests} />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};
