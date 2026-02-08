"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Save,
  Plus,
  Trash2,
  Pencil,
  ToggleLeft,
  ToggleRight,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PageHeader } from "@/components/admin/PageHeader";
import {
  Table,
  TableHeader,
  TableHeadRow,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/Table";
import {
  feeHeads as initialData,
  classGroups,
} from "@/lib/admin/mock-data/settings";
import { FeeHead } from "@/lib/admin/types/settings";

export default function FeeStructurePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [feeHeads, setFeeHeads] = useState<FeeHead[]>(initialData);

  const activeFees = feeHeads.filter((f) => f.isActive);
  const inactiveFees = feeHeads.filter((f) => !f.isActive);

  const handleSave = () => {
    console.log("Save Fee Structure:", feeHeads);
    setIsEditing(false);
  };

  const addFeeHead = () => {
    setFeeHeads([
      ...feeHeads,
      {
        id: `fee-${Date.now()}`,
        name: "",
        amount: 0,
        amountByGroup: classGroups.map((g) => ({
          groupId: g.id,
          groupName: g.name,
          amount: 0,
        })),
        frequency: "monthly",
        applicableTo: "all",
        isActive: true,
      },
    ]);
  };

  const removeFeeHead = (id: string) => {
    setFeeHeads(feeHeads.filter((f) => f.id !== id));
  };

  const updateFeeHead = (id: string, field: keyof FeeHead, value: unknown) => {
    setFeeHeads(
      feeHeads.map((f) => (f.id === id ? { ...f, [field]: value } : f)),
    );
  };

  const updateGroupAmount = (
    feeId: string,
    groupId: string,
    amount: number,
  ) => {
    setFeeHeads(
      feeHeads.map((f) => {
        if (f.id !== feeId) return f;
        const groups = f.amountByGroup || [];
        const existing = groups.find((g) => g.groupId === groupId);
        if (existing) {
          return {
            ...f,
            amountByGroup: groups.map((g) =>
              g.groupId === groupId ? { ...g, amount } : g,
            ),
          };
        }
        const group = classGroups.find((g) => g.id === groupId);
        return {
          ...f,
          amountByGroup: [
            ...groups,
            { groupId, groupName: group?.name || "", amount },
          ],
        };
      }),
    );
  };

  const getGroupAmount = (fee: FeeHead, groupId: string): number => {
    const entry = fee.amountByGroup?.find((g) => g.groupId === groupId);
    return entry?.amount ?? fee.amount;
  };

  // Calculate totals per wing (all active fees)
  const wingTotals = useMemo(() => {
    return classGroups.map((group) => {
      const total = activeFees.reduce(
        (sum, f) => sum + getGroupAmount(f, group.id),
        0,
      );
      return { groupId: group.id, total };
    });
  }, [feeHeads]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <PageHeader
        title="Fee Structure"
        subtitle="Default fee heads and amounts per wing"
      >
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="gap-2"
          >
            <Pencil className="w-3.5 h-3.5" /> Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setFeeHeads(initialData);
                setIsEditing(false);
              }}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              className="bg-accent hover:bg-accent-hover text-white gap-2"
            >
              <Save className="w-3.5 h-3.5" /> Save
            </Button>
          </div>
        )}
      </PageHeader>

      {/* Info Banner */}
      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4 flex items-start gap-3">
        <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
        <p className="text-sm text-blue-700 dark:text-blue-300">
          These are <strong>default charges</strong> per wing. During challan
          generation, admins can add or modify charges for specific
          classes, sections, or students.
        </p>
      </div>

      {/* Fee Matrix Table */}
      <Table>
        <TableHeader>
          <TableHeadRow>
            <TableHead className="w-[220px]">Fee Head</TableHead>
            {classGroups.map((group) => (
              <TableHead key={group.id} className="text-right">
                <div>{group.name}</div>
                <div className="text-[10px] font-normal opacity-75">
                  Class {group.classes.join(", ")}
                </div>
              </TableHead>
            ))}
            {isEditing && (
              <TableHead className="w-[80px] text-center">Actions</TableHead>
            )}
          </TableHeadRow>
        </TableHeader>
        <TableBody>
          {activeFees.map((fee) => (
            <TableRow key={fee.id} isClickable={false}>
              <TableCell>
                {isEditing ? (
                  <Input
                    value={fee.name}
                    onChange={(e) =>
                      updateFeeHead(fee.id, "name", e.target.value)
                    }
                    placeholder="Fee head name"
                    className="h-8 text-sm"
                  />
                ) : (
                  <span className="font-medium text-text-primary">
                    {fee.name}
                  </span>
                )}
              </TableCell>
              {classGroups.map((group) => (
                <TableCell key={group.id} className="text-right">
                  {isEditing ? (
                    <Input
                      type="number"
                      value={getGroupAmount(fee, group.id)}
                      onChange={(e) =>
                        updateGroupAmount(
                          fee.id,
                          group.id,
                          Number(e.target.value),
                        )
                      }
                      className="h-8 text-sm text-right"
                    />
                  ) : (
                    <span className="font-semibold text-text-primary">
                      {getGroupAmount(fee, group.id) > 0
                        ? `Rs. ${getGroupAmount(fee, group.id).toLocaleString()}`
                        : "—"}
                    </span>
                  )}
                </TableCell>
              ))}
              {isEditing && (
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={() =>
                        updateFeeHead(fee.id, "isActive", false)
                      }
                      title="Disable"
                      className="p-1.5 rounded-lg hover:bg-surface-hover text-text-muted hover:text-orange-500 transition-colors"
                    >
                      <ToggleRight className="w-4 h-4 text-accent" />
                    </button>
                    <button
                      onClick={() => removeFeeHead(fee.id)}
                      title="Delete"
                      className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 text-text-muted hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}

          {/* Totals Row */}
          <TableRow isClickable={false} className="bg-surface-hover">
            <TableCell>
              <span className="font-bold text-text-primary">Total</span>
            </TableCell>
            {classGroups.map((group) => {
              const total =
                wingTotals.find((t) => t.groupId === group.id)?.total || 0;
              return (
                <TableCell key={group.id} className="text-right">
                  <span className="font-bold text-accent text-base">
                    Rs. {total.toLocaleString()}
                  </span>
                </TableCell>
              );
            })}
            {isEditing && <TableCell />}
          </TableRow>
        </TableBody>
      </Table>

      {/* Add Fee Head Button */}
      {isEditing && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button
            variant="outline"
            onClick={addFeeHead}
            className="w-full gap-2 border-dashed border-2 hover:border-accent hover:bg-accent/5"
          >
            <Plus className="w-4 h-4" /> Add Fee Head
          </Button>
        </motion.div>
      )}

      {/* Inactive Fee Heads */}
      {inactiveFees.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider">
            Inactive Fee Heads
          </h3>
          <div className="space-y-2">
            {inactiveFees.map((fee) => (
              <div
                key={fee.id}
                className="bg-surface rounded-xl border border-border p-4 opacity-60 flex items-center justify-between"
              >
                <span className="font-medium text-text-secondary">
                  {fee.name}
                </span>
                {isEditing && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateFeeHead(fee.id, "isActive", true)
                      }
                      title="Enable"
                      className="p-1.5 rounded-lg hover:bg-surface-hover text-text-muted hover:text-accent transition-colors"
                    >
                      <ToggleLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => removeFeeHead(fee.id)}
                      title="Delete"
                      className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 text-text-muted hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
