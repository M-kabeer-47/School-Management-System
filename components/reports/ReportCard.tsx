"use client";

import Image from "next/image";
import { ReportCardData } from "@/lib/types/reportCard";
import { gradeScale } from "@/lib/mockData/reportCard";

interface ReportCardProps {
  data: ReportCardData;
}

export function ReportCard({ data }: ReportCardProps) {
  return (
    <div 
      className="report-card bg-white mx-auto shadow-lg print:shadow-none"
      style={{ 
        width: "210mm", 
        minHeight: "297mm",
        maxWidth: "100%",
      }}
    >
      {/* Main Container with padding */}
      <div className="p-8 print:p-6" style={{ minHeight: "297mm" }}>
        
        {/* ══════════════════════════════════════════════════════════════════
            HEADER SECTION - School Logo, Name & Report Title
        ══════════════════════════════════════════════════════════════════ */}
        <header className="text-center mb-6 print:mb-5">
          {/* School Logo & Name Row */}
          <div className="flex items-center justify-center gap-4 mb-2">
            {/* Logo Placeholder */}
            <div className="w-16 h-16 print:w-14 print:h-14 border-2 border-gray-300 rounded-full flex items-center justify-center bg-gray-50">
              <span className="text-[8px] text-gray-400 font-medium text-center leading-tight">
                SCHOOL<br/>LOGO
              </span>
            </div>
            
            <div>
              <h1 className="text-2xl print:text-xl font-bold text-gray-800 tracking-wide">
                {data.schoolName.toUpperCase()}
              </h1>
              <p className="text-xs text-gray-500">{data.schoolAddress}</p>
            </div>
          </div>
          
          {/* Report Title with accent underline */}
          <div className="mt-4">
            <h2 className="text-xl print:text-lg font-bold text-gray-700 tracking-widest">
              PROGRESS REPORT
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-1 rounded-full" />
          </div>
          
          {/* Term & Year */}
          <p className="text-sm text-gray-600 mt-2 font-medium">
            {data.term} • Academic Year {data.schoolYear}
          </p>
        </header>

        {/* ══════════════════════════════════════════════════════════════════
            STUDENT INFORMATION SECTION
        ══════════════════════════════════════════════════════════════════ */}
        <section className="mb-6 print:mb-5">
          <div className="flex gap-5">
            {/* Student Photo */}
            <div className="flex-shrink-0">
              <div className="w-28 h-32 print:w-24 print:h-28 border-2 border-gray-300 rounded overflow-hidden bg-gray-100">
                {data.studentPhoto ? (
                  <Image
                    src={data.studentPhoto}
                    alt={data.studentName}
                    width={112}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                )}
              </div>
            </div>
            
            {/* Student Details Grid */}
            <div className="flex-1">
              <table className="w-full text-sm print:text-xs">
                <tbody>
                  <tr>
                    <td className="py-1.5 text-gray-500 w-32 print:w-28">Student Name:</td>
                    <td className="py-1.5 font-semibold text-gray-800">{data.studentName}</td>
                    <td className="py-1.5 text-gray-500 w-28 print:w-24">Class:</td>
                    <td className="py-1.5 font-semibold text-gray-800">{data.class} - {data.section}</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 text-gray-500">Father&apos;s Name:</td>
                    <td className="py-1.5 font-semibold text-gray-800">{data.fatherName}</td>
                    <td className="py-1.5 text-gray-500">Roll No:</td>
                    <td className="py-1.5 font-semibold text-gray-800">{data.rollNo}</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 text-gray-500">Date of Birth:</td>
                    <td className="py-1.5 font-semibold text-gray-800">{data.dateOfBirth || "—"}</td>
                    <td className="py-1.5 text-gray-500">Admission No:</td>
                    <td className="py-1.5 font-semibold text-gray-800">{data.studentId}</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 text-gray-500">Class Teacher:</td>
                    <td className="py-1.5 font-semibold text-gray-800" colSpan={3}>{data.teacher}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            ACADEMIC PERFORMANCE TABLE
        ══════════════════════════════════════════════════════════════════ */}
        <section className="mb-6 print:mb-5">
          <table className="w-full border-collapse text-sm print:text-xs">
            {/* Table Header */}
            <thead>
              <tr className="bg-gradient-to-r from-gray-700 to-gray-800">
                <th className="border border-gray-600 px-3 py-2.5 text-left text-white font-semibold tracking-wide">
                  SUBJECT
                </th>
                <th className="border border-gray-600 px-3 py-2.5 text-center text-white font-semibold tracking-wide w-24 print:w-20">
                  MAX MARKS
                </th>
                <th className="border border-gray-600 px-3 py-2.5 text-center text-white font-semibold tracking-wide w-24 print:w-20">
                  OBTAINED
                </th>
                <th className="border border-gray-600 px-3 py-2.5 text-center text-white font-semibold tracking-wide w-20 print:w-16">
                  GRADE
                </th>
              </tr>
            </thead>
            
            {/* Table Body */}
            <tbody>
              {data.subjects.map((subject, index) => (
                <tr 
                  key={subject.subject} 
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="border border-gray-300 px-3 py-2 text-gray-700 font-medium">
                    {subject.subject}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center text-gray-600">
                    {subject.totalMarks}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center text-gray-800 font-semibold">
                    {subject.obtainedMarks}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center font-bold text-gray-700">
                    {subject.grade}
                  </td>
                </tr>
              ))}
            </tbody>
            
            {/* Table Footer - Totals */}
            <tfoot>
              <tr className="bg-gray-100 font-semibold">
                <td className="border border-gray-400 px-3 py-2.5 text-gray-800">
                  TOTAL
                </td>
                <td className="border border-gray-400 px-3 py-2.5 text-center text-gray-700">
                  {data.totalMaxMarks}
                </td>
                <td className="border border-gray-400 px-3 py-2.5 text-center text-gray-800 font-bold">
                  {data.totalObtained}
                </td>
                <td className="border border-gray-400 px-3 py-2.5 text-center font-bold text-blue-600">
                  {data.overallGrade}
                </td>
              </tr>
            </tfoot>
          </table>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            RESULT SUMMARY & ATTENDANCE
        ══════════════════════════════════════════════════════════════════ */}
        <section className="mb-6 print:mb-5">
          <div className="flex gap-6">
            {/* Result Summary */}
            <div className="flex-1">
              <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 border-b border-gray-300 pb-1">
                Result Summary
              </h3>
              <table className="w-full text-sm print:text-xs">
                <tbody>
                  <tr>
                    <td className="py-1.5 text-gray-500">Percentage:</td>
                    <td className="py-1.5 font-bold text-gray-800">{data.percentage.toFixed(1)}%</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 text-gray-500">Overall Grade:</td>
                    <td className="py-1.5 font-bold text-blue-600">{data.overallGrade}</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 text-gray-500">Class Position:</td>
                    <td className="py-1.5 font-bold text-gray-800">{data.rank || "—"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {/* Attendance Summary */}
            <div className="flex-1">
              <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 border-b border-gray-300 pb-1">
                Attendance Record
              </h3>
              <table className="w-full text-sm print:text-xs">
                <tbody>
                  <tr>
                    <td className="py-1.5 text-gray-500">Total School Days:</td>
                    <td className="py-1.5 font-semibold text-gray-800">{data.attendance.totalDays}</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 text-gray-500">Days Present:</td>
                    <td className="py-1.5 font-semibold text-gray-800">{data.attendance.presentDays}</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 text-gray-500">Days Absent:</td>
                    <td className="py-1.5 font-semibold text-gray-800">{data.attendance.absentDays}</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 text-gray-500">Attendance %:</td>
                    <td className="py-1.5 font-bold text-gray-800">{data.attendance.percentage}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {/* Grade Scale */}
            <div className="w-44 print:w-40">
              <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 border-b border-gray-300 pb-1">
                Grade Scale
              </h3>
              <table className="w-full text-xs print:text-[10px]">
                <tbody>
                  {gradeScale.map((scale) => (
                    <tr key={scale.grade}>
                      <td className="py-0.5 font-semibold text-gray-700 w-8">{scale.grade}</td>
                      <td className="py-0.5 text-gray-500">{scale.minPercentage}-{scale.maxPercentage}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            TEACHER'S REMARKS
        ══════════════════════════════════════════════════════════════════ */}
        <section className="mb-6 print:mb-5">
          <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
            Teacher&apos;s Remarks
          </h3>
          <div className="border border-gray-300 rounded px-4 py-3 min-h-[60px] bg-gray-50/50">
            <p className="text-sm print:text-xs text-gray-700 leading-relaxed">
              {data.remarks}
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SIGNATURES SECTION
        ══════════════════════════════════════════════════════════════════ */}
        <section className="mt-auto pt-6">
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="border-b border-gray-400 mb-2 h-12"></div>
              <p className="text-xs text-gray-600 font-medium uppercase tracking-wide">
                Class Teacher
              </p>
            </div>
            <div className="text-center">
              <div className="border-b border-gray-400 mb-2 h-12"></div>
              <p className="text-xs text-gray-600 font-medium uppercase tracking-wide">
                Parent / Guardian
              </p>
            </div>
            <div className="text-center">
              <div className="border-b border-gray-400 mb-2 h-12"></div>
              <p className="text-xs text-gray-600 font-medium uppercase tracking-wide">
                Principal
              </p>
            </div>
          </div>
          
          {/* Date */}
          <div className="mt-4 text-right">
            <p className="text-xs text-gray-500">
              Date of Issue: <span className="font-medium text-gray-700">_________________</span>
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            FOOTER
        ══════════════════════════════════════════════════════════════════ */}
        <footer className="mt-6 pt-3 border-t border-gray-300">
          <div className="flex justify-between items-center text-[10px] text-gray-500">
            <div>
              <span className="font-medium">{data.schoolWebsite}</span>
              <span className="mx-2">|</span>
              <span>{data.schoolPhone}</span>
            </div>
            <div className="text-right">
              <span className="italic">This is a computer-generated document.</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
