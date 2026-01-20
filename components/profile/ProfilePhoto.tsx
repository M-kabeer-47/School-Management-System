"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Camera, User } from "lucide-react";
import { cn } from "@/lib/shadcn/utils";

interface ProfilePhotoProps {
    photoUrl?: string;
    name: string;
    onPhotoChange?: (file: File) => void;
    size?: "sm" | "md" | "lg";
    editable?: boolean;
}

export const ProfilePhoto = ({
    photoUrl,
    name,
    onPhotoChange,
    size = "lg",
    editable = true,
}: ProfilePhotoProps) => {
    const [preview, setPreview] = useState<string | null>(photoUrl || null);
    const [isHovered, setIsHovered] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const sizeClasses = {
        sm: "w-16 h-16",
        md: "w-24 h-24",
        lg: "w-32 h-32 md:w-40 md:h-40",
    };

    const iconSizes = {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-10 h-10 md:w-12 md:h-12",
    };

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            onPhotoChange?.(file);
        }
    };

    const handleClick = () => {
        if (editable) {
            fileInputRef.current?.click();
        }
    };

    return (
        <div className="relative inline-block">
            <motion.div
                className={cn(
                    sizeClasses[size],
                    "relative rounded-full overflow-hidden cursor-pointer",
                    "bg-accent-gradient p-[3px] shadow-lg shadow-accent/20"
                )}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                onClick={handleClick}
                whileHover={editable ? { scale: 1.02 } : {}}
                whileTap={editable ? { scale: 0.98 } : {}}
            >
                <div className="w-full h-full rounded-full bg-surface overflow-hidden flex items-center justify-center">
                    {preview ? (
                        <img
                            src={preview}
                            alt={name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-surface-active flex items-center justify-center">
                            <span className="text-2xl md:text-3xl font-bold text-text-secondary font-heading">
                                {getInitials(name)}
                            </span>
                        </div>
                    )}

                    {/* Hover Overlay */}
                    {editable && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovered ? 1 : 0 }}
                            className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full"
                        >
                            <Camera className="w-6 h-6 md:w-8 md:h-8 text-white" />
                        </motion.div>
                    )}
                </div>
            </motion.div>

            {/* Hidden File Input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />

            {/* Edit Badge */}
            {editable && (
                <div className="absolute bottom-1 right-1 w-8 h-8 md:w-10 md:h-10 rounded-full bg-accent flex items-center justify-center shadow-lg cursor-pointer hover:bg-accent-hover transition-colors">
                    <Camera className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
            )}
        </div>
    );
};
