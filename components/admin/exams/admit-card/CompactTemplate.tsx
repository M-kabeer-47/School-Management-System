"use client";

import type { AdmitCardData } from "@/lib/admin/types/admit-card";

interface CompactTemplateProps {
  data: AdmitCardData;
}

export const CompactTemplate = ({ data }: CompactTemplateProps) => (
  <div
    style={{
      width: "210mm",
      minHeight: "140mm",
      backgroundColor: "white",
      fontFamily: "Times New Roman, Georgia, serif",
      color: "#000",
      padding: "6mm 10mm",
      boxSizing: "border-box",
      borderBottom: "1px dashed #999",
    }}
  >
    {/* Header */}
    <div style={{ display: "flex", alignItems: "center", gap: "4mm", marginBottom: "4mm" }}>
      {/* Mini Emblem */}
      <div
        style={{
          width: "15mm",
          height: "15mm",
          border: "1px solid #333",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "6px",
          color: "#666",
          flexShrink: 0,
        }}
      >
        EMBLEM
      </div>
      
      <div style={{ flex: 1 }}>
        <h1 style={{ fontSize: "18px", fontWeight: "bold", textTransform: "uppercase", margin: 0, color: "#1a365d" }}>
          {data.schoolName}
        </h1>
        <p style={{ fontSize: "10px", color: "#444", margin: "1mm 0 0" }}>{data.examName}</p>
      </div>
      
      <div
        style={{
          backgroundColor: "#1a365d",
          color: "white",
          padding: "2mm 6mm",
          fontSize: "11px",
          fontWeight: "bold",
          letterSpacing: "2px",
        }}
      >
        ADMIT CARD
      </div>
    </div>

    {/* Main Content Row */}
    <div style={{ display: "flex", gap: "5mm", marginBottom: "4mm" }}>
      {/* Photo */}
      <div
        style={{
          width: "25mm",
          height: "32mm",
          border: "1px solid #999",
          backgroundColor: "#f8f9fa",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "8px",
          color: "#888",
          textAlign: "center",
          flexShrink: 0,
        }}
      >
        Photo
      </div>

      {/* Student Info */}
      <div style={{ flex: 1, fontSize: "11px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td style={{ padding: "1.5mm 0", fontWeight: "bold", width: "28mm" }}>Name</td>
              <td style={{ padding: "1.5mm", width: "3mm" }}>:</td>
              <td style={{ padding: "1.5mm 0", textTransform: "uppercase" }}>{data.studentName}</td>
            </tr>
            <tr>
              <td style={{ padding: "1.5mm 0", fontWeight: "bold" }}>Father&apos;s Name</td>
              <td style={{ padding: "1.5mm" }}>:</td>
              <td style={{ padding: "1.5mm 0", textTransform: "uppercase" }}>{data.fatherName}</td>
            </tr>
            <tr>
              <td style={{ padding: "1.5mm 0", fontWeight: "bold" }}>Class</td>
              <td style={{ padding: "1.5mm" }}>:</td>
              <td style={{ padding: "1.5mm 0" }}>{data.className} - {data.section}</td>
            </tr>
            <tr>
              <td style={{ padding: "1.5mm 0", fontWeight: "bold" }}>Roll No.</td>
              <td style={{ padding: "1.5mm" }}>:</td>
              <td style={{ padding: "1.5mm 0" }}>{data.rollNo}</td>
            </tr>
            <tr>
              <td style={{ padding: "1.5mm 0", fontWeight: "bold" }}>Exam Room</td>
              <td style={{ padding: "1.5mm" }}>:</td>
              <td style={{ padding: "1.5mm 0" }}>{data.room}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Schedule */}
      <div style={{ flex: 1.2 }}>
        <table style={{ width: "100%", fontSize: "10px", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#1a365d", color: "white" }}>
              <th style={{ padding: "2mm", textAlign: "left" }}>Date</th>
              <th style={{ padding: "2mm", textAlign: "left" }}>Subject</th>
              <th style={{ padding: "2mm", textAlign: "left" }}>Time</th>
            </tr>
          </thead>
          <tbody>
            {data.examSchedule.map((exam, i) => (
              <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#f8f9fa" : "#fff" }}>
                <td style={{ padding: "1.5mm 2mm", borderBottom: "1px solid #eee" }}>{exam.date}</td>
                <td style={{ padding: "1.5mm 2mm", borderBottom: "1px solid #eee" }}>{exam.subject}</td>
                <td style={{ padding: "1.5mm 2mm", borderBottom: "1px solid #eee" }}>{exam.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Instructions (Optional, compact version) */}
    {(data.instructions && data.instructions.length > 0) ? (
      <div style={{ marginBottom: "3mm", marginTop: "3mm" }}>
        <h4 style={{ fontSize: "9px", fontWeight: "bold", marginBottom: "1mm", textTransform: "uppercase" }}>
          Instructions
        </h4>
        <ol style={{ fontSize: "8px", margin: 0, paddingLeft: "4mm", lineHeight: "1.4", listStyleType: "decimal" }}>
          {data.instructions.slice(0, 4).map((instruction, i) => (
            <li key={i}>{instruction}</li>
          ))}
        </ol>
      </div>
    ) : null}
  </div>
);
