"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    Receipt,
    AlertTriangle,
    Plus,
    ChevronRight,
    Download,
    CircleDollarSign,
    Percent,
    BarChart3,
    Printer,
    CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
    feeDefaulters,
    discountedStudents,
    getFinanceStats,
} from "@/lib/admin/mock-data/finance";
import { cn } from "@/lib/shadcn/utils";

export default function FeeManagementPage() {
    const stats = getFinanceStats();

    const statCards = [
        {
            title: "Total Collected",
            value: `Rs. ${stats.totalCollected.toLocaleString()}`,
            subtext: "This month",
            icon: CircleDollarSign,
            color: "text-green-600 dark:text-green-400",
            bgColor: "bg-green-50 dark:bg-green-900/30",
        },
        {
            title: "Pending Amount",
            value: `Rs. ${stats.totalPending.toLocaleString()}`,
            subtext: "Outstanding dues",
            icon: Receipt,
            color: "text-orange-600 dark:text-orange-400",
            bgColor: "bg-orange-50 dark:bg-orange-900/30",
        },
        {
            title: "Defaulters",
            value: stats.totalDefaulters.toString(),
            subtext: "Students with overdue",
            icon: AlertTriangle,
            color: "text-red-600 dark:text-red-400",
            bgColor: "bg-red-50 dark:bg-red-900/30",
        },
        {
            title: "Discounted",
            value: discountedStudents.length.toString(),
            subtext: "Students with discounts",
            icon: Percent,
            color: "text-blue-600 dark:text-blue-400",
            bgColor: "bg-blue-50 dark:bg-blue-900/30",
        },
    ];

    const quickActions = [
        {
            title: "Fee Collection",
            description: "View students and collect fees",
            href: "/admin/finance/fee-management/collection",
            icon: CreditCard,
            color: "bg-green-500",
        },
        {
            title: "Generate Challan",
            description: "Create new fee challan for student",
            href: "/admin/finance/fee-management/generate-challan",
            icon: Plus,
            color: "bg-accent",
        },
        {
            title: "Print Challans",
            description: "Print single or bulk fee challans",
            href: "/admin/finance/fee-management/print-challan",
            icon: Printer,
            color: "bg-purple-500",
        },
        {
            title: "View Defaulters",
            description: "Students with pending dues",
            href: "/admin/finance/fee-management/defaulters",
            icon: AlertTriangle,
            color: "bg-red-500",
        },
        {
            title: "Discounted Students",
            description: "Students availing fee discount",
            href: "/admin/finance/fee-management/discounted-students",
            icon: Percent,
            color: "bg-blue-500",
        },
        {
            title: "Class Collection",
            description: "Class-wise fee collection report",
            href: "/admin/finance/fee-management/class-collection",
            icon: BarChart3,
            color: "bg-indigo-500",
        },
    ];

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
                        Fee Management
                        <Receipt className="w-7 h-7 text-accent" />
                    </h1>
                    <p className="text-text-secondary mt-1">
                        Manage student fees, challans, and collections
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                        Export Report
                    </Button>
                    <Link href="/admin/finance/fee-management/collection">
                        <Button>
                            <CreditCard className="w-4 h-4" />
                            Collect Fee
                        </Button>
                    </Link>
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
                                <p className="text-2xl font-bold text-text-primary mt-1">{stat.value}</p>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {quickActions.map((action, index) => (
                        <Link key={action.title} href={action.href}>
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
                                    Open <ChevronRight className="w-4 h-4 ml-1" />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Defaulters Alert */}
            {feeDefaulters.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-2xl p-5"
                >
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-lg">
                            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-red-800 dark:text-red-300">
                                {feeDefaulters.length} students have overdue payments
                            </h3>
                            <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                                Total outstanding amount: Rs.{" "}
                                {feeDefaulters.reduce((sum, d) => sum + d.totalDue, 0).toLocaleString()}
                            </p>
                        </div>
                        <Link href="/admin/finance/fee-management/defaulters">
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-red-300 dark:border-red-700 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
                            >
                                Send Reminders
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}
