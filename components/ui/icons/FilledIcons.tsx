"use client";

import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

export function BookFilledIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 1 4 17.5v-13Z" />
      <path d="M6.5 22A2.5 2.5 0 0 1 4 19.5V19h14v1.5a1.5 1.5 0 0 1-1.5 1.5H6.5Z" opacity="0.5" />
      <path d="M8 6h8v2H8V6Zm0 4h6v2H8v-2Z" fill="white" opacity="0.9" />
    </svg>
  );
}

export function CheckCircleFilledIcon({
  size = 24,
  className,
  ...props
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path
        d="M8 12l2.5 2.5L16 9"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function ClockFilledIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path
        d="M12 6v6l4 2"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function CalendarFilledIcon({
  size = 24,
  className,
  ...props
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M3 8V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2H3Z" opacity="0.7" />
      <path d="M3 8h18v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z" />
      <rect x="7" y="2" width="2" height="4" rx="1" fill="white" opacity="0.9" />
      <rect x="15" y="2" width="2" height="4" rx="1" fill="white" opacity="0.9" />
      <circle cx="12" cy="15" r="2.5" fill="white" opacity="0.9" />
      <path
        d="M12 12.5V15l1.5 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function UserCheckFilledIcon({
  size = 24,
  className,
  ...props
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <circle cx="9" cy="7" r="4" />
      <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2H3Z" />
      <circle cx="18" cy="16" r="5" opacity="0.9" />
      <path
        d="M15.5 16l1.5 1.5L20 14.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function PendingFilledIcon({
  size = 24,
  className,
  ...props
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="8" cy="12" r="1.5" fill="white" />
      <circle cx="12" cy="12" r="1.5" fill="white" />
      <circle cx="16" cy="12" r="1.5" fill="white" />
    </svg>
  );
}

export function AbsentFilledIcon({
  size = 24,
  className,
  ...props
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path
        d="M8 12h8"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function AlertFilledIcon({
  size = 24,
  className,
  ...props
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M12 2L2 22h20L12 2Z" />
      <path
        d="M12 9v5M12 17v.5"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function BellFilledIcon({
  size = 24,
  className,
  ...props
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9Z" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" fill="currentColor" />
    </svg>
  );
}

export function SendFilledIcon({
  size = 24,
  className,
  ...props
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7Z" />
    </svg>
  );
}
