"use client";

import type { AdmitCardData } from "@/lib/admin/types/admit-card";

interface StandardTemplateProps {
  data: AdmitCardData;
}

export const StandardTemplate = ({ data }: StandardTemplateProps) => (
  <div
    style={{
      width: "210mm",
      minHeight: "297mm",
      backgroundColor: "white",
      fontFamily: "Times New Roman, Georgia, serif",
      color: "#000",
      padding: "10mm 15mm",
      boxSizing: "border-box",
    }}
  >
    {/* Decorative Top Border */}
    <div style={{ borderTop: "4px double #1a365d", paddingTop: "5mm" }} />
    
    {/* Header Section */}
    <div style={{ textAlign: "center", marginBottom: "6mm" }}>
      {/* School Emblem Placeholder */}
      <div
        style={{
          width: "22mm",
          height: "22mm",
          margin: "0 auto 4mm",
          border: "1px solid #333",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "8px",
          color: "#666",
        }}
      >
        SCHOOL<br />EMBLEM
      </div>
      
      <h1
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "3px",
          margin: "0 0 2mm",
          color: "#1a365d",
        }}
      >
        {data.schoolName}
      </h1>
      <p style={{ fontSize: "11px", color: "#444", margin: "0 0 6mm", letterSpacing: "1px" }}>
        Affiliated to Board of Secondary Education
      </p>
      
      <div
        style={{
          display: "inline-block",
          backgroundColor: "#1a365d",
          color: "white",
          padding: "3mm 12mm",
          fontSize: "16px",
          fontWeight: "bold",
          letterSpacing: "4px",
          textTransform: "uppercase",
        }}
      >
        Admit Card
      </div>
      
      <p style={{ fontSize: "14px", marginTop: "3mm", fontWeight: "500" }}>
        {data.examName}
      </p>
    </div>

    {/* Student Details Section */}
    <div
      style={{
        display: "flex",
        gap: "8mm",
        marginBottom: "6mm",
        padding: "4mm",
        backgroundColor: "#f8f9fa",
      }}
    >
      {/* Photo Box */}
      <div
        style={{
          width: "35mm",
          height: "45mm",
          border: "1px solid #999",
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "10px",
          color: "#888",
          textAlign: "center",
          flexShrink: 0,
        }}
      >
        Affix<br />Passport Size<br />Photograph
      </div>

      {/* Student Info Table */}
      <table style={{ flex: 1, fontSize: "13px", borderCollapse: "collapse" }}>
        <tbody>
          <tr>
            <td style={{ padding: "3mm 4mm 3mm 0", fontWeight: "bold", width: "40mm", verticalAlign: "top" }}>
              Name of Student
            </td>
            <td style={{ padding: "3mm 0", fontWeight: "bold", width: "5mm" }}>:</td>
            <td style={{ padding: "3mm 0", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {data.studentName}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "3mm 4mm 3mm 0", fontWeight: "bold", verticalAlign: "top" }}>
              Father&apos;s Name
            </td>
            <td style={{ padding: "3mm 0", fontWeight: "bold" }}>:</td>
            <td style={{ padding: "3mm 0", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {data.fatherName}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "3mm 4mm 3mm 0", fontWeight: "bold", verticalAlign: "top" }}>
              Class & Section
            </td>
            <td style={{ padding: "3mm 0", fontWeight: "bold" }}>:</td>
            <td style={{ padding: "3mm 0" }}>
              {data.className} - {data.section}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "3mm 4mm 3mm 0", fontWeight: "bold", verticalAlign: "top" }}>
              Seat Number
            </td>
            <td style={{ padding: "3mm 0", fontWeight: "bold" }}>:</td>
            <td style={{ padding: "3mm 0" }}>
              {data.rollNo}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "3mm 4mm 3mm 0", fontWeight: "bold", verticalAlign: "top" }}>
              Exam Room
            </td>
            <td style={{ padding: "3mm 0", fontWeight: "bold" }}>:</td>
            <td style={{ padding: "3mm 0" }}>
              {data.room}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Examination Schedule */}
    <div style={{ marginBottom: "6mm" }}>
      <h3
        style={{
          fontSize: "13px",
          fontWeight: "bold",
          textTransform: "uppercase",
          marginBottom: "3mm",
          borderBottom: "1px solid #1a365d",
          paddingBottom: "1.5mm",
          letterSpacing: "1px",
        }}
      >
        Examination Schedule
      </h3>
      <table style={{ width: "100%", fontSize: "12px", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#1a365d", color: "white" }}>
            <th style={{ padding: "3mm 4mm", textAlign: "left", fontWeight: "600" }}>Date</th>
            <th style={{ padding: "3mm 4mm", textAlign: "left", fontWeight: "600" }}>Day</th>
            <th style={{ padding: "3mm 4mm", textAlign: "left", fontWeight: "600" }}>Subject</th>
            <th style={{ padding: "3mm 4mm", textAlign: "left", fontWeight: "600" }}>Time</th>
          </tr>
        </thead>
        <tbody>
          {data.examSchedule.map((exam, i) => (
            <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#f8f9fa" : "#fff" }}>
              <td style={{ padding: "3mm 4mm", borderBottom: "1px solid #ddd" }}>{exam.date}</td>
              <td style={{ padding: "3mm 4mm", borderBottom: "1px solid #ddd" }}>{exam.day}</td>
              <td style={{ padding: "3mm 4mm", borderBottom: "1px solid #ddd", fontWeight: "500" }}>{exam.subject}</td>
              <td style={{ padding: "3mm 4mm", borderBottom: "1px solid #ddd" }}>{exam.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Instructions */}
    {(data.instructions && data.instructions.length > 0) ? (
      <div style={{ marginBottom: "8mm" }}>
        <h3
          style={{
            fontSize: "11px",
            fontWeight: "bold",
            textTransform: "uppercase",
            marginBottom: "2mm",
            letterSpacing: "1px",
          }}
        >
          Instructions to Candidates
        </h3>
        <ol style={{ fontSize: "10px", margin: 0, paddingLeft: "5mm", lineHeight: "1.6", listStyleType: "decimal" }}>
          {data.instructions.map((instruction, i) => (
            <li key={i}>{instruction}</li>
          ))}
        </ol>
      </div>
    ) : null}

    {/* Footer */}
    <div style={{ borderTop: "4px double #1a365d", marginTop: "auto", paddingTop: "2mm", textAlign: "center" }}>
      <p style={{ fontSize: "9px", color: "#666", margin: 0 }}>
        This is a computer-generated document. No signature is required for online verification.
      </p>
    </div>
  </div>
);
