"use client";

import { Test } from "@/lib/types/subjectDetail";
import { motion } from "framer-motion";
import {
  Table,
  TableHeader,
  TableHeadRow,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/Table";

interface TestsTableProps {
  tests: Test[];
}

export const TestsTable = ({ tests }: TestsTableProps) => {
  if (tests.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface border border-dashed border-border rounded-2xl px-5 py-12 text-center text-text-muted"
      >
        No tests scheduled or completed.
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow-sm rounded-none sm:rounded-2xl border-x-0 sm:border-x border-y border-border">
            <Table className="min-w-full">
              <TableHeader>
                <TableHeadRow>
                  <TableHead className="text-white text-sm">
                    Test Name
                  </TableHead>
                  <TableHead className="text-white text-sm">Date</TableHead>
                  <TableHead className="text-white text-sm">Result</TableHead>
                </TableHeadRow>
              </TableHeader>
              <TableBody>
                {tests.map((test) => (
                  <TableRow key={test.id}>
                    <TableCell className="font-semibold text-text-primary text-sm">
                      {test.name}
                    </TableCell>
                    <TableCell className="text-text-secondary text-sm whitespace-nowrap">
                      {test.date}
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-text-primary text-sm whitespace-nowrap">
                        {test.result}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
