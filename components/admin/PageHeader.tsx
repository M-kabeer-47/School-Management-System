"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LucideIcon } from "lucide-react";

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    children?: React.ReactNode;
}

/**
 * Reusable page header component with back button, title, and subtitle.
 * Matches the compact back button pattern used across admin pages.
 */
export function PageHeader({ title, subtitle, children }: PageHeaderProps) {
    const router = useRouter();

    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center w-full sm:w-auto gap-3">
                <Button
                    variant="ghost"
                    className="p-1 min-w-[30px] h-auto w-auto hover:bg-accent/10 text-text-secondary hover:text-text-primary -ml-1 sm:ml-0"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-text-primary font-heading">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-text-secondary text-sm">{subtitle}</p>
                    )}
                </div>
            </div>
            {children && <div className="flex items-center gap-3">{children}</div>}
        </div>
    );
}
