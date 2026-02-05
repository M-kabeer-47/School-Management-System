"use client";

import React, { forwardRef } from "react";
import type { ExamDay, ExamAttendanceStudent } from "@/lib/admin/types/exam-assets";

interface PrintableExamAttendanceSheetProps {
  students: ExamAttendanceStudent[];
  examDays: ExamDay[];
  selectedDays: string[];
  className: string;
  section: string;
  examTitle: string;
}

interface SingleDaySheetProps {
  students: ExamAttendanceStudent[];
  examDay: ExamDay;
  className: string;
  section: string;
  examTitle: string;
}

// Single Day Attendance Sheet
const SingleDaySheet = ({
  students,
  examDay,
  className,
  section,
  examTitle,
}: SingleDaySheetProps) => {
  return (
    <div
      className="attendance-sheet"
      style={{
        width: "100%",
        backgroundColor: "#ffffff",
        color: "#000000",
        fontFamily: "Arial, sans-serif",
        padding: "0",
        WebkitPrintColorAdjust: "exact",
        printColorAdjust: "exact",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "6mm", textAlign: "center" }}>
        <h1
          style={{
            fontSize: "18pt",
            fontWeight: "bold",
            letterSpacing: "2px",
            margin: 0,
            marginBottom: "2mm",
            textTransform: "uppercase",
            color: "#000000",
          }}
        >
          Examination Attendance Sheet
        </h1>
        <p style={{ fontSize: "12pt", fontWeight: "bold", margin: 0, color: "#000000" }}>
          {examTitle}
        </p>
      </div>

      {/* Info Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "4mm",
          fontSize: "10pt",
          borderTop: "1px solid #000000",
          borderBottom: "1px solid #000000",
          padding: "2mm 0",
          color: "#000000",
        }}
      >
        <div>
          <strong>Class:</strong> {className} - {section}
        </div>
        <div>
          <strong>Subject:</strong> {examDay.subject}
        </div>
        <div>
          <strong>Date:</strong> ____________________
        </div>
        <div>
          <strong>Time:</strong> ____________________
        </div>
      </div>

      {examDay.venue && (
        <div
          style={{
            marginBottom: "4mm",
            fontSize: "10pt",
            color: "#000000",
          }}
        >
          <strong>Venue:</strong> {examDay.venue}
        </div>
      )}

      {/* Student Table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "10pt",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid #000000",
                padding: "4px",
                width: "8%",
                textAlign: "center",
                fontWeight: "bold",
                backgroundColor: "#f0f0f0",
                color: "#000000",
              }}
            >
              S.No
            </th>
            <th
              style={{
                border: "1px solid #000000",
                padding: "4px",
                width: "40%",
                textAlign: "left",
                fontWeight: "bold",
                backgroundColor: "#f0f0f0",
                paddingLeft: "8px",
                color: "#000000",
              }}
            >
              Student Name
            </th>
            <th
              style={{
                border: "1px solid #000000",
                padding: "4px",
                width: "28%",
                textAlign: "left",
                fontWeight: "bold",
                backgroundColor: "#f0f0f0",
                paddingLeft: "8px",
                color: "#000000",
              }}
            >
              Father Name
            </th>
            <th
              style={{
                border: "1px solid #000000",
                padding: "4px",
                width: "24%",
                textAlign: "center",
                fontWeight: "bold",
                backgroundColor: "#f0f0f0",
                color: "#000000",
              }}
            >
              Signature
            </th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id}>
              <td
                style={{
                  border: "1px solid #000000",
                  padding: "4px",
                  textAlign: "center",
                  height: "9mm",
                  color: "#000000",
                }}
              >
                {index + 1}
              </td>
              <td
                style={{
                  border: "1px solid #000000",
                  padding: "4px",
                  paddingLeft: "8px",
                  color: "#000000",
                }}
              >
                {student.name}
              </td>
              <td
                style={{
                  border: "1px solid #000000",
                  padding: "4px",
                  paddingLeft: "8px",
                  color: "#000000",
                }}
              >
                {student.fatherName}
              </td>
              <td
                style={{
                  border: "1px solid #000000",
                  padding: "4px",
                }}
              >
                {/* Signature space */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer */}
      <div
        style={{
          marginTop: "8mm",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "10pt",
          color: "#000000",
        }}
      >
        <div>
          <strong>Total Students:</strong> {students.length}
        </div>
        <div>
          <strong>Present:</strong> ________
        </div>
        <div>
          <strong>Absent:</strong> ________
        </div>
      </div>

      {/* Invigilator Signature */}
      <div
        style={{
          marginTop: "15mm",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "10pt",
          color: "#000000",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              borderTop: "1px solid #000000",
              width: "50mm",
              paddingTop: "2mm",
            }}
          >
            Invigilator Signature
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              borderTop: "1px solid #000000",
              width: "50mm",
              paddingTop: "2mm",
            }}
          >
            Controller of Examinations
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component - Always renders single sheets (one per day)
export const PrintableExamAttendanceSheet = forwardRef<
  HTMLDivElement,
  PrintableExamAttendanceSheetProps
>(
  (
    { students, examDays, selectedDays, className, section, examTitle },
    ref
  ) => {
    const filteredDays = examDays.filter((day) =>
      selectedDays.includes(day.date)
    );

    return (
      <div ref={ref}>
        {filteredDays.map((day) => (
          <SingleDaySheet
            key={day.date}
            students={students}
            examDay={day}
            className={className}
            section={section}
            examTitle={examTitle}
          />
        ))}
      </div>
    );
  }
);

PrintableExamAttendanceSheet.displayName = "PrintableExamAttendanceSheet";
