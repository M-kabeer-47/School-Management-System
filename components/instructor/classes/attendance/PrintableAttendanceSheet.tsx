"use client";

import React, { forwardRef } from "react";
import { Student } from "@/lib/instructor/types/class-detail";

interface PrintableAttendanceSheetProps {
  students: Student[];
  className?: string;
  subject?: string;
  grade?: string;
  section?: string;
}

// 5 weeks, each with M, T, W, TH, F
const WEEKS = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];
const DAYS = ["M", "T", "W", "TH", "F"];

export const PrintableAttendanceSheet = forwardRef<
  HTMLDivElement,
  PrintableAttendanceSheetProps
>(({ students, className, subject, grade, section }, ref) => {
  return (
    <div
      ref={ref}
      className={`attendance-sheet-container ${className || ""}`}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        color: "black",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "5mm", position: "relative" }}>
        <h1
          style={{
            fontSize: "24pt",
            fontWeight: "bold",
            letterSpacing: "4px",
            margin: 0,
            marginBottom: "4mm",
            textAlign: "center",
            width: "100%",
            textTransform: "uppercase",
          }}
        >
          Attendance Sheet
        </h1>

        {/* Class Info & Month/Year */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginTop: "2mm",
          }}
        >
          <div style={{ textAlign: "left", flex: 1 }}>
            <p style={{ fontSize: "10pt", margin: "1mm 0" }}>
              <strong>Subject:</strong>{" "}
              <span
                style={{
                  borderBottom: "1px solid black",
                  display: "inline-block",
                  minWidth: "150px",
                  paddingLeft: "4px",
                }}
              >
                {subject || ""}
              </span>
            </p>
            <p style={{ fontSize: "10pt", margin: "1mm 0" }}>
              <strong>Class:</strong>{" "}
              <span
                style={{
                  borderBottom: "1px solid black",
                  display: "inline-block",
                  minWidth: "100px",
                  paddingLeft: "4px",
                }}
              >
                {grade && section ? `${grade} - ${section}` : ""}
              </span>
            </p>
          </div>
          <div style={{ textAlign: "right", flex: 1 }}>
            <p style={{ fontSize: "12pt", margin: 0 }}>
              <strong>MONTH/YEAR:</strong>{" "}
              <span
                style={{
                  borderBottom: "1px solid black",
                  display: "inline-block",
                  minWidth: "120px",
                }}
              >
                &nbsp;
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "8pt",
        }}
      >
        <thead>
          {/* Week Headers Row */}
          <tr>
            <th
              rowSpan={2}
              style={{
                border: "1px solid black",
                padding: "2px",
                width: "3%",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              No.
            </th>
            <th
              rowSpan={2}
              style={{
                border: "1px solid black",
                padding: "2px",
                width: "20%",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Name
            </th>
            {WEEKS.map((week) => (
              <th
                key={week}
                colSpan={5}
                style={{
                  border: "1px solid black",
                  padding: "2px",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {week}
              </th>
            ))}
          </tr>
          {/* Days Row */}
          <tr>
            {WEEKS.map((week) =>
              DAYS.map((day) => (
                <th
                  key={`${week}-${day}`}
                  style={{
                    border: "1px solid black",
                    padding: "1px",
                    width: "3%",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "7pt",
                  }}
                >
                  {day}
                </th>
              )),
            )}
          </tr>
        </thead>
        <tbody>
          {/* Student Rows - Always show 30 rows */}
          {Array.from({ length: 30 }).map((_, index) => {
            const student = students[index];
            return (
              <tr key={index}>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "2px",
                    textAlign: "center",
                    height: "5mm",
                  }}
                >
                  {index + 1}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "2px",
                    textAlign: "left",
                    paddingLeft: "4px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "150px",
                  }}
                >
                  {student?.name || ""}
                </td>
                {/* 25 cells for attendance (5 weeks × 5 days) */}
                {Array.from({ length: 25 }).map((_, cellIndex) => (
                  <td
                    key={cellIndex}
                    style={{
                      border: "1px solid black",
                      padding: "0",
                    }}
                  >
                    &nbsp;
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Footer Legend */}
      <div
        style={{
          marginTop: "6mm",
          fontSize: "10pt",
          display: "flex",
          gap: "20px",
        }}
      >
        <span>
          <strong>P</strong> = Present
        </span>
        <span>
          <strong>A</strong> = Absent
        </span>
        <span>
          <strong>L</strong> = Leave
        </span>
      </div>
    </div>
  );
});

PrintableAttendanceSheet.displayName = "PrintableAttendanceSheet";
