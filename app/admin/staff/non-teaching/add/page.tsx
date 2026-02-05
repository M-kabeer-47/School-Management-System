"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import StaffForm from "@/components/admin/staff/add/StaffForm";

export default function AddNonTeachingStaffPage() {
    const router = useRouter();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto space-y-6 pb-10"
        >
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    className="w-10 h-10 p-0 rounded-full hover:bg-accent/10"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="w-5 h-5 text-text-secondary" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold text-text-primary font-heading">
                        Add Non-Teaching Staff
                    </h1>
                    <p className="text-text-secondary">
                        Enter staff details to create a new employee profile.
                    </p>
                </div>
            </div>

            <StaffForm staffType="non-teaching" />
        </motion.div>
    );
}
