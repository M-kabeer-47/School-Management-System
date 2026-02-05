"use client";

import { useState, useMemo } from "react";
import { X, Users, Search, Check, UserPlus } from "lucide-react";
import {
    Command,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
} from "@/components/ui/Command";
import { MessageRecipient } from "@/lib/admin/types/messages";
import { sampleStudents, searchStudents } from "@/lib/admin/mock-data/messages";
import { cn } from "@/lib/common/utils";

interface RecipientSelectorProps {
    selectedRecipients: MessageRecipient[];
    onSelectionChange: (recipients: MessageRecipient[]) => void;
    sendToAll: boolean;
    onSendToAllChange: (value: boolean) => void;
}

export function RecipientSelector({
    selectedRecipients,
    onSelectionChange,
    sendToAll,
    onSendToAllChange,
}: RecipientSelectorProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const filteredStudents = useMemo(() => {
        return searchStudents(searchQuery);
    }, [searchQuery]);

    const handleSelectStudent = (student: MessageRecipient) => {
        if (selectedRecipients.some((r) => r.id === student.id)) {
            onSelectionChange(selectedRecipients.filter((r) => r.id !== student.id));
        } else {
            onSelectionChange([...selectedRecipients, student]);
        }
        if (sendToAll) {
            onSendToAllChange(false);
        }
    };

    const handleRemoveRecipient = (studentId: string) => {
        onSelectionChange(selectedRecipients.filter((r) => r.id !== studentId));
    };

    const handleSendToAll = () => {
        onSendToAllChange(true);
        onSelectionChange([]);
        setIsOpen(false);
    };

    const isSelected = (studentId: string) =>
        selectedRecipients.some((r) => r.id === studentId);

    const totalStudents = sampleStudents.length;

    return (
        <div className="space-y-3">
            <label className="text-sm font-medium text-text-secondary block">
                Recipients
            </label>

            {/* Quick Actions */}
            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={handleSendToAll}
                    className={cn(
                        "px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2",
                        sendToAll
                            ? "bg-accent text-white"
                            : "bg-surface border border-border text-text-secondary hover:border-accent/50 hover:text-accent"
                    )}
                >
                    <Users className="w-4 h-4" />
                    All Students ({totalStudents})
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setIsOpen(true);
                        if (sendToAll) onSendToAllChange(false);
                    }}
                    className={cn(
                        "px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2",
                        !sendToAll && selectedRecipients.length > 0
                            ? "bg-accent text-white"
                            : "bg-surface border border-border text-text-secondary hover:border-accent/50 hover:text-accent"
                    )}
                >
                    <UserPlus className="w-4 h-4" />
                    Select Students
                </button>
            </div>

            {/* Selected Recipients Tags */}
            {!sendToAll && selectedRecipients.length > 0 && (
                <div className="flex flex-wrap gap-2 p-3 bg-surface rounded-xl border border-border">
                    {selectedRecipients.map((recipient) => (
                        <span
                            key={recipient.id}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium"
                        >
                            {recipient.name}
                            <span className="text-accent/60 text-xs">
                                ({recipient.class}-{recipient.section})
                            </span>
                            <button
                                type="button"
                                onClick={() => handleRemoveRecipient(recipient.id)}
                                className="ml-1 p-0.5 rounded-full hover:bg-accent/20 transition-colors"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    ))}
                </div>
            )}

            {/* Send to All indicator */}
            {sendToAll && (
                <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm text-green-700 dark:text-green-300">
                        Message will be sent to all {totalStudents} students
                    </span>
                </div>
            )}

            {/* Search Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="relative w-full max-w-lg mx-4">
                        <Command className="border border-border shadow-2xl">
                            <div className="relative">
                                <div className="flex items-center px-4 py-3 border-b border-border">
                                    <Search className="w-4 h-4 text-text-muted mr-2" />
                                    <input
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search by name or class..."
                                        className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none"
                                        autoFocus
                                    />
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-1.5 rounded-lg hover:bg-surface text-text-muted hover:text-text-primary transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <CommandList className="max-h-[300px]">
                                <CommandEmpty>No students found.</CommandEmpty>
                                <CommandGroup heading="Students">
                                    {filteredStudents.map((student) => (
                                        <CommandItem
                                            key={student.id}
                                            onSelect={() => handleSelectStudent(student)}
                                            className="cursor-pointer"
                                        >
                                            <div className="flex items-center justify-between w-full">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent font-medium text-sm">
                                                        {student.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-text-primary">
                                                            {student.name}
                                                        </p>
                                                        <p className="text-xs text-text-muted">
                                                            Class {student.class}-{student.section}
                                                        </p>
                                                    </div>
                                                </div>
                                                {isSelected(student.id) && (
                                                    <Check className="w-4 h-4 text-accent" />
                                                )}
                                            </div>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                            {selectedRecipients.length > 0 && (
                                <div className="p-3 border-t border-border bg-surface/50 flex items-center justify-between">
                                    <span className="text-sm text-text-muted">
                                        {selectedRecipients.length} selected
                                    </span>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="px-4 py-1.5 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-dark transition-colors"
                                    >
                                        Done
                                    </button>
                                </div>
                            )}
                        </Command>
                    </div>
                </div>
            )}
        </div>
    );
}
