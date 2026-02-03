"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map as MapIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { RoomMappingTable } from "@/components/admin/settings/RoomMappingTable";
import {
  SCHOOL_LEVELS,
  SchoolLevelId,
} from "@/lib/admin/constants/school-levels";
import { MOCK_ROOM_MAPPINGS } from "@/lib/admin/mock-data/rooms";
import { ResponsiveTabs } from "@/components/ui/ResponsiveTabs";
import { SearchBar } from "@/components/ui/SearchBar";
import { EditRoomMappingModal } from "@/components/admin/settings/EditRoomMappingModal";
import { RoomMapping } from "@/lib/admin/types/room-mapping";
import { Pagination } from "@/components/ui/Pagination";
import { clsx } from "clsx";

export default function RoomConfigurationPage() {
  const [selectedLevel, setSelectedLevel] = useState<SchoolLevelId | "ALL">(
    "ALL",
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Edit State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<RoomMapping | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  // Filter Data
  const filteredData = MOCK_ROOM_MAPPINGS.filter((room) => {
    // Level Filter
    if (selectedLevel !== "ALL" && room.sectionLevel !== selectedLevel)
      return false;

    // Search Filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        room.roomName.toLowerCase().includes(q) ||
        room.roomId.toLowerCase().includes(q) ||
        `class ${room.grade}`.toLowerCase().includes(q)
      );
    }

    return true;
  });

  // Calculate Paginated Data
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // Reset to first page when search or level changes
  const handleLevelChange = (val: string) => {
    setSelectedLevel(val as SchoolLevelId | "ALL");
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleEdit = (room: RoomMapping) => {
    setSelectedRoom(room);
    setIsEditModalOpen(true);
  };

  const handleSave = (updatedRoom: RoomMapping) => {
    console.log("Saving room:", updatedRoom);
    // Update logic would go here
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-6 pb-20">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary font-heading flex items-center gap-3">
            <div className="p-2 rounded-xl bg-accent/10">
              <MapIcon className="w-6 h-6 text-accent" />
            </div>
            Room Configuration
          </h1>
          <p className="text-text-secondary mt-2 max-w-2xl">
            Map classes to their physical rooms and configure seating capacities
            for exams. This data is used to automatically generate exam seating
            plans.
          </p>
        </div>
        <Button className="bg-accent hover:bg-accent-hover text-white shadow-lg shadow-accent/20 transition-all">
          <Plus className="w-4 h-4 mr-2" />
          Add New Room
        </Button>
      </div>

      {/* CONTROLS BAR */}
      <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-6 bg-surface p-4 rounded-2xl border border-border shadow-sm">
        {/* Level Switcher - Responsive Tabs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
          {/* Mobile Label */}
          <span className="lg:hidden text-xs font-semibold text-text-muted uppercase tracking-widest">
            Select Section Level:
          </span>

          <ResponsiveTabs
            value={selectedLevel}
            onValueChange={handleLevelChange}
            options={[
              { value: "ALL", label: "All", desktopLabel: "All Sections" },
              ...SCHOOL_LEVELS.map((level) => ({
                value: level.id,
                label: level.label.split("(")[0].trim(),
              })),
            ]}
            className="w-full lg:w-auto"
          />
        </div>

        {/* Search */}
        <div className="w-full lg:w-72">
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search classes or rooms..."
            className="w-full"
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="space-y-6">
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedLevel + searchQuery + currentPage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <RoomMappingTable data={paginatedData} onEdit={handleEdit} />

              {filteredData.length > 0 && (
                <div className="mt-4 text-xs text-text-muted text-center italic">
                  Showing {paginatedData.length} of {filteredData.length}{" "}
                  mappings for{" "}
                  {selectedLevel === "ALL"
                    ? "all usage levels"
                    : SCHOOL_LEVELS.find((l) => l.id === selectedLevel)?.label}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination UI */}
        <div className="flex justify-center pt-4 border-t border-border/50">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* MODAL */}
      <EditRoomMappingModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        room={selectedRoom}
        onSave={handleSave}
      />
    </div>
  );
}
