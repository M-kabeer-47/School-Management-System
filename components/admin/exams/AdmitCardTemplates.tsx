"use client";

import { cn } from "@/lib/common/utils";

interface AdmitCardData {
  schoolName: string;
  examName: string;
  studentName: string;
  fatherName: string;
  className: string;
  section: string;
  rollNo: string;
  photoUrl?: string;
  examSchedule: { date: string; day: string; subject: string; time: string }[];
}

interface AdmitCardTemplateProps {
  data: AdmitCardData;
  variant: "standard" | "compact" | "detailed";
  className?: string;
}

// Standard Template - Full A4 page, official institutional look
const StandardTemplate = ({ data }: { data: AdmitCardData }) => (
  <div
    style={{
      width: "210mm",
      minHeight: "297mm",
      backgroundColor: "white",
      fontFamily: "Times New Roman, Georgia, serif",
      color: "#000",
      padding: "15mm 20mm",
      boxSizing: "border-box",
    }}
  >
    {/* Decorative Top Border */}
    <div style={{ borderTop: "4px double #1a365d", paddingTop: "8mm" }} />
    
    {/* Header Section */}
    <div style={{ textAlign: "center", marginBottom: "10mm" }}>
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
      
      <p style={{ fontSize: "14px", marginTop: "5mm", fontWeight: "500" }}>
        {data.examName}
      </p>
    </div>

    {/* Student Details Section */}
    <div
      style={{
        display: "flex",
        gap: "10mm",
        marginBottom: "10mm",
        padding: "6mm",
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
              Father's Name
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
              Roll Number
            </td>
            <td style={{ padding: "3mm 0", fontWeight: "bold" }}>:</td>
            <td style={{ padding: "3mm 0", fontSize: "16px", fontWeight: "bold" }}>
              {data.rollNo}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Examination Schedule */}
    <div style={{ marginBottom: "10mm" }}>
      <h3
        style={{
          fontSize: "13px",
          fontWeight: "bold",
          textTransform: "uppercase",
          marginBottom: "4mm",
          borderBottom: "1px solid #1a365d",
          paddingBottom: "2mm",
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
    <div style={{ marginBottom: "15mm" }}>
      <h3
        style={{
          fontSize: "12px",
          fontWeight: "bold",
          textTransform: "uppercase",
          marginBottom: "3mm",
          letterSpacing: "1px",
        }}
      >
        Instructions to Candidates
      </h3>
      <ol style={{ fontSize: "11px", margin: 0, paddingLeft: "5mm", lineHeight: "1.8" }}>
        <li>This Admit Card must be presented for verification on all examination days.</li>
        <li>Candidates must be seated 15 minutes before the commencement of each paper.</li>
        <li>Use of mobile phones, electronic gadgets, and unfair means is strictly prohibited.</li>
        <li>Candidates must not write anything on the question paper except their roll number.</li>
      </ol>
    </div>

    {/* Signatures */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "auto",
        paddingTop: "10mm",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div style={{ width: "50mm", borderTop: "1px solid #000", paddingTop: "2mm" }}>
          <span style={{ fontSize: "11px" }}>Candidate's Signature</span>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: "50mm", borderTop: "1px solid #000", paddingTop: "2mm" }}>
          <span style={{ fontSize: "11px" }}>Class Teacher</span>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: "50mm", borderTop: "1px solid #000", paddingTop: "2mm" }}>
          <span style={{ fontSize: "11px" }}>Principal</span>
        </div>
        <p style={{ fontSize: "9px", marginTop: "1mm", color: "#666" }}>(School Seal)</p>
      </div>
    </div>

    {/* Footer */}
    <div style={{ borderTop: "4px double #1a365d", marginTop: "10mm", paddingTop: "3mm", textAlign: "center" }}>
      <p style={{ fontSize: "9px", color: "#666", margin: 0 }}>
        This is a computer-generated document. No signature is required for online verification.
      </p>
    </div>
  </div>
);

// Compact Template - Half A4 page, 2 cards per sheet
const CompactTemplate = ({ data }: { data: AdmitCardData }) => (
  <div
    style={{
      width: "210mm",
      minHeight: "140mm",
      backgroundColor: "white",
      fontFamily: "Times New Roman, Georgia, serif",
      color: "#000",
      padding: "8mm 12mm",
      boxSizing: "border-box",
      borderBottom: "1px dashed #999",
    }}
  >
    {/* Header */}
    <div style={{ display: "flex", alignItems: "center", gap: "5mm", marginBottom: "5mm" }}>
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
    <div style={{ display: "flex", gap: "6mm", marginBottom: "5mm" }}>
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
              <td style={{ padding: "1.5mm 0", fontWeight: "bold" }}>Father's Name</td>
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
              <td style={{ padding: "1.5mm 0", fontSize: "13px", fontWeight: "bold" }}>{data.rollNo}</td>
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

    {/* Signatures */}
    <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "3mm" }}>
      <div style={{ fontSize: "9px" }}>
        <div style={{ width: "35mm", borderTop: "1px solid #000", paddingTop: "1mm", textAlign: "center" }}>
          Candidate's Signature
        </div>
      </div>
      <div style={{ fontSize: "9px" }}>
        <div style={{ width: "35mm", borderTop: "1px solid #000", paddingTop: "1mm", textAlign: "center" }}>
          Class Teacher
        </div>
      </div>
      <div style={{ fontSize: "9px" }}>
        <div style={{ width: "35mm", borderTop: "1px solid #000", paddingTop: "1mm", textAlign: "center" }}>
          Principal (Seal)
        </div>
      </div>
    </div>
  </div>
);

// Detailed Template - Full A4, formal government/board style
const DetailedTemplate = ({ data }: { data: AdmitCardData }) => (
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

      {/* Roll Number Banner */}
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
          <span style={{ fontSize: "12px", fontWeight: "bold" }}>ROLL NUMBER: </span>
          <span style={{ fontSize: "20px", fontWeight: "bold", letterSpacing: "2px" }}>{data.rollNo}</span>
        </div>
        <div>
          <span style={{ fontSize: "12px", fontWeight: "bold" }}>CLASS: </span>
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>{data.className} - {data.section}</span>
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
                Candidate's Name
              </td>
              <td style={{ padding: "4mm 0", borderBottom: "1px dotted #999", textTransform: "uppercase", fontWeight: "500", letterSpacing: "0.5px" }}>
                {data.studentName}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "4mm 0", fontWeight: "bold", borderBottom: "1px dotted #999" }}>
                Father's Name
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
      <div style={{ marginBottom: "10mm", padding: "4mm", backgroundColor: "#fafafa", border: "1px solid #ddd" }}>
        <h3 style={{ fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "2mm" }}>
          Important Instructions for Candidates
        </h3>
        <ol style={{ fontSize: "10px", margin: 0, paddingLeft: "5mm", lineHeight: "1.7", columns: 2, columnGap: "8mm" }}>
          <li>This Admit Card is mandatory for entry to the examination hall.</li>
          <li>Reach the examination centre 30 minutes before the scheduled time.</li>
          <li>Verify your name, roll number, and other details. Report any discrepancy immediately.</li>
          <li>Carrying mobile phones, smart watches, or any electronic device is strictly prohibited.</li>
          <li>Use of unfair means will result in disqualification from all papers.</li>
          <li>Writing on the question paper (except roll number) is not permitted.</li>
          <li>Candidates must sign the attendance sheet in the presence of the invigilator.</li>
          <li>No candidate will be allowed to leave the hall before the stipulated time.</li>
        </ol>
      </div>

      {/* Signatures */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "auto" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ height: "15mm" }} />
          <div style={{ width: "45mm", borderTop: "1px solid #000", paddingTop: "2mm" }}>
            <span style={{ fontSize: "10px" }}>Candidate's Signature</span>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ height: "15mm" }} />
          <div style={{ width: "45mm", borderTop: "1px solid #000", paddingTop: "2mm" }}>
            <span style={{ fontSize: "10px" }}>Parent's Signature</span>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ height: "15mm" }} />
          <div style={{ width: "45mm", borderTop: "1px solid #000", paddingTop: "2mm" }}>
            <span style={{ fontSize: "10px" }}>Class Teacher</span>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ height: "15mm" }} />
          <div style={{ width: "45mm", borderTop: "1px solid #000", paddingTop: "2mm" }}>
            <span style={{ fontSize: "10px" }}>Principal</span>
            <p style={{ fontSize: "8px", margin: "1mm 0 0", color: "#666" }}>(Official Seal)</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export function AdmitCardTemplate({
  data,
  variant,
  className,
}: AdmitCardTemplateProps) {
  return (
    <div className={cn("admit-card-template", className)}>
      {variant === "standard" && <StandardTemplate data={data} />}
      {variant === "compact" && <CompactTemplate data={data} />}
      {variant === "detailed" && <DetailedTemplate data={data} />}
    </div>
  );
}

// Template metadata
export const ADMIT_CARD_TEMPLATES = [
  {
    id: "standard" as const,
    name: "Standard",
    description: "Full A4 page, clean institutional design",
  },
  {
    id: "compact" as const,
    name: "Compact",
    description: "Half page - prints 2 per A4 sheet",
  },
  {
    id: "detailed" as const,
    name: "Formal",
    description: "Official board-style with full instructions",
  },
];

// Sample data for preview
export const SAMPLE_ADMIT_CARD_DATA: AdmitCardData = {
  schoolName: "City Public School",
  examName: "Mid-Term Examination 2026",
  studentName: "Ahmed Khan",
  fatherName: "Mohammad Khan",
  className: "10",
  section: "A",
  rollNo: "1042",
  examSchedule: [
    { date: "Feb 15", day: "Monday", subject: "Mathematics", time: "9:00 AM" },
    { date: "Feb 17", day: "Wednesday", subject: "English", time: "9:00 AM" },
    { date: "Feb 19", day: "Friday", subject: "Science", time: "9:00 AM" },
    { date: "Feb 21", day: "Sunday", subject: "Social Studies", time: "9:00 AM" },
  ],
};
