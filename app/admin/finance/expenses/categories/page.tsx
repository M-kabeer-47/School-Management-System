"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Receipt, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/admin/PageHeader";
import { getExpenseStats, expenseCategories } from "@/lib/admin/mock-data/expenses";
import { cn } from "@/lib/common/utils";

export default function ExpenseCategoriesPage() {
    const stats = getExpenseStats();
    const totalExpenses = stats.totalExpenses;

    // Sort categories by amount (highest first)
    const sortedCategories = [...stats.byCategory].sort(
        (a, b) => b.totalAmount - a.totalAmount
    );

    const getCategoryPercentage = (amount: number) => {
        if (totalExpenses === 0) return 0;
        return Math.round((amount / totalExpenses) * 100);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
        >
            <PageHeader
                title="Expenses by Category"
                subtitle="Category-wise breakdown of all expenses"
            >
                <Link href="/admin/finance/expenses">
                    <Button variant="outline">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Button>
                </Link>
            </PageHeader>

            {/* Total Summary */}
            <div className="bg-background rounded-2xl border border-border p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-text-muted font-medium">
                            Total Approved Expenses
                        </p>
                        <p className="text-3xl font-bold text-text-primary mt-1">
                            Rs. {totalExpenses.toLocaleString()}
                        </p>
                        <p className="text-sm text-text-muted mt-1">
                            Across {expenseCategories.length} categories
                        </p>
                    </div>
                    <div className="p-4 bg-accent/10 rounded-2xl">
                        <TrendingUp className="w-8 h-8 text-accent" />
                    </div>
                </div>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sortedCategories.map((category, index) => {
                    const percentage = getCategoryPercentage(category.totalAmount);
                    const hasExpenses = category.totalAmount > 0;

                    return (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={cn(
                                "bg-background rounded-2xl border border-border p-5 shadow-sm",
                                hasExpenses && "hover:border-accent/50 transition-colors"
                            )}
                        >
                            <div className="flex items-start gap-4">
                                <div
                                    className={cn(
                                        "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                                        category.color
                                    )}
                                >
                                    <Receipt className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <h3 className="font-semibold text-text-primary">
                                                {category.name}
                                            </h3>
                                            <p className="text-xs text-text-muted mt-0.5">
                                                {category.description}
                                            </p>
                                        </div>
                                        {hasExpenses && (
                                            <span className="text-sm font-semibold text-accent shrink-0">
                                                {percentage}%
                                            </span>
                                        )}
                                    </div>

                                    <div className="mt-4">
                                        <div className="flex items-center justify-between text-sm mb-2">
                                            <span className="text-text-muted">
                                                {category.count} transaction{category.count !== 1 ? "s" : ""}
                                            </span>
                                            <span className="font-semibold text-text-primary">
                                                Rs. {category.totalAmount.toLocaleString()}
                                            </span>
                                        </div>

                                        {/* Progress bar */}
                                        <div className="h-2 bg-border rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${percentage}%` }}
                                                transition={{ delay: 0.2 + index * 0.05, duration: 0.5 }}
                                                className={cn("h-full rounded-full", category.color)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Categories with no expenses info */}
            {sortedCategories.filter((c) => c.count === 0).length > 0 && (
                <div className="text-center py-4">
                    <p className="text-sm text-text-muted">
                        {sortedCategories.filter((c) => c.count === 0).length} categories have
                        no recorded expenses
                    </p>
                </div>
            )}
        </motion.div>
    );
}
