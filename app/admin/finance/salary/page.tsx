"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    Users,
    Wallet,
    Clock,
    CheckCircle2,
    ChevronRight,
    Plus,
    History,
    CreditCard,
    Settings,
    FileText,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getSalaryStats, getRecentPayments } from "@/lib/admin/mock-data/salary";
import { cn } from "@/lib/common/utils";

export default function SalaryManagementPage() {
    const stats = getSalaryStats();
    const recentPayments = getRecentPayments(5);

    const statCards = [
        {
            title: "Monthly Budget",
            value: `Rs. ${stats.totalBudget.toLocaleString()}`,
            subtext: "Total salary budget",
            icon: Wallet,
            color: "text-blue-600 dark:text-blue-400",
            bgColor: "bg-blue-50 dark:bg-blue-900/30",
        },
        {
            title: "Paid This Month",
            value: `Rs. ${stats.paidThisMonth.toLocaleString()}`,
            subtext: `${stats.paidStaff} staff members`,
            icon: CheckCircle2,
            color: "text-green-600 dark:text-green-400",
            bgColor: "bg-green-50 dark:bg-green-900/30",
        },
        {
            title: "Pending Amount",
            value: `Rs. ${stats.pendingAmount.toLocaleString()}`,
            subtext: `${stats.pendingStaff} pending`,
            icon: Clock,
            color: "text-orange-600 dark:text-orange-400",
            bgColor: "bg-orange-50 dark:bg-orange-900/30",
        },
        {
            title: "Total Staff",
            value: stats.totalStaff.toString(),
            subtext: "Active employees",
            icon: Users,
            color: "text-purple-600 dark:text-purple-400",
            bgColor: "bg-purple-50 dark:bg-purple-900/30",
        },
    ];

    const quickActions = [
        {
            title: "Staff Salaries",
            description: "View and manage staff salary details",
            href: "/admin/finance/salary/staff-salaries",
            icon: Users,
            color: "bg-blue-500",
        },
        {
            title: "Process Salary",
            description: "Process monthly salary payments",
            href: "/admin/finance/salary/process",
            icon: CreditCard,
            color: "bg-green-500",
        },
        {
            title: "Payment History",
            description: "View past salary payments",
            href: "/admin/finance/salary/history",
            icon: History,
            color: "bg-purple-500",
        },
        {
            title: "Salary Structure",
            description: "Manage allowances & deductions",
            href: "/admin/finance/salary/structure",
            icon: Settings,
            color: "bg-orange-500",
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary font-heading">
                        Salary Management
                    </h1>
                    <p className="text-text-secondary text-sm">
                        Manage staff salaries and payments
                    </p>
                </div>
                <Link href="/admin/finance/salary/process">
                    <Button>
                        <Plus className="w-4 h-4" />
                        Process Salary
                    </Button>
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card, idx) => (
                    <motion.div
                        key={card.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-surface border border-border rounded-2xl p-6"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-text-secondary font-medium">
                                    {card.title}
                                </p>
                                <p className="text-2xl font-bold text-text-primary mt-1">
                                    {card.value}
                                </p>
                                <p className="text-xs text-text-muted mt-1">
                                    {card.subtext}
                                </p>
                            </div>
                            <div className={cn("p-3 rounded-xl", card.bgColor)}>
                                <card.icon className={cn("w-6 h-6", card.color)} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-lg font-semibold text-text-primary mb-4">
                    Quick Actions
                </h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {quickActions.map((action, idx) => (
                        <Link key={action.title} href={action.href}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + idx * 0.05 }}
                                className="group relative bg-surface border border-border rounded-2xl p-5 hover:border-accent/50 hover:shadow-lg transition-all cursor-pointer overflow-hidden"
                            >
                                {/* Background gradient on hover */}
                                <div className={cn(
                                    "absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity",
                                    action.color
                                )} />

                                <div className="relative flex flex-col gap-3">
                                    <div
                                        className={cn(
                                            "w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg",
                                            action.color
                                        )}
                                    >
                                        <action.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-text-primary group-hover:text-accent transition-colors text-base">
                                            {action.title}
                                        </h3>
                                        <p className="text-sm text-text-muted mt-1">
                                            {action.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Arrow indicator */}
                                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-hover flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5">
                                    <ChevronRight className="w-4 h-4 text-accent" />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Recent Payments */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-text-primary">
                        Recent Payments
                    </h2>
                    <Link href="/admin/finance/salary/history">
                        <Button variant="ghost" size="sm">
                            View All
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>
                <div className="bg-surface border border-border rounded-xl overflow-hidden">
                    {recentPayments.length === 0 ? (
                        <div className="p-8 text-center">
                            <FileText className="w-12 h-12 text-text-muted mx-auto mb-3" />
                            <p className="text-text-secondary">No recent payments</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-border">
                            {recentPayments.map((payment) => (
                                <div
                                    key={payment.id}
                                    className="p-4 flex items-center justify-between hover:bg-surface-hover transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-semibold">
                                            {payment.staffName.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-medium text-text-primary">
                                                {payment.staffName}
                                            </p>
                                            <p className="text-sm text-text-secondary">
                                                {payment.department} • {payment.month}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-text-primary">
                                            Rs. {payment.netSalary.toLocaleString()}
                                        </p>
                                        <p className="text-xs text-green-600 dark:text-green-400">
                                            Paid on {new Date(payment.paidDate!).toLocaleDateString('en-GB')}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
