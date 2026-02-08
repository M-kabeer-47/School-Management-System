"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Plus, Trash2, Pencil, Info } from "lucide-react";
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { AddFeeHeadModal } from "@/components/admin/settings/AddFeeHeadModal";
import {
  feeHeads as initialData,
  classGroups,
} from "@/lib/admin/mock-data/settings";
import { FeeHead } from "@/lib/admin/types/settings";

export default function FeeStructurePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [feeHeads, setFeeHeads] = useState<FeeHead[]>(initialData);
  const [activeTab, setActiveTab] = useState(classGroups[0]?.id || "group-1");

  const currentWing = classGroups.find((g) => g.id === activeTab);

  // Filter fee heads for the current wing
  const wingFees = useMemo(() => {
    return feeHeads.filter((f) => {
      // Show if it's explicitly assigned to this wing
      if (f.wingId === activeTab) return true;
      // OR if it's a global fee (no wingId) - optional, depending on requirement.
      // For this refactor, let's assume global fees show everywhere or are separate.
      // Based on user request, we want distinct lists.
      // Let's show global fees in all tabs for now, but editable only if we decide.
      // Actually, purely wing-specific is cleaner. Let's filter by wingId.
      // New items will strictly have wingId.
      // Legacy global items (no wingId) = show in all?
      // Let's stick to strict wingId check for simplicity of "deletion".
      // If a fee has no wingId, it's global.
      return !f.wingId || f.wingId === activeTab;
    });
  }, [feeHeads, activeTab]);

  const handleSave = () => {
    console.log("Save Fee Structure:", feeHeads);
    setIsEditing(false);
  };

  const handleAddFeeHead = (data: { name: string; amount: number }) => {
    setFeeHeads([
      ...feeHeads,
      {
        id: `fee-${Date.now()}`,
        name: data.name,
        amount: data.amount,
        frequency: "monthly",
        applicableTo: "all",
        isActive: true,
        wingId: activeTab, // Assign to current wing
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

  const totalMonthly = wingFees
    .filter((f) => f.frequency === "monthly" && f.isActive)
    .reduce((sum, f) => sum + f.amount, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <PageHeader
        title="Fee Structure"
        subtitle="Manage fee heads and amounts for each wing"
      />

      {/* Tabs Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="">
        <div className="flex items-center justify-between">
          <TabsList className="bg-surface border border-border p-1 h-auto w-[60%]">
            {classGroups.map((group) => (
              <TabsTrigger
                key={group.id}
                value={group.id}
                className="px-4 py-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                {group.name} Wing
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Info Hint */}
          {isEditing && (
            <div className="text-sm text-text-muted flex items-center gap-2 animate-in fade-in slide-in-from-right-4">
              <Info className="w-4 h-4 text-accent" />
              <span>
                Adding fees to <strong>{currentWing?.name} Wing</strong>
              </span>
            </div>
          )}
        </div>

        {classGroups.map((group) => (
          <TabsContent
            key={group.id}
            value={group.id}
            className="space-y-4 outline-none active:outline-none focus:outline-none"
          >
            {/* Wing Controls */}
            <div className="flex justify-end gap-2 mb-4">
              {!isEditing ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsEditing(true);
                    }}
                    className="gap-2"
                  >
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      setIsAddModalOpen(true);
                    }}
                    className="bg-accent hover:bg-accent-hover text-white gap-2"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Fee Head
                  </Button>
                </>
              ) : (
                <>
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
                    <Save className="w-3.5 h-3.5" /> Save Changes
                  </Button>
                </>
              )}
            </div>

            {/* Wing Summary Cards (Optional, maybe for later) */}

            <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
              <Table>
                <TableHeader>
                  <TableHeadRow>
                    <TableHead className="w-[60%]">Fee Head</TableHead>
                    <TableHead className="text-right">Amount (Rs.)</TableHead>
                    {isEditing && (
                      <TableHead className="w-[80px] text-center">
                        Actions
                      </TableHead>
                    )}
                  </TableHeadRow>
                </TableHeader>
                <TableBody>
                  {wingFees.length === 0 ? (
                    <TableRow isClickable={false}>
                      <TableCell
                        colSpan={isEditing ? 3 : 2}
                        className="h-24 text-center text-text-muted"
                      >
                        No fee heads defined for this wing.
                      </TableCell>
                    </TableRow>
                  ) : (
                    wingFees.map((fee) => (
                      <TableRow key={fee.id} isClickable={false}>
                        <TableCell>
                          {isEditing ? (
                            <Input
                              value={fee.name}
                              onChange={(e) =>
                                updateFeeHead(fee.id, "name", e.target.value)
                              }
                              placeholder="e.g. Tuition Fee"
                              className="h-9"
                              autoFocus={fee.name === ""}
                            />
                          ) : (
                            <div>
                              <div className="font-medium text-text-primary">
                                {fee.name}
                              </div>
                              {!fee.wingId && (
                                <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                                  Global
                                </span>
                              )}
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {isEditing ? (
                            <div className="flex justify-end items-center gap-2">
                              <span className="text-muted-foreground text-sm">
                                Rs.
                              </span>
                              <Input
                                type="number"
                                value={fee.amount}
                                onChange={(e) =>
                                  updateFeeHead(
                                    fee.id,
                                    "amount",
                                    Number(e.target.value),
                                  )
                                }
                                className="h-9 w-28 text-right"
                              />
                            </div>
                          ) : (
                            <span className="font-semibold text-text-primary">
                              {fee.amount.toLocaleString()}
                            </span>
                          )}
                        </TableCell>
                        {isEditing && (
                          <TableCell className="text-center">
                            <button
                              onClick={() => removeFeeHead(fee.id)}
                              title="Delete"
                              className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 text-text-muted hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </TableCell>
                        )}
                      </TableRow>
                    ))
                  )}

                  {/* Summary Footer */}
                  {!isEditing && wingFees.length > 0 && (
                    <TableRow
                      className="bg-surface-hover/50 hover:bg-surface-hover/50"
                      isClickable={false}
                    >
                      <TableCell className="font-medium">
                        Total (Monthly)
                      </TableCell>
                      <TableCell className="text-right font-bold text-accent">
                        Rs. {totalMonthly.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <AddFeeHeadModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddFeeHead}
        wingName={currentWing?.name}
      />
    </motion.div>
  );
}
