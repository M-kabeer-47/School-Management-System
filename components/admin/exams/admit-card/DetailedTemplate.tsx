"use client";

import type { AdmitCardData } from "@/lib/admin/types/admit-card";

interface DetailedTemplateProps {
  data: AdmitCardData;
}

export const DetailedTemplate = ({ data }: DetailedTemplateProps) => (
  <div
    style={{
      width: "210mm",
      minHeight: "297mm",
      backgroundColor: "white",
      fontFamily: "Times New Roman, Georgia, serif",
      color: "#000",
      padding: "12mm 15mm",
      boxSizing: "border-box",
      border: "2px solid #000",
    }}
  >
    {/* Outer Decorative Border */}
    <div
      style={{
        border: "1px solid #000",
        padding: "10mm",
        minHeight: "calc(297mm - 24mm - 4px)",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "8mm", borderBottom: "2px solid #000", paddingBottom: "6mm" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8mm", marginBottom: "4mm" }}>
          {/* Left Emblem */}
          <div
            style={{
              width: "20mm",
              height: "20mm",
              border: "1px solid #333",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "7px",
              color: "#666",
            }}
          >
            BOARD<br />EMBLEM
          </div>
          
          <div>
            <p style={{ fontSize: "10px", margin: "0 0 2mm", letterSpacing: "2px", color: "#444" }}>
              BOARD OF SECONDARY EDUCATION
            </p>
            <h1
              style={{
                fontSize: "26px",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "2px",
                margin: 0,
              }}
            >
              {data.schoolName}
            </h1>
            <p style={{ fontSize: "10px", color: "#444", margin: "2mm 0 0", letterSpacing: "1px" }}>
              (Recognized by Ministry of Education)
            </p>
          </div>
          
          {/* Right Emblem */}
          <div
            style={{
              width: "20mm",
              height: "20mm",
              border: "1px solid #333",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "7px",
              color: "#666",
            }}
          >
            SCHOOL<br />EMBLEM
          </div>
        </div>
        
        <div
          style={{
            display: "inline-block",
            border: "2px solid #000",
            padding: "3mm 15mm",
            marginTop: "3mm",
          }}
        >
          <span style={{ fontSize: "18px", fontWeight: "bold", letterSpacing: "6px", textTransform: "uppercase" }}>
            Admit Card
          </span>
        </div>
        
        <p style={{ fontSize: "14px", marginTop: "4mm", fontWeight: "600" }}>
          {data.examName}
        </p>
        <p style={{ fontSize: "11px", color: "#444", marginTop: "1mm" }}>
          Academic Session 2025-2026
        </p>
      </div>

      {/* Seat Number Banner */}
      <div
        style={{
          backgroundColor: "#f0f0f0",
          border: "1px solid #000",
          padding: "4mm 8mm",
          marginBottom: "6mm",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <span style={{ fontSize: "12px", fontWeight: "bold" }}>SEAT NUMBER: </span>
          <span style={{ fontSize: "14px" }}>{data.rollNo}</span>
        </div>
        <div>
          <span style={{ fontSize: "12px", fontWeight: "bold" }}>CLASS: </span>
          <span style={{ fontSize: "14px" }}>{data.className} - {data.section}</span>
        </div>
        <div>
          <span style={{ fontSize: "12px", fontWeight: "bold" }}>EXAM ROOM: </span>
          <span style={{ fontSize: "14px" }}>{data.room}</span>
        </div>
      </div>

      {/* Student Details */}
      <div style={{ display: "flex", gap: "8mm", marginBottom: "8mm" }}>
        {/* Photo Box */}
        <div
          style={{
            width: "40mm",
            height: "50mm",
            border: "1px solid #000",
            backgroundColor: "#fafafa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "10px",
            color: "#888",
            textAlign: "center",
            flexShrink: 0,
          }}
        >
          Affix Recent<br />Passport Size<br />Photograph<br /><br />(Self Attested)
        </div>

        {/* Info Table */}
        <table style={{ flex: 1, fontSize: "13px", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td style={{ padding: "4mm 0", fontWeight: "bold", width: "45mm", borderBottom: "1px dotted #999" }}>
                Candidate&apos;s Name
              </td>
              <td style={{ padding: "4mm 0", borderBottom: "1px dotted #999", textTransform: "uppercase", fontWeight: "500", letterSpacing: "0.5px" }}>
                {data.studentName}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "4mm 0", fontWeight: "bold", borderBottom: "1px dotted #999" }}>
                Father&apos;s Name
              </td>
              <td style={{ padding: "4mm 0", borderBottom: "1px dotted #999", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                {data.fatherName}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "4mm 0", fontWeight: "bold", borderBottom: "1px dotted #999" }}>
                Class & Section
              </td>
              <td style={{ padding: "4mm 0", borderBottom: "1px dotted #999" }}>
                {data.className} - {data.section}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "4mm 0", fontWeight: "bold" }}>
                Examination Centre
              </td>
              <td style={{ padding: "4mm 0" }}>
                {data.schoolName}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Examination Schedule */}
      <div style={{ marginBottom: "8mm" }}>
        <h3 style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "3mm", borderBottom: "1px solid #000", paddingBottom: "2mm" }}>
          Date Sheet / Examination Schedule
        </h3>
        <table style={{ width: "100%", fontSize: "12px", borderCollapse: "collapse", border: "1px solid #000" }}>
          <thead>
            <tr style={{ backgroundColor: "#e8e8e8" }}>
              <th style={{ padding: "3mm", textAlign: "center", fontWeight: "bold", borderRight: "1px solid #000", borderBottom: "1px solid #000", width: "15%" }}>Sr. No.</th>
              <th style={{ padding: "3mm", textAlign: "left", fontWeight: "bold", borderRight: "1px solid #000", borderBottom: "1px solid #000", width: "20%" }}>Date</th>
              <th style={{ padding: "3mm", textAlign: "left", fontWeight: "bold", borderRight: "1px solid #000", borderBottom: "1px solid #000", width: "15%" }}>Day</th>
              <th style={{ padding: "3mm", textAlign: "left", fontWeight: "bold", borderRight: "1px solid #000", borderBottom: "1px solid #000" }}>Subject</th>
              <th style={{ padding: "3mm", textAlign: "center", fontWeight: "bold", borderBottom: "1px solid #000", width: "18%" }}>Time</th>
            </tr>
          </thead>
          <tbody>
            {data.examSchedule.map((exam, i) => (
              <tr key={i}>
                <td style={{ padding: "3mm", textAlign: "center", borderRight: "1px solid #000", borderBottom: "1px solid #ddd" }}>{i + 1}</td>
                <td style={{ padding: "3mm", borderRight: "1px solid #000", borderBottom: "1px solid #ddd" }}>{exam.date}</td>
                <td style={{ padding: "3mm", borderRight: "1px solid #000", borderBottom: "1px solid #ddd" }}>{exam.day}</td>
                <td style={{ padding: "3mm", borderRight: "1px solid #000", borderBottom: "1px solid #ddd", fontWeight: "500" }}>{exam.subject}</td>
                <td style={{ padding: "3mm", textAlign: "center", borderBottom: "1px solid #ddd" }}>{exam.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Instructions */}
      {(data.instructions && data.instructions.length > 0) ? (
        <div style={{ marginBottom: "10mm", padding: "4mm", backgroundColor: "#fafafa", border: "1px solid #ddd" }}>
          <h3 style={{ fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "2mm" }}>
            Important Instructions for Candidates
          </h3>
          <ol style={{ fontSize: "10px", margin: 0, paddingLeft: "5mm", lineHeight: "1.7", columns: 2, columnGap: "8mm", listStyleType: "decimal" }}>
            {data.instructions.map((instruction, i) => (
              <li key={i}>{instruction}</li>
            ))}
          </ol>
        </div>
      ) : null}
    </div>
  </div>
);
