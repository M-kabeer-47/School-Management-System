import React from "react";

export const PageHeaderIcons = {
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
