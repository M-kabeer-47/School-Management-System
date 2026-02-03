import { motion } from "framer-motion";
import { Users, Monitor, BookOpen, Edit2 } from "lucide-react";
import { RoomMapping } from "@/lib/admin/types/room-mapping";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableHeadRow,
  TableRow,
  TableCell,
} from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";

interface RoomMappingTableProps {
  data: RoomMapping[];
  onEdit: (room: RoomMapping) => void;
}

const MotionRow = motion(TableRow);

export function RoomMappingTable({ data, onEdit }: RoomMappingTableProps) {
  if (data.length === 0) {
    // ... (Empty state remains same but standardizing returns)
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-border/50 rounded-2xl bg-surface/30">
        <h3 className="text-lg font-semibold text-text-primary">
          No Rooms Configured
        </h3>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableHeadRow>
          <TableHead>Class Name</TableHead>
          <TableHead>Room Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Capacity</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableHeadRow>
      </TableHeader>
      <TableBody>
        {data.map((room, index) => (
          <MotionRow
            key={room.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            {/* Class Name: "9-A" */}
            <TableCell className="font-medium text-text-primary">
              {room.grade}-{room.section}
            </TableCell>

            {/* Room Name: "9-A" (As requested to map class with itself/room name) */}
            <TableCell>
              <div className="flex items-center gap-2">
                {/*  User requested "Just room name no extra details".
                      And "map each class with itself"
                      So passing room.roomName (which is "Room 9-A" or similar). 
                      User said "dont write prefix Class or Room".
                      So if roomName is "Room 101", display "101". 
                  */}
                {room.roomName.replace(/^(Room|Class)\s+/i, "")}
              </div>
            </TableCell>

            {/* Type */}
            <TableCell>
              {room.isClassroom ? (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-medium border border-emerald-500/20">
                  <Monitor className="w-3.5 h-3.5" />
                  Classroom
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-medium border border-blue-500/20">
                  <BookOpen className="w-3.5 h-3.5" />
                  Special Hall
                </div>
              )}
            </TableCell>

            {/* Capacity: Just Number */}
            <TableCell>
              <span className="font-medium text-text-primary">
                {room.capacity}
              </span>
            </TableCell>

            {/* Action: Edit Button */}
            <TableCell className="text-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(room)}
                className="text-accent hover:text-accent-hover hover:bg-accent/10 h-8 font-medium gap-1.5"
              >
                <Edit2 className="w-3.5 h-3.5" />
                Edit
              </Button>
            </TableCell>
          </MotionRow>
        ))}
      </TableBody>
    </Table>
  );
}
