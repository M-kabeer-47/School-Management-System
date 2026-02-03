import React from "react";

// Page Header Icons - Child-friendly icons with gradient styling
export const PageHeaderIcons = {
  // Homework - Clipboard with detailed pencil and checklist
  Homework: ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
      className={className}
    >
      <defs>
        <linearGradient id="homeworkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="30%" stopColor="#2563eb" />
          <stop offset="70%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>

      {/* Clipboard Body */}
      <path
        d="M19 6h10"
        stroke="url(#homeworkGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <rect
        x="10"
        y="10"
        width="28"
        height="34"
        rx="3"
        stroke="url(#homeworkGradient)"
        strokeWidth="2.5"
        fill="none"
      />
      {/* Clip */}
      <path
        d="M17 6H31V9a2 2 0 0 1-2 2H19a2 2 0 0 1-2-2V6z"
        stroke="url(#homeworkGradient)"
        strokeWidth="2.5"
        fill="none"
        strokeLinejoin="round"
      />

      {/* Checklist items */}
      {/* Item 1 */}
      <rect
        x="15"
        y="18"
        width="4"
        height="4"
        rx="1"
        stroke="url(#homeworkGradient)"
        strokeWidth="2"
      />
      <line
        x1="23"
        y1="20"
        x2="33"
        y2="20"
        stroke="url(#homeworkGradient)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Item 2 */}
      <rect
        x="15"
        y="26"
        width="4"
        height="4"
        rx="1"
        stroke="url(#homeworkGradient)"
        strokeWidth="2"
      />
      <line
        x1="23"
        y1="28"
        x2="33"
        y2="28"
        stroke="url(#homeworkGradient)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Item 3 */}
      <rect
        x="15"
        y="34"
        width="4"
        height="4"
        rx="1"
        stroke="url(#homeworkGradient)"
        strokeWidth="2"
      />

      {/* Pencil Overlay */}
      <path
        d="M28 42 L42 28 L45 31 L31 45 L26 46 L28 42 Z"
        fill="white"
        stroke="url(#homeworkGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Pencil Details */}
      <path d="M40 30 L43 33" stroke="url(#homeworkGradient)" strokeWidth="2" />
      <path d="M30 40 L33 43" stroke="url(#homeworkGradient)" strokeWidth="2" />
    </svg>
  ),

  // Subjects - Stack of books with detailed spines and pages
  Subjects: ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
      className={className}
    >
      <defs>
        <linearGradient id="subjectsGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="30%" stopColor="#2563eb" />
          <stop offset="70%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>

      {/* Top Book (Spine visible) */}
      <rect
        x="8"
        y="4"
        width="32"
        height="9"
        rx="2"
        fill="url(#subjectsGradient)"
      />
      <rect
        x="32"
        y="6"
        width="5"
        height="5"
        fill="#93c5fd"
        fillOpacity="0.5"
        rx="0.5"
      />

      {/* Second Book (Pages right) */}
      <path
        d="M8 14h28c2 0 4 1 4 4s-2 4-4 4H8v-8z"
        stroke="url(#subjectsGradient)"
        strokeWidth="2.5"
        fill="none"
      />
      <path d="M8 14v8" stroke="url(#subjectsGradient)" strokeWidth="2.5" />
      <line
        x1="12"
        y1="16"
        x2="36"
        y2="16"
        stroke="url(#subjectsGradient)"
        strokeWidth="1"
      />
      <line
        x1="12"
        y1="19"
        x2="36"
        y2="19"
        stroke="url(#subjectsGradient)"
        strokeWidth="1"
      />
      <path d="M26 14v5l-2-1.5-2 1.5v-5" fill="url(#subjectsGradient)" />

      {/* Third Book (Spine visible) */}
      <rect
        x="8"
        y="24"
        width="32"
        height="9"
        rx="2"
        fill="url(#subjectsGradient)"
      />
      <rect
        x="12"
        y="26"
        width="8"
        height="5"
        fill="#93c5fd"
        fillOpacity="0.5"
        rx="0.5"
      />

      {/* Bottom Book (Pages left) */}
      <path
        d="M40 34H12c-2 0-4 1-4 4s2 4 4 4h28v-8z"
        stroke="url(#subjectsGradient)"
        strokeWidth="2.5"
        fill="none"
      />
      <path d="M40 34v8" stroke="url(#subjectsGradient)" strokeWidth="2.5" />
      <line
        x1="36"
        y1="36"
        x2="12"
        y2="36"
        stroke="url(#subjectsGradient)"
        strokeWidth="1"
      />
      <line
        x1="36"
        y1="39"
        x2="12"
        y2="39"
        stroke="url(#subjectsGradient)"
        strokeWidth="1"
      />
      <path d="M22 34v5l2-1.5 2 1.5v-5" fill="url(#subjectsGradient)" />
    </svg>
  ),

  // Fees - Receipt with folded corner and details
  Fees: ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
      className={className}
    >
      <defs>
        <linearGradient id="feesGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="30%" stopColor="#2563eb" />
          <stop offset="70%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>

      {/* Main Receipt Body (with top-left cutout for fold) */}
      <path
        d="M16 4 H36 A4 4 0 0 1 40 8 V40 L35 36 L30 40 L25 36 L20 40 L15 36 L10 40 V10 A2 2 0 0 1 12 8 Z"
        stroke="url(#feesGradient)"
        strokeWidth="2.5"
        fill="none"
        strokeLinejoin="round"
      />

      {/* Folded Corner Effect (Top Left) */}
      <path
        d="M10 14 C 10 6, 18 6, 18 14"
        stroke="url(#feesGradient)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* "RECEIPT" text representation (using simplified lines/shapes for legibility at small size) */}
      {/* Header Line (thick) */}
      <rect
        x="22"
        y="10"
        width="12"
        height="3"
        rx="1.5"
        fill="url(#feesGradient)"
      />

      {/* Row of Circles/Dots */}
      <circle cx="16" cy="18" r="2" fill="url(#feesGradient)" />
      <circle cx="22" cy="18" r="2" fill="url(#feesGradient)" />
      <circle cx="28" cy="18" r="2" fill="url(#feesGradient)" />
      <circle cx="34" cy="18" r="2" fill="url(#feesGradient)" />

      {/* Horizontal content lines */}
      <line
        x1="14"
        y1="24"
        x2="36"
        y2="24"
        stroke="url(#feesGradient)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="14"
        y1="29"
        x2="36"
        y2="29"
        stroke="url(#feesGradient)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="14"
        y1="34"
        x2="36"
        y2="34"
        stroke="url(#feesGradient)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),

  // Dashboard/Home - House with heart
  Dashboard: ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
      className={className}
    >
      <defs>
        <linearGradient
          id="dashboardGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>
      {/* Roof */}
      <path
        d="M 6 22 L 24 6 L 42 22"
        stroke="url(#dashboardGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* House body */}
      <rect
        x="10"
        y="20"
        width="28"
        height="22"
        stroke="url(#dashboardGradient)"
        strokeWidth="2.5"
        fill="none"
      />
      {/* Door */}
      <rect
        x="18"
        y="30"
        width="8"
        height="12"
        rx="1"
        stroke="url(#dashboardGradient)"
        strokeWidth="2"
        fill="none"
      />
      {/* Window */}
      <rect
        x="28"
        y="26"
        width="6"
        height="6"
        stroke="url(#dashboardGradient)"
        strokeWidth="2"
        fill="none"
      />
      <line
        x1="31"
        y1="26"
        x2="31"
        y2="32"
        stroke="url(#dashboardGradient)"
        strokeWidth="1.5"
      />
      <line
        x1="28"
        y1="29"
        x2="34"
        y2="29"
        stroke="url(#dashboardGradient)"
        strokeWidth="1.5"
      />
    </svg>
  ),

  // Attendance - Calendar with grid boxes (some with checkmarks, some empty)
  Attendance: ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
      className={className}
    >
      <defs>
        <linearGradient
          id="attendanceGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="30%" stopColor="#2563eb" />
          <stop offset="70%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>

      {/* Calendar body */}
      <rect
        x="6"
        y="8"
        width="36"
        height="36"
        rx="3"
        stroke="url(#attendanceGradient)"
        strokeWidth="2.5"
        fill="none"
      />

      {/* Calendar header */}
      <rect
        x="6"
        y="8"
        width="36"
        height="10"
        rx="3"
        fill="url(#attendanceGradient)"
        opacity="0.2"
      />

      {/* Rings */}
      <line
        x1="14"
        y1="4"
        x2="14"
        y2="12"
        stroke="url(#attendanceGradient)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="34"
        y1="4"
        x2="34"
        y2="12"
        stroke="url(#attendanceGradient)"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Calendar Grid - Row 1 */}
      {/* Box 1 - Marked with checkmark */}
      <rect
        x="10"
        y="22"
        width="6"
        height="6"
        rx="1"
        stroke="url(#attendanceGradient)"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M12 25l1 1 2-2"
        stroke="url(#attendanceGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Box 2 - Unmarked (empty) */}
      <rect
        x="21"
        y="22"
        width="6"
        height="6"
        rx="1"
        stroke="url(#attendanceGradient)"
        strokeWidth="1.5"
        fill="none"
      />

      {/* Box 3 - Marked with checkmark */}
      <rect
        x="32"
        y="22"
        width="6"
        height="6"
        rx="1"
        stroke="url(#attendanceGradient)"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M34 25l1 1 2-2"
        stroke="url(#attendanceGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Calendar Grid - Row 2 */}
      {/* Box 4 - Unmarked (empty) */}
      <rect
        x="10"
        y="32"
        width="6"
        height="6"
        rx="1"
        stroke="url(#attendanceGradient)"
        strokeWidth="1.5"
        fill="none"
      />

      {/* Box 5 - Marked with checkmark */}
      <rect
        x="21"
        y="32"
        width="6"
        height="6"
        rx="1"
        stroke="url(#attendanceGradient)"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M23 35l1 1 2-2"
        stroke="url(#attendanceGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Box 6 - Marked with checkmark */}
      <rect
        x="32"
        y="32"
        width="6"
        height="6"
        rx="1"
        stroke="url(#attendanceGradient)"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M34 35l1 1 2-2"
        stroke="url(#attendanceGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  ),

  // Profile - User Avatar style matching sidebar
  Profile: ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <defs>
        <linearGradient
          id="profileGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>
      <path
        d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
        stroke="url(#profileGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="7"
        r="4"
        stroke="url(#profileGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  // Classes - Schedule/Timetable with class sessions
  Classes: ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
      className={className}
    >
      <defs>
        <linearGradient id="classesGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="30%" stopColor="#2563eb" />
          <stop offset="70%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>

      {/* Clock/Schedule board background */}
      <rect
        x="6"
        y="6"
        width="36"
        height="36"
        rx="3"
        stroke="url(#classesGradient)"
        strokeWidth="2.5"
        fill="none"
      />

      {/* Header bar (like a schedule header) */}
      <rect
        x="6"
        y="6"
        width="36"
        height="8"
        rx="3"
        fill="url(#classesGradient)"
        opacity="0.2"
      />

      {/* Time slots / Class periods represented as rows */}

      {/* Period 1 - with book icon */}
      <rect
        x="12"
        y="18"
        width="24"
        height="5"
        rx="1"
        stroke="url(#classesGradient)"
        strokeWidth="2"
        fill="none"
      />
      <rect x="14" y="19.5" width="2" height="2" fill="url(#classesGradient)" />

      {/* Period 2 - with book icon */}
      <rect
        x="12"
        y="26"
        width="24"
        height="5"
        rx="1"
        stroke="url(#classesGradient)"
        strokeWidth="2"
        fill="none"
      />
      <rect x="14" y="27.5" width="2" height="2" fill="url(#classesGradient)" />

      {/* Period 3 - with book icon */}
      <rect
        x="12"
        y="34"
        width="24"
        height="5"
        rx="1"
        stroke="url(#classesGradient)"
        strokeWidth="2"
        fill="none"
      />
      <rect x="14" y="35.5" width="2" height="2" fill="url(#classesGradient)" />

      {/* Clock icon in top right to indicate schedule/time */}
      <circle
        cx="36"
        cy="10"
        r="3"
        stroke="url(#classesGradient)"
        strokeWidth="1.5"
        fill="none"
      />
      <line
        x1="36"
        y1="10"
        x2="36"
        y2="8"
        stroke="url(#classesGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="36"
        y1="10"
        x2="37.5"
        y2="10"
        stroke="url(#classesGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),

  // Reports - Certificate/Document style
  Reports: ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
      className={className}
    >
      <defs>
        <linearGradient
          id="reportsGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>
      {/* Document */}
      <rect
        x="8"
        y="4"
        width="32"
        height="40"
        rx="3"
        stroke="url(#reportsGradient)"
        strokeWidth="2.5"
        fill="none"
      />
      {/* Header decoration */}
      <rect
        x="8"
        y="4"
        width="32"
        height="10"
        rx="3"
        fill="url(#reportsGradient)"
        opacity="0.2"
      />
      {/* Lines */}
      <line
        x1="14"
        y1="20"
        x2="34"
        y2="20"
        stroke="url(#reportsGradient)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="14"
        y1="26"
        x2="34"
        y2="26"
        stroke="url(#reportsGradient)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="14"
        y1="32"
        x2="26"
        y2="32"
        stroke="url(#reportsGradient)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Grade badge */}
      <circle
        cx="32"
        cy="34"
        r="6"
        stroke="url(#reportsGradient)"
        strokeWidth="2"
        fill="none"
      />
      <text
        x="32"
        y="37"
        textAnchor="middle"
        fontSize="7"
        fontWeight="bold"
        fill="url(#reportsGradient)"
      >
        A
      </text>
    </svg>
  ),

  // Announcements - Notice board / Megaphone style
  Announcements: ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
      className={className}
    >
      <defs>
        <linearGradient
          id="announcementsGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>
      {/* Notice board frame */}
      <rect
        x="6"
        y="8"
        width="36"
        height="32"
        rx="3"
        stroke="url(#announcementsGradient)"
        strokeWidth="2.5"
        fill="none"
      />
      {/* Board header bar */}
      <rect
        x="6"
        y="8"
        width="36"
        height="8"
        rx="3"
        fill="url(#announcementsGradient)"
        opacity="0.15"
      />
      {/* Pin 1 */}
      <circle cx="14" cy="12" r="2" fill="url(#announcementsGradient)" />
      {/* Pin 2 */}
      <circle cx="34" cy="12" r="2" fill="url(#announcementsGradient)" />
      {/* Notice lines */}
      <line
        x1="12"
        y1="22"
        x2="36"
        y2="22"
        stroke="url(#announcementsGradient)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="12"
        y1="28"
        x2="30"
        y2="28"
        stroke="url(#announcementsGradient)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="12"
        y1="34"
        x2="24"
        y2="34"
        stroke="url(#announcementsGradient)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
};
