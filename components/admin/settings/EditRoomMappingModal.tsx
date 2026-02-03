"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Users, Layers } from "lucide-react";
import { RoomMapping } from "@/lib/admin/types/room-mapping";
import { Input } from "@/components/ui/Input";

interface EditRoomMappingModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: RoomMapping | null;
  onSave: (updatedRoom: RoomMapping) => void;
}

export function EditRoomMappingModal({
  isOpen,
  onClose,
  room,
  onSave,
}: EditRoomMappingModalProps) {
  const [roomId, setRoomId] = useState("");
  const [capacity, setCapacity] = useState<number | "">("");

  useEffect(() => {
    if (room) {
      setRoomId(room.roomId.replace("room-", "")); // Show clean ID if possible, or just the name if logic differs
      // Ideally we edit 'roomName' or 'roomId'. Let's assume Room Number/ID for now.
      // The user asked for "Room" editing.
      setRoomId(room.roomName.replace("Room ", ""));
      setCapacity(room.capacity);
    }
  }, [room]);

  const handleSave = () => {
    if (!room) return;

    // Construct updated room object
    const updatedRoom: RoomMapping = {
      ...room,
      roomName: `Room ${roomId}`,
      roomId: `room-${roomId}`,
      capacity: Number(capacity),
      examCapacity: Math.floor(Number(capacity) * 0.6),
    };

    onSave(updatedRoom);
    onClose();
  };

  if (!room) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Room Mapping">
      <div className="space-y-6 pt-4">
        {/* Info Banner */}
        <div className="bg-accent/5 border border-accent/10 rounded-xl p-4 flex items-center gap-3">
          <div>
            <div className="font-semibold text-text-primary">
              Class {room.grade}-{room.section}
            </div>
            <div className="text-xs text-text-secondary">
              {room.sectionLevel} Section
            </div>
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Room Number
            </label>
            <Input
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="e.g. 101"
              className="bg-surface"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary flex items-center gap-2">
              <Users className="w-4 h-4" />
              Standard Capacity
            </label>
            <Input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
              placeholder="e.g. 40"
              className="bg-surface"
            />
            <p className="text-xs text-text-muted ml-1">
              Exam capacity will be automatically calculated as 60% of standard.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-accent text-white hover:bg-accent-hover"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
}
