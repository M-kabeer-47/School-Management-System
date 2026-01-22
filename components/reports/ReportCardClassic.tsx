"use client";

import Image from "next/image";
import { ReportCardData } from "@/lib/types/reportCard";
import { gradeScale } from "@/lib/mockData/reportCard";

interface ReportCardClassicProps {
  data: ReportCardData;
}

export function ReportCardClassic({ data }: ReportCardClassicProps) {
  return (
    <div 
      className="report-card bg-white mx-auto shadow-lg print:shadow-none"
      style={{ 
        width: "210mm", 
        minHeight: "297mm",
        maxWidth: "100%",
      }}
    >
      {/* Decorative Left Border */}
      <div className="flex" style={{ minHeight: "297mm" }}>
        {/* Left Accent Strip */}
        <div className="w-3 bg-gradient-to-b from-blue-600 via-blue-500 to-blue-700 print:bg-blue-600" />
        
        {/* Main Content */}
        <div className="flex-1 p-8 print:p-6 relative">
          
          {/* Corner Decorations */}
          <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-8 bg-gradient-to-l from-blue-600 to-transparent transform rotate-45 translate-x-8 -translate-y-4" />
          </div>
          
          {/* ══════════════════════════════════════════════════════════════════
              HEADER SECTION
          ══════════════════════════════════════════════════════════════════ */}
          <header className="mb-8 print:mb-6">
            <div className="flex items-start justify-between">
              {/* School Logo & Info */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 print:w-16 print:h-16 border-2 border-blue-200 rounded-full flex items-center justify-center bg-blue-50">
                  <svg className="w-10 h-10 print:w-8 print:h-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl print:text-lg font-bold text-gray-800">
                    {data.schoolName}
                  </h1>
                  <p className="text-xs text-gray-500 max-w-xs">{data.schoolAddress}</p>
                  <p className="text-xs text-blue-600 font-medium mt-1">{data.schoolWebsite}</p>
                </div>
              </div>
              
              {/* Report Title */}
              <div className="text-right">
                <h2 className="text-2xl print:text-xl font-black text-gray-800 tracking-tight">
                  REPORT CARD
                </h2>
                <p className="text-sm text-gray-600 font-medium mt-1">{data.term}</p>
                <p className="text-xs text-gray-500">Academic Year {data.schoolYear}</p>
              </div>
            </div>
          </header>

          {/* ══════════════════════════════════════════════════════════════════
              STUDENT INFO CARD
          ══════════════════════════════════════════════════════════════════ */}
          <section className="mb-6 print:mb-5 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-lg p-4 print:p-3">
            <div className="flex gap-5">
              {/* Student Photo */}
              <div className="flex-shrink-0">
                <div className="w-24 h-28 print:w-20 print:h-24 border-2 border-blue-300 rounded-lg overflow-hidden bg-white shadow-sm">
                  {data.studentPhoto ? (
                    <Image
                      src={data.studentPhoto}
                      alt={data.studentName}
                      width={96}
                      height={112}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Info Grid */}
              <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-1 text-sm print:text-xs">
                <div className="flex">
                  <span className="text-gray-500 w-28 print:w-24">Student Name:</span>
                  <span className="font-semibold text-gray-800">{data.studentName}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-28 print:w-24">Class/Section:</span>
                  <span className="font-semibold text-gray-800">{data.class} - {data.section}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-28 print:w-24">Father&apos;s Name:</span>
                  <span className="font-semibold text-gray-800">{data.fatherName}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-28 print:w-24">Roll No:</span>
                  <span className="font-semibold text-gray-800">{data.rollNo}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-28 print:w-24">Date of Birth:</span>
                  <span className="font-semibold text-gray-800">{data.dateOfBirth || "—"}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-28 print:w-24">Admission No:</span>
                  <span className="font-semibold text-gray-800">{data.studentId}</span>
                </div>
                <div className="flex col-span-2">
                  <span className="text-gray-500 w-28 print:w-24">Class Teacher:</span>
                  <span className="font-semibold text-gray-800">{data.teacher}</span>
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════════
              MARKS TABLE
          ══════════════════════════════════════════════════════════════════ */}
          <section className="mb-6 print:mb-5">
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <table className="w-full text-sm print:text-xs">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-blue-700">
                    <th className="px-4 py-3 print:py-2 text-left text-white font-bold uppercase tracking-wider text-xs">
                      Subject
                    </th>
                    <th className="px-4 py-3 print:py-2 text-center text-white font-bold uppercase tracking-wider text-xs w-28 print:w-24">
                      Max Marks
                    </th>
                    <th className="px-4 py-3 print:py-2 text-center text-white font-bold uppercase tracking-wider text-xs w-28 print:w-24">
                      Obtained
                    </th>
                    <th className="px-4 py-3 print:py-2 text-center text-white font-bold uppercase tracking-wider text-xs w-24 print:w-20">
                      Grade
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.subjects.map((subject, index) => (
                    <tr 
                      key={subject.subject}
                      className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50/30 transition-colors`}
                    >
                      <td className="px-4 py-2.5 print:py-2 border-b border-gray-200 font-medium text-gray-700">
                        {subject.subject}
                      </td>
                      <td className="px-4 py-2.5 print:py-2 border-b border-gray-200 text-center text-gray-600">
                        {subject.totalMarks}
                      </td>
                      <td className="px-4 py-2.5 print:py-2 border-b border-gray-200 text-center font-semibold text-gray-800">
                        {subject.obtainedMarks}
                      </td>
                      <td className="px-4 py-2.5 print:py-2 border-b border-gray-200 text-center">
                        <span className={`inline-block w-8 py-0.5 rounded font-bold text-xs ${
                          subject.grade.startsWith('A') ? 'bg-green-100 text-green-700' :
                          subject.grade.startsWith('B') ? 'bg-blue-100 text-blue-700' :
                          subject.grade.startsWith('C') ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {subject.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-100 font-bold">
                    <td className="px-4 py-3 print:py-2 text-gray-800 uppercase text-xs tracking-wider">
                      Grand Total
                    </td>
                    <td className="px-4 py-3 print:py-2 text-center text-gray-700">
                      {data.totalMaxMarks}
                    </td>
                    <td className="px-4 py-3 print:py-2 text-center text-gray-900">
                      {data.totalObtained}
                    </td>
                    <td className="px-4 py-3 print:py-2 text-center">
                      <span className="inline-block px-2 py-0.5 bg-blue-600 text-white rounded font-bold text-xs">
                        {data.overallGrade}
                      </span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════════
              SUMMARY SECTION
          ══════════════════════════════════════════════════════════════════ */}
          <section className="mb-6 print:mb-5">
            <div className="grid grid-cols-3 gap-4">
              {/* Result Summary */}
              <div className="border border-gray-200 rounded-lg p-4 print:p-3">
                <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  Result Summary
                </h3>
                <div className="space-y-2 text-sm print:text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Percentage:</span>
                    <span className="font-bold text-gray-800">{data.percentage.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Overall Grade:</span>
                    <span className="font-bold text-blue-600">{data.overallGrade}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Class Rank:</span>
                    <span className="font-bold text-gray-800">{data.rank || "—"}</span>
                  </div>
                </div>
              </div>
              
              {/* Attendance */}
              <div className="border border-gray-200 rounded-lg p-4 print:p-3">
                <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
                  </svg>
                  Attendance
                </h3>
                <div className="space-y-2 text-sm print:text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Days:</span>
                    <span className="font-semibold text-gray-800">{data.attendance.totalDays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Present:</span>
                    <span className="font-semibold text-green-600">{data.attendance.presentDays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Absent:</span>
                    <span className="font-semibold text-red-600">{data.attendance.absentDays}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-gray-500">Attendance:</span>
                    <span className="font-bold text-gray-800">{data.attendance.percentage}%</span>
                  </div>
                </div>
              </div>
              
              {/* Grade Scale */}
              <div className="border border-gray-200 rounded-lg p-4 print:p-3">
                <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                  </svg>
                  Grade Scale
                </h3>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs print:text-[10px]">
                  {gradeScale.map((scale) => (
                    <div key={scale.grade} className="flex justify-between">
                      <span className="font-semibold text-gray-700">{scale.grade}:</span>
                      <span className="text-gray-500">{scale.minPercentage}-{scale.maxPercentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════════
              REMARKS
          ══════════════════════════════════════════════════════════════════ */}
          <section className="mb-6 print:mb-5">
            <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
              </svg>
              Teacher&apos;s Remarks
            </h3>
            <div className="border border-gray-200 rounded-lg px-4 py-3 min-h-[50px] bg-gray-50/50">
              <p className="text-sm print:text-xs text-gray-700 leading-relaxed italic">
                &quot;{data.remarks}&quot;
              </p>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════════
              SIGNATURES
          ══════════════════════════════════════════════════════════════════ */}
          <section className="mt-auto pt-4">
            <div className="grid grid-cols-3 gap-12 print:gap-8">
              <div className="text-center">
                <div className="border-b-2 border-gray-400 border-dashed mb-2 h-10"></div>
                <p className="text-xs text-gray-600 font-medium uppercase tracking-wide">
                  Class Teacher
                </p>
              </div>
              <div className="text-center">
                <div className="border-b-2 border-gray-400 border-dashed mb-2 h-10"></div>
                <p className="text-xs text-gray-600 font-medium uppercase tracking-wide">
                  Parent/Guardian
                </p>
              </div>
              <div className="text-center">
                <div className="border-b-2 border-gray-400 border-dashed mb-2 h-10"></div>
                <p className="text-xs text-gray-600 font-medium uppercase tracking-wide">
                  Principal
                </p>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════════
              FOOTER
          ══════════════════════════════════════════════════════════════════ */}
          <footer className="mt-6 pt-3 border-t border-gray-200">
            <div className="flex justify-between items-center text-[10px] text-gray-500">
              <div>
                <span className="font-medium text-blue-600">{data.schoolPhone}</span>
                <span className="mx-2">|</span>
                <span>{data.schoolWebsite}</span>
              </div>
              <div className="text-right">
                <span>Date of Issue: </span>
                <span className="font-medium text-gray-700">_________________</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
