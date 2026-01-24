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
      className="report-card bg-white mx-auto border border-gray-400 print:border-black"
      style={{ 
        width: "210mm", 
        minHeight: "297mm",
        maxWidth: "100%",
        fontFamily: "Times New Roman, serif",
      }}
    >
      <div className="p-8 print:p-6">
        
        {/* ══════════════════════════════════════════════════════════════════
            HEADER SECTION
        ══════════════════════════════════════════════════════════════════ */}
        <header className="text-center mb-6 border-b-2 border-black pb-4">
          {/* School Logo */}
          <div className="flex justify-center mb-2">
            <div className="w-16 h-16 border-2 border-gray-700 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
              </svg>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold uppercase tracking-wide text-gray-900">
            {data.schoolName}
          </h1>
          <p className="text-xs text-gray-600 mt-1">{data.schoolAddress}</p>
          
          <h2 className="text-xl font-bold mt-4 tracking-widest text-gray-800">
            REPORT CARD
          </h2>
          <p className="text-sm text-gray-600">Academic Year: {data.schoolYear}</p>
        </header>

        {/* ══════════════════════════════════════════════════════════════════
            STUDENT INFORMATION
        ══════════════════════════════════════════════════════════════════ */}
        <section className="mb-6">
          <div className="flex gap-6">
            {/* Student Photo */}
            <div className="flex-shrink-0">
              <div className="w-24 h-28 border-2 border-gray-600 overflow-hidden bg-gray-100">
                {data.studentPhoto ? (
                  <Image
                    src={data.studentPhoto}
                    alt={data.studentName}
                    width={96}
                    height={112}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                )}
              </div>
            </div>
            
            {/* Student Details - Form Style */}
            <div className="flex-1 text-sm">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="py-1 text-gray-600 w-32">Student Name:</td>
                    <td className="py-1 font-semibold border-b border-gray-400 border-dotted">{data.studentName}</td>
                    <td className="py-1 text-gray-600 w-28 pl-6">Class/Section:</td>
                    <td className="py-1 font-semibold border-b border-gray-400 border-dotted">{data.class} - {data.section}</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-gray-600">Father&apos;s Name:</td>
                    <td className="py-1 font-semibold border-b border-gray-400 border-dotted">{data.fatherName}</td>
                    <td className="py-1 text-gray-600 pl-6">Roll No:</td>
                    <td className="py-1 font-semibold border-b border-gray-400 border-dotted">{data.rollNo}</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-gray-600">Date of Birth:</td>
                    <td className="py-1 font-semibold border-b border-gray-400 border-dotted">{data.dateOfBirth || "—"}</td>
                    <td className="py-1 text-gray-600 pl-6">Admission No:</td>
                    <td className="py-1 font-semibold border-b border-gray-400 border-dotted">{data.studentId}</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-gray-600">Class Teacher:</td>
                    <td className="py-1 font-semibold border-b border-gray-400 border-dotted" colSpan={3}>{data.teacher}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            MARKS TABLE - Simple Black & White
        ══════════════════════════════════════════════════════════════════ */}
        <section className="mb-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="border border-gray-600 px-2 py-2 text-left font-bold" rowSpan={2}>
                  SUBJECTS
                </th>
                {data.terms.map((term) => (
                  <th key={term} className="border border-gray-600 px-2 py-1.5 text-center font-bold" colSpan={2}>
                    {term.toUpperCase()}
                  </th>
                ))}
                <th className="border border-gray-600 px-2 py-1.5 text-center font-bold bg-gray-900" colSpan={2}>
                  FINAL
                </th>
              </tr>
              <tr className="bg-gray-700 text-white text-xs">
                {data.terms.map((term) => (
                  <>
                    <th key={`${term}-m`} className="border border-gray-600 px-1 py-1 text-center w-14">
                      Marks
                    </th>
                    <th key={`${term}-g`} className="border border-gray-600 px-1 py-1 text-center w-10">
                      Grade
                    </th>
                  </>
                ))}
                <th className="border border-gray-600 px-1 py-1 text-center w-14 bg-gray-800">
                  Total
                </th>
                <th className="border border-gray-600 px-1 py-1 text-center w-10 bg-gray-800">
                  Grade
                </th>
              </tr>
            </thead>
            <tbody>
              {data.subjects.map((subject, index) => (
                <tr key={subject.subject} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border border-gray-400 px-2 py-1.5 font-medium">
                    {subject.subject}
                  </td>
                  {subject.termMarks.map((term) => (
                    <>
                      <td key={`${term.term}-marks`} className="border border-gray-400 px-1 py-1.5 text-center">
                        {term.obtainedMarks}/{term.totalMarks}
                      </td>
                      <td key={`${term.term}-grade`} className="border border-gray-400 px-1 py-1.5 text-center font-semibold">
                        {term.grade}
                      </td>
                    </>
                  ))}
                  <td className="border border-gray-400 px-1 py-1.5 text-center font-semibold bg-gray-100">
                    {subject.finalObtained}/{subject.finalTotal}
                  </td>
                  <td className="border border-gray-400 px-1 py-1.5 text-center font-bold bg-gray-100">
                    {subject.finalGrade}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-200 font-bold">
                <td className="border border-gray-400 px-2 py-2">
                  TOTAL
                </td>
                {data.termSummaries.map((term) => (
                  <>
                    <td key={`${term.term}-t`} className="border border-gray-400 px-1 py-2 text-center">
                      {term.totalObtained}/{term.totalMaxMarks}
                    </td>
                    <td key={`${term.term}-g`} className="border border-gray-400 px-1 py-2 text-center">
                      {term.grade}
                    </td>
                  </>
                ))}
                <td className="border border-gray-400 px-1 py-2 text-center bg-gray-300">
                  {data.finalTotalObtained}/{data.finalTotalMaxMarks}
                </td>
                <td className="border border-gray-400 px-1 py-2 text-center bg-gray-300">
                  {data.finalGrade}
                </td>
              </tr>
              <tr className="bg-gray-100">
                <td className="border border-gray-400 px-2 py-1.5 font-semibold">
                  PERCENTAGE
                </td>
                {data.termSummaries.map((term) => (
                  <td key={`${term.term}-pct`} className="border border-gray-400 px-1 py-1.5 text-center font-semibold" colSpan={2}>
                    {term.percentage.toFixed(1)}%
                  </td>
                ))}
                <td className="border border-gray-400 px-1 py-1.5 text-center font-bold bg-gray-200" colSpan={2}>
                  {data.finalPercentage.toFixed(1)}%
                </td>
              </tr>
            </tfoot>
          </table>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            BOTTOM SECTION - Grade Scale, Attendance, Result
        ══════════════════════════════════════════════════════════════════ */}
        <section className="mb-6">
          <div className="grid grid-cols-3 gap-4 text-xs">
            
            {/* Grade Scale */}
            <div className="border border-gray-400">
              <div className="bg-gray-800 text-white px-2 py-1 font-bold text-center">
                GRADE SCALE
              </div>
              <table className="w-full">
                <tbody>
                  {gradeScale.map((item, index) => (
                    <tr key={item.grade} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="border-t border-gray-300 px-2 py-0.5 font-bold w-10">{item.grade}</td>
                      <td className="border-t border-l border-gray-300 px-2 py-0.5 text-center">{item.minPercentage}% - {item.maxPercentage}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Attendance */}
            <div className="border border-gray-400">
              <div className="bg-gray-800 text-white px-2 py-1 font-bold text-center">
                ATTENDANCE
              </div>
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="border-t border-gray-300 px-2 py-1">Total Days</td>
                    <td className="border-t border-l border-gray-300 px-2 py-1 text-center font-semibold">{data.attendance.totalDays}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border-t border-gray-300 px-2 py-1">Present</td>
                    <td className="border-t border-l border-gray-300 px-2 py-1 text-center font-semibold">{data.attendance.presentDays}</td>
                  </tr>
                  <tr>
                    <td className="border-t border-gray-300 px-2 py-1">Absent</td>
                    <td className="border-t border-l border-gray-300 px-2 py-1 text-center font-semibold">{data.attendance.absentDays}</td>
                  </tr>
                  <tr className="bg-gray-100 font-bold">
                    <td className="border-t border-gray-300 px-2 py-1">Percentage</td>
                    <td className="border-t border-l border-gray-300 px-2 py-1 text-center">{data.attendance.percentage}%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Result Summary */}
            <div className="border border-gray-400">
              <div className="bg-gray-800 text-white px-2 py-1 font-bold text-center">
                FINAL RESULT
              </div>
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="border-t border-gray-300 px-2 py-1">Total Marks</td>
                    <td className="border-t border-l border-gray-300 px-2 py-1 text-center font-semibold">{data.finalTotalObtained}/{data.finalTotalMaxMarks}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border-t border-gray-300 px-2 py-1">Percentage</td>
                    <td className="border-t border-l border-gray-300 px-2 py-1 text-center font-semibold">{data.finalPercentage.toFixed(1)}%</td>
                  </tr>
                  <tr>
                    <td className="border-t border-gray-300 px-2 py-1">Grade</td>
                    <td className="border-t border-l border-gray-300 px-2 py-1 text-center font-bold text-lg">{data.finalGrade}</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="border-t border-gray-300 px-2 py-1">Rank</td>
                    <td className="border-t border-l border-gray-300 px-2 py-1 text-center font-semibold">{data.rank || "—"}</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            REMARKS
        ══════════════════════════════════════════════════════════════════ */}
        <section className="mb-8">
          <div className="border border-gray-400">
            <div className="bg-gray-800 text-white px-3 py-1.5 font-bold text-sm">
              TEACHER&apos;S REMARKS
            </div>
            <div className="p-3 min-h-[60px] text-sm">
              {data.remarks || (
                <span className="text-gray-400 italic">No remarks</span>
              )}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SIGNATURES
        ══════════════════════════════════════════════════════════════════ */}
        <section className="mt-auto">
          <div className="flex justify-between items-end pt-8 text-sm">
            <div className="text-center">
              <div className="w-40 border-t border-black mb-1"></div>
              <p className="font-semibold">Class Teacher</p>
            </div>
            
            <div className="text-center">
              <div className="w-40 border-t border-black mb-1"></div>
              <p className="font-semibold">Parent/Guardian</p>
            </div>
            
            <div className="text-center">
              <div className="w-40 border-t border-black mb-1"></div>
              <p className="font-semibold">Principal</p>
            </div>
          </div>
          
          <p className="text-center text-xs text-gray-500 mt-6">
            Date of Issue: {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}
          </p>
        </section>

      </div>
    </div>
  );
}
