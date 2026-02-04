"use client";

import { useState } from "react";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import DateTimePicker from "@/components/ui/DateTimePicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

interface CreateSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (session: {
    type: string;
    startDate: string;
    endDate: string;
  }) => void;
}

export function CreateSessionModal({
  isOpen,
  onClose,
  onCreate,
}: CreateSessionModalProps) {
  const [newSession, setNewSession] = useState({
    type: "",
    startDate: "",
    endDate: "",
  });

  const sessionTypes = [
    "First Term",
    "Second Term",
    "Third Term",
    "Final Term",
  ];

  return (
    <Modal
      isOpen={isOpen}
      maxWidth="lg"
      onClose={onClose}
      title="Create Exam Session"
      description="Define the timeline and type for your new assessment cycle."
      icon={
        <div className="p-3 bg-accent/10 rounded-xl">
          <CalendarDays className="w-6 h-6 text-accent" />
        </div>
      }
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-text-primary">
            Session Type
          </label>
          <Select
            value={newSession.type}
            onValueChange={(v) => setNewSession({ ...newSession, type: v })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select session type..." />
            </SelectTrigger>
            <SelectContent>
              {sessionTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-text-primary">
              Start Date
            </label>
            <DateTimePicker
              showTime={false}
              value={newSession.startDate}
              onChange={(v) => setNewSession({ ...newSession, startDate: v })}
              placeholder="Pick date"
              side="top"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-text-primary">
              End Date
            </label>
            <DateTimePicker
              showTime={false}
              value={newSession.endDate}
              onChange={(v) => setNewSession({ ...newSession, endDate: v })}
              placeholder="Pick date"
              side="top"
              align="right"
            />
          </div>
        </div>

        <div className="pt-4 flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="flex-1"
            disabled={
              !newSession.type || !newSession.startDate || !newSession.endDate
            }
            onClick={() => {
              onCreate(newSession);
              onClose();
            }}
          >
            Create Session
          </Button>
        </div>
      </div>
    </Modal>
  );
}
