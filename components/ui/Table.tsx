"use client";

import * as React from "react";
import { cn } from "@/lib/common/utils";
import Link from "next/link";

// ============================================
// TABLE ROOT
// ============================================
interface TableProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  tableClassName?: string;
}

export const Table = React.forwardRef<HTMLDivElement, TableProps>(
  ({ className, tableClassName, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-surface border border-border rounded-2xl overflow-x-auto shadow-sm",
          className,
        )}
        {...props}
      >
        <table className={cn("w-full border-collapse", tableClassName)}>
          {children}
        </table>
      </div>
    );
  },
);
Table.displayName = "Table";

// ============================================
// TABLE HEADER
// ============================================
interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(({ className, children, ...props }, ref) => {
  return (
    <thead
      ref={ref}
      className={cn(
        "text-accent-foreground bg-accent-light text-white",
        className,
      )}
      // style={{ background: "var(--accent-gradient)" }}
      {...props}
    >
      {children}
    </thead>
  );
});
TableHeader.displayName = "TableHeader";

// ============================================
// TABLE HEAD ROW
// ============================================
interface TableHeadRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
}

export const TableHeadRow = React.forwardRef<
  HTMLTableRowElement,
  TableHeadRowProps
>(({ className, children, ...props }, ref) => {
  return (
    <tr ref={ref} className={cn("", className)} {...props}>
      {children}
    </tr>
  );
});
TableHeadRow.displayName = "TableHeadRow";

// ============================================
// TABLE HEAD CELL
// ============================================
interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children?: React.ReactNode;
}

export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <th
        ref={ref}
        className={cn(
          "px-4 py-3 md:px-5 md:py-3.5 text-left text-xs md:text-sm font-semibold tracking-wide border-r border-white/20 last:border-r-0",
          className,
        )}
        {...props}
      >
        {children}
      </th>
    );
  },
);
TableHead.displayName = "TableHead";

// ============================================
// TABLE BODY
// ============================================
interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  TableBodyProps
>(({ className, children, ...props }, ref) => {
  return (
    <tbody ref={ref} className={cn("", className)} {...props}>
      {children}
    </tbody>
  );
});
TableBody.displayName = "TableBody";

// ============================================
// TABLE ROW
// ============================================
interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
  isClickable?: boolean;
}

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, children, isClickable = false, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        className={cn(
          "transition-colors border-b border-border last:border-b-0 bg-surface",
          isClickable &&
            "hover:bg-surface-hover active:bg-surface-active cursor-pointer",
          className,
        )}
        {...props}
      >
        {children}
      </tr>
    );
  },
);
TableRow.displayName = "TableRow";

// ============================================
// TABLE CELL
// ============================================
interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children?: React.ReactNode;
}

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <td
        ref={ref}
        className={cn(
          "px-4 py-3 md:px-5 md:py-4 text-sm text-text-primary border-r border-border last:border-r-0",
          className,
        )}
        {...props}
      >
        {children}
      </td>
    );
  },
);
TableCell.displayName = "TableCell";

// ============================================
// TABLE ACTION CELL (View button for clickable rows)
// ============================================
interface TableActionCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  label?: string;
}

export const TableActionCell = React.forwardRef<
  HTMLTableCellElement,
  TableActionCellProps
>(({ className, label = "View", ...props }, ref) => {
  return (
    <td
      ref={ref}
      className={cn(
        "px-4 py-3 md:px-5 md:py-4 text-center border-r border-border last:border-r-0",
        className,
      )}
      {...props}
    >
      <span className="text-accent hover:text-accent-hover text-sm font-medium">
        {label}
      </span>
    </td>
  );
});
TableActionCell.displayName = "TableActionCell";
