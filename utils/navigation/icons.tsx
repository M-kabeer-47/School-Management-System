export const SubjectIcons = {
  // Book with pages - for Topics (simple, represents chapters/lessons)
  Topics: ({ className }: { className?: string }) => (
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
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <path d="M8 7h8" />
      <path d="M8 11h6" />
      <path d="M8 15h4" />
    </svg>
  ),

  // File/folder with documents - for Materials (clear representation of resources)
  Materials: ({ className }: { className?: string }) => (
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
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
      <path d="M8 10h8" />
      <path d="M8 14h5" />
    </svg>
  ),

  // Paper with check/grade - for Tests (represents exam/grading)
  Tests: ({ className }: { className?: string }) => (
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
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M9 15l2 2 4-4" />
    </svg>
  ),
};

export const NavbarIcons = {
  // Sun Icon - Friendly sun for light mode
  Sun: ({ className }: { className?: string }) => (
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
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  ),

  // Moon Icon - Friendly crescent moon for dark mode
  Moon: ({ className }: { className?: string }) => (
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
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  ),

  // Bell with simple design - for notifications
  Notifications: ({ className }: { className?: string }) => (
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  ),

  // Door/logout icon - clearer exit symbol
  Logout: ({ className }: { className?: string }) => (
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
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  ),

  // User circle - friendly profile icon
  Profile: ({ className }: { className?: string }) => (
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
      <circle cx="12" cy="10" r="3" />
      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
    </svg>
  ),
};

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

  // Report Card - Certificate/Document style
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
  // Add this to your PageHeaderIcons object in the Icons file

  // Classes - Classroom with desk, board, and teaching elements
  // Add this to your PageHeaderIcons object in the Icons file

  // Classes - Multiple students/people representing different class groups
  // Add this to your PageHeaderIcons object in the Icons file

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
};

export const Icons = {
  ...SubjectIcons,
  ...NavbarIcons,
  ...PageHeaderIcons,
  // Re-export from lucide-react for sidebar
  Home: ({ className }: { className?: string }) => (
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  BookOpen: ({ className }: { className?: string }) => (
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
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  Calendar: ({ className }: { className?: string }) => (
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
      <rect x="3" y="4" width="10" height="10" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  ClipboardList: ({ className }: { className?: string }) => (
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
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4" />
      <path d="M12 16h4" />
      <path d="M8 11h.01" />
      <path d="M8 16h.01" />
    </svg>
  ),
  Receipt: ({ className }: { className?: string }) => (
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
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1z" />
      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
      <path d="M12 17V7" />
    </svg>
  ),
  Wallet: ({ className }: { className?: string }) => (
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
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
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
