"use client";

import { motion } from "framer-motion";
import { Download, TrendingUp, Users, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/admin/PageHeader";
import { ClassCollectionTable } from "@/components/admin/finance";
import { classFeeCollection } from "@/lib/admin/mock-data/finance";

export default function ClassCollectionPage() {
    const totals = classFeeCollection.reduce(
        (acc, c) => ({
            students: acc.students + c.totalStudents,
            collectable: acc.collectable + c.totalCollectable,
            collected: acc.collected + c.totalCollected,
            pending: acc.pending + c.totalPending,
            defaulters: acc.defaulters + c.defaultersCount,
        }),
        { students: 0, collectable: 0, collected: 0, pending: 0, defaulters: 0 }
    );

    const overallPercentage = Math.round((totals.collected / totals.collectable) * 100);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            {/* Page Header */}
            <PageHeader
                title="Class Collection Report"
                subtitle="Class-wise fee collection summary"
            >
                <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                    Export Report
                </Button>
            </PageHeader>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-background rounded-2xl border border-border p-5">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-blue-50">
                            <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-text-muted">Total Students</p>
                            <p className="text-2xl font-bold text-text-primary">{totals.students}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-background rounded-2xl border border-border p-5">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-green-50">
                            <TrendingUp className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-text-muted">Total Collected</p>
                            <p className="text-2xl font-bold text-green-600">
                                Rs. {(totals.collected / 1000).toFixed(0)}K
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-background rounded-2xl border border-border p-5">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-orange-50">
                            <BarChart3 className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                            <p className="text-sm text-text-muted">Pending Amount</p>
                            <p className="text-2xl font-bold text-orange-600">
                                Rs. {(totals.pending / 1000).toFixed(0)}K
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-background rounded-2xl border border-border p-5">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-purple-50">
                            <TrendingUp className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-text-muted">Collection Rate</p>
                            <p className="text-2xl font-bold text-purple-600">{overallPercentage}%</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Collection Table */}
            <ClassCollectionTable
                collections={classFeeCollection}
                totals={totals}
                overallPercentage={overallPercentage}
            />
        </motion.div>
    );
}
