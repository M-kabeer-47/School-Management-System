import { useMemo, useState } from "react";
import { Student } from "@/lib/admin/types/class-detail";
import {
  Table,
  TableHeader,
  TableHeadRow,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/Table";
import { StudentDetailDrawer } from "./StudentDetailDrawer";
import { User, Phone, Search } from "lucide-react";
import { SearchBar } from "@/components/ui/SearchBar";
import { ClassKPICards } from "./ClassKPICards";
import { Pagination } from "@/components/ui/Pagination";

interface StudentsTabProps {
  students: Student[];
  showAttendance?: boolean;
}

export const StudentsTab = ({
  students,
  showAttendance = false,
}: StudentsTabProps) => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // KPI Calculations
  const metrics = useMemo(() => {
    const totalStudents = students.length;
    const totalBoys = students.filter((s) => s.gender === "Male").length;
    const totalGirls = students.filter((s) => s.gender === "Female").length;
    const avgAttendance = Math.round(
      students.reduce(
        (acc, curr) => acc + (curr.attendancePercentage || 0),
        0,
      ) / (totalStudents || 1),
    );
    return { totalStudents, totalBoys, totalGirls, avgAttendance };
  }, [students]);

  const filteredStudents = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return students;

    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(query) ||
        student.rollNo.toLowerCase().includes(query) ||
        student.fatherName.toLowerCase().includes(query),
    );
  }, [students, searchQuery]);

  // Calculate Paginated Data
  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8">
      <ClassKPICards
        totalStudents={metrics.totalStudents}
        totalBoys={metrics.totalBoys}
        totalGirls={metrics.totalGirls}
        avgAttendance={metrics.avgAttendance}
      />

      <div className="space-y-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold font-heading text-text-primary">
                Students List
              </h2>
              <span className="text-sm text-text-muted">
                {filteredStudents.length}{" "}
                {filteredStudents.length === 1 ? "student" : "students"} found
              </span>
            </div>
          </div>

          <div className="w-full">
            <SearchBar
              placeholder="Search by name, roll no..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface overflow-hidden">
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-border hover:scrollbar-thumb-text-muted">
            <Table className="min-w-[1000px]">
              {/* ... table content remains identical ... */}
              <TableHeader>
                <TableHeadRow>
                  <TableHead className="w-[80px]">Roll No</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Father Name</TableHead>
                  <TableHead>Contact</TableHead>
                  {showAttendance && (
                    <TableHead className="w-[180px]">Attendance</TableHead>
                  )}
                  <TableHead className="text-right">Actions</TableHead>
                </TableHeadRow>
              </TableHeader>
              <TableBody>
                {paginatedStudents.length > 0 ? (
                  paginatedStudents.map((student) => (
                    <TableRow
                      key={student.id}
                      className="group hover:bg-surface-hover"
                    >
                      <TableCell className="font-bold text-text-primary">
                        {student.rollNo}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                            <User className="w-4 h-4" />
                          </div>
                          <span className="font-medium text-text-primary">
                            {student.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-text-secondary">
                        {student.fatherName}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-text-secondary">
                          <Phone className="w-3.5 h-3.5" />
                          <span>
                            {student.fatherWhatsapp || student.phoneNo}
                          </span>
                        </div>
                      </TableCell>
                      {showAttendance && (
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs font-semibold">
                              <span
                                className={
                                  (student.attendancePercentage || 0) < 75
                                    ? "text-error"
                                    : "text-success"
                                }
                              >
                                {student.attendancePercentage || 0}%
                              </span>
                            </div>
                            <div className="h-2 w-full bg-surface-active rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                  (student.attendancePercentage || 0) < 75
                                    ? "bg-error"
                                    : "bg-success"
                                }`}
                                style={{
                                  width: `${student.attendancePercentage || 0}%`,
                                }}
                              />
                            </div>
                          </div>
                        </TableCell>
                      )}
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedStudent(student)}
                            title="View Full Details"
                            className="text-accent hover:underline"
                          >
                            View Details
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={showAttendance ? 6 : 5}
                      className="h-32 text-center"
                    >
                      <div className="flex flex-col items-center justify-center text-text-muted">
                        <Search className="w-8 h-8 mb-2 opacity-20" />
                        <p>No students found matching "{searchQuery}"</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination UI */}
        {totalPages > 1 && (
          <div className="flex justify-center pt-6 border-t border-border/50">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}

        {/* Student Details Drawer */}
        <StudentDetailDrawer
          student={selectedStudent}
          open={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      </div>
    </div>
  );
};
