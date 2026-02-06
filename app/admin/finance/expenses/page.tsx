"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    Receipt,
    Plus,
    ChevronRight,
    Download,
    BookMarked,
    Clock,
    TrendingUp,
    List,
    PieChart,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AddExpenseModal } from "@/components/admin/finance/expenses";
import {
    getExpenseStats,
    getRecentExpenses,
    expenseCategories,
} from "@/lib/admin/mock-data/expenses";
import { cn } from "@/lib/common/utils";
import { GeneralStatusBadge, GeneralStatus } from "@/utils/status-styles";

export default function ExpensesPage() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const stats = getExpenseStats();
    const recentExpenses = getRecentExpenses(5);

    const getGeneralStatus = (status: string): GeneralStatus => {
        if (status === "approved") return "success";
        if (status === "rejected") return "error";
        return "warning"; // pending
    };

    const statCards = [
        {
            title: "Total Expenses",
            value: `Rs. ${stats.totalExpenses.toLocaleString()}`,
            subtext: "All time approved",
            icon: BookMarked,
            color: "text-accent",
            bgColor: "bg-accent/10",
        },
        {
            title: "This Month",
            value: `Rs. ${stats.thisMonthExpenses.toLocaleString()}`,
            subtext: "Current month",
            icon: TrendingUp,
            color: "text-green-600 dark:text-green-400",
            bgColor: "bg-green-50 dark:bg-green-900/30",
        },
        {
            title: "Pending Approval",
            value: stats.pendingApproval.toString(),
            subtext: `Rs. ${stats.pendingAmount.toLocaleString()} pending`,
            icon: Clock,
            color: "text-orange-600 dark:text-orange-400",
            bgColor: "bg-orange-50 dark:bg-orange-900/30",
        },
        {
            title: "Transactions",
            value: stats.totalTransactions.toString(),
            subtext: "Total approved",
            icon: Receipt,
            color: "text-blue-600 dark:text-blue-400",
            bgColor: "bg-blue-50 dark:bg-blue-900/30",
        },
    ];

    const quickActions = [
        {
            title: "All Expenses",
            description: "View and manage all expense records",
            href: "/admin/finance/expenses/all",
            icon: List,
            color: "bg-accent",
        },
        {
            title: "Add Expense",
            description: "Record a new expense entry",
            onClick: () => setIsAddModalOpen(true),
            icon: Plus,
            color: "bg-green-500",
        },
        {
            title: "By Category",
            description: "Category-wise expense breakdown",
            href: "/admin/finance/expenses/categories",
            icon: PieChart,
            color: "bg-purple-500",
        },
    ];

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-text-primary font-heading flex items-center gap-3">
                        Other Expenses
                        <BookMarked className="w-7 h-7 text-accent" />
                    </h1>
                    <p className="text-text-secondary mt-1">
                        Track and manage school operational expenses
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                        Export Report
                    </Button>
                    <Button onClick={() => setIsAddModalOpen(true)}>
                        <Plus className="w-4 h-4" />
                        Add Expense
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat, index) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-background rounded-2xl border border-border p-5 shadow-sm"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-text-muted font-medium">{stat.title}</p>
                                <p className="text-2xl font-bold text-text-primary mt-1">
                                    {stat.value}
                                </p>
                                <p className="text-xs text-text-muted mt-1">{stat.subtext}</p>
                            </div>
                            <div className={cn("p-3 rounded-xl", stat.bgColor)}>
                                <stat.icon className={cn("w-6 h-6", stat.color)} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {quickActions.map((action, index) => {
                        const content = (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + index * 0.05 }}
                                className="bg-background rounded-2xl border border-border p-5 shadow-sm hover:shadow-md hover:border-accent/50 transition-all cursor-pointer group"
                            >
                                <div
                                    className={cn(
                                        "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                                        action.color
                                    )}
                                >
                                    <action.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="font-semibold text-text-primary group-hover:text-accent transition-colors">
                                    {action.title}
                                </h3>
                                <p className="text-sm text-text-muted mt-1">{action.description}</p>
                                <div className="mt-3 flex items-center text-sm text-accent font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                    {action.onClick ? "Add" : "Open"}{" "}
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </div>
                            </motion.div>
                        );

                        if (action.onClick) {
                            return (
                                <div key={action.title} onClick={action.onClick}>
                                    {content}
                                </div>
                            );
                        }

                        return (
                            <Link key={action.title} href={action.href!}>
                                {content}
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Recent Expenses & Categories */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Expenses */}
                <div className="bg-background rounded-2xl border border-border shadow-sm">
                    <div className="p-5 border-b border-border flex items-center justify-between">
                        <h3 className="font-semibold text-text-primary">Recent Expenses</h3>
                        <Link
                            href="/admin/finance/expenses/all"
                            className="text-sm text-accent hover:underline"
                        >
                            View All
                        </Link>
                    </div>
                    <div className="divide-y divide-border">
                        {recentExpenses.map((expense) => (
                            <div
                                key={expense.id}
                                className="p-4 flex items-center justify-between hover:bg-surface/50 transition-colors"
                            >
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-text-primary text-sm truncate">
                                        {expense.description}
                                    </p>
                                    <p className="text-xs text-text-muted mt-0.5">
                                        {expense.category} • {formatDate(expense.date)}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <GeneralStatusBadge
                                        status={getGeneralStatus(expense.status)}
                                        size="sm"
                                    />
                                    <span className="font-semibold text-text-primary text-sm">
                                        Rs. {expense.amount.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Categories */}
                <div className="bg-background rounded-2xl border border-border shadow-sm">
                    <div className="p-5 border-b border-border flex items-center justify-between">
                        <h3 className="font-semibold text-text-primary">Top Categories</h3>
                        <Link
                            href="/admin/finance/expenses/categories"
                            className="text-sm text-accent hover:underline"
                        >
                            View All
                        </Link>
                    </div>
                    <div className="divide-y divide-border">
                        {stats.byCategory
                            .filter((c) => c.totalAmount > 0)
                            .sort((a, b) => b.totalAmount - a.totalAmount)
                            .slice(0, 5)
                            .map((category) => (
                                <div
                                    key={category.id}
                                    className="p-4 flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={cn(
                                                "w-10 h-10 rounded-xl flex items-center justify-center",
                                                category.color
                                            )}
                                        >
                                            <Receipt className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-text-primary text-sm">
                                                {category.name}
                                            </p>
                                            <p className="text-xs text-text-muted">
                                                {category.count} transactions
                                            </p>
                                        </div>
                                    </div>
                                    <span className="font-semibold text-text-primary">
                                        Rs. {category.totalAmount.toLocaleString()}
                                    </span>
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            {/* Add Expense Modal */}
            <AddExpenseModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            />
        </motion.div>
    );
}
