import React from "react";

export const AdminIcons = {
  // Document icon for papers/forms
  Paper: ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  ),

  // Check circle for uploaded/completed status
  Uploaded: ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),

  // Clock for pending/remaining status
  Pending: ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),

  // Alert circle for overdue/critical status
  Overdue: ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),

  // Calendar Clock for deadlines
  Deadline: ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11" />
      <path d="M3 10h18" />
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <path d="m16 20 2-2 4 4" />
    </svg>
  ),
};

export const KPIIcons = {
  // Total Students - Group of avatars
  TotalStudents: ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
      className={className}
    >
      <defs>
        <linearGradient
          id="kpiTotalGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>

      {/* Background Left - Body & Head */}
      <path
        d="M12 28 C 9 28, 6 30, 6 34 L 6 38 H 18 L 18 34 C 18 30, 15 28, 12 28 Z"
        fill="url(#kpiTotalGradient)"
        opacity="0.4"
      />
      <circle
        cx="12"
        cy="22"
        r="4"
        fill="url(#kpiTotalGradient)"
        opacity="0.4"
      />

      {/* Background Right - Body & Head */}
      <path
        d="M36 28 C 33 28, 30 30, 30 34 L 30 38 H 42 L 42 34 C 42 30, 39 28, 36 28 Z"
        fill="url(#kpiTotalGradient)"
        opacity="0.4"
      />
      <circle
        cx="36"
        cy="22"
        r="4"
        fill="url(#kpiTotalGradient)"
        opacity="0.4"
      />

      {/* Foreground Center - Body & Head */}
      <path
        d="M24 26 C 19 26, 16 29, 16 34 L 16 40 H 32 L 32 34 C 32 29, 29 26, 24 26 Z"
        fill="url(#kpiTotalGradient)"
      />
      <circle cx="24" cy="18" r="6" fill="url(#kpiTotalGradient)" />
    </svg>
  ),

  // Boy - Short hair, collar
  Boy: ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
      className={className}
    >
      <defs>
        <linearGradient id="kpiBoyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
      </defs>

      {/* Head */}
      <circle cx="24" cy="18" r="9" fill="url(#kpiBoyGradient)" />

      {/* Body / Shoulders */}
      <path
        d="M 12 44 L 12 36 C 12 30, 16 28, 24 28 C 32 28, 36 30, 36 36 L 36 44 Z"
        fill="url(#kpiBoyGradient)"
      />
    </svg>
  ),

  Girl: ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
      className={className}
    >
      <defs>
        <linearGradient
          id="kpiGirlGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#d946ef" />
        </linearGradient>
      </defs>

      {/* Head */}
      <circle cx="24" cy="18" r="9" fill="url(#kpiGirlGradient)" />

      {/* Body / Shoulders */}
      <path
        d="M 12 44 L 12 36 C 12 30, 16 28, 24 28 C 32 28, 36 30, 36 36 L 36 44 Z"
        fill="url(#kpiGirlGradient)"
      />
    </svg>
  ),

  // Attendance - Quality checkmark with progress ring
  AttendanceRate: ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
      className={className}
    >
      <defs>
        <linearGradient id="kpiAttGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>

      {/* Track Ring (Faint) */}
      <circle
        cx="24"
        cy="24"
        r="18"
        stroke="#ecfdf5"
        strokeWidth="5"
        opacity="0.8"
      />

      {/* Progress Arc (approx 85%) - Clean mathematical arc */}
      <path
        d="M 24 6 A 18 18 0 1 1 10 35"
        stroke="url(#kpiAttGradient)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Checkmark (Centered & Weighted) */}
      <path
        d="M 16 25 L 22 31 L 32 19"
        stroke="url(#kpiAttGradient)"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  ),

  // Class Average - Gauge/Speedometer style with trend
  ClassAvg: ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
      className={className}
    >
      <defs>
        <linearGradient id="kpiAvgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>

      {/* Gauge Background Track */}
      <path
        d="M 8 36 A 20 20 0 1 1 40 36"
        stroke="url(#kpiAvgGradient)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="10 6"
        opacity="0.2"
      />

      {/* Gauge Filled Track (75%) */}
      <path
        d="M 8 36 A 20 20 0 1 1 36 20"
        stroke="url(#kpiAvgGradient)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Needle/Trend Arrow */}
      <path
        d="M 24 28 L 34 14"
        stroke="url(#kpiAvgGradient)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="28" r="4" fill="url(#kpiAvgGradient)" />
    </svg>
  ),

  // Tests - Clean stack of papers with A+ Grade
  Tests: ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
      className={className}
    >
      <defs>
        <linearGradient
          id="kpiTestsGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>

      {/* Bottom Paper (Offset) */}
      <rect
        x="12"
        y="8"
        width="24"
        height="32"
        rx="2"
        fill="url(#kpiTestsGradient)"
        opacity="0.15"
        transform="rotate(-6 24 24)"
      />

      {/* Middle Paper (Offset) */}
      <rect
        x="12"
        y="8"
        width="24"
        height="32"
        rx="2"
        fill="url(#kpiTestsGradient)"
        opacity="0.25"
        transform="rotate(6 24 24)"
      />

      {/* Loop to ensure clean cut */}

      {/* Top Paper (Main) */}
      <rect
        x="12"
        y="8"
        width="24"
        height="32"
        rx="3"
        fill="white"
        stroke="url(#kpiTestsGradient)"
        strokeWidth="2.5"
      />

      {/* A+ Grade */}
      <path
        d="M 18 20 L 21 12 L 24 20 M 19 17 H 23"
        stroke="url(#kpiTestsGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 28 14 H 34 M 31 11 V 17"
        stroke="url(#kpiTestsGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Horizontal Lines */}
      <line
        x1="16"
        y1="26"
        x2="32"
        y2="26"
        stroke="url(#kpiTestsGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.3"
      />
      <line
        x1="16"
        y1="32"
        x2="28"
        y2="32"
        stroke="url(#kpiTestsGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  ),

  // Top Score - Trophy with glowing effect
  TopScore: ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
      className={className}
    >
      <defs>
        <linearGradient
          id="kpiTrophyGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      <path
        d="M 14 12 H 34 V 24 C 34 30, 30 34, 24 34 C 18 34, 14 30, 14 24 V 12 Z"
        fill="url(#kpiTrophyGradient)"
      />
      <path
        d="M 14 16 H 8 V 22 C 8 24, 10 26, 12 26 H 14"
        stroke="url(#kpiTrophyGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 34 16 H 40 V 22 C 40 24, 38 26, 36 26 H 34"
        stroke="url(#kpiTrophyGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 24 34 V 40 M 18 40 H 30"
        stroke="url(#kpiTrophyGradient)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M 24 8 V 10"
        stroke="url(#kpiTrophyGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  ),
};
