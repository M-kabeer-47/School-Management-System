"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Edit3, Save, X, MapPin, Building, Map, Phone } from "lucide-react";
import { Input } from "@/components/ui/Input";

interface AddressData {
    address: string;
    city: string;
    state: string;
}

interface AddressCardProps {
    address: AddressData;
    emergencyContact?: string;
    onSave?: (address: AddressData, emergencyContact?: string) => void;
}

export const AddressCard = ({
    address,
    emergencyContact,
    onSave,
}: AddressCardProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<AddressData>(address);
    const [emergency, setEmergency] = useState(emergencyContact || "");

    const handleChange = (field: keyof AddressData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        onSave?.(formData, emergency);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData(address);
        setEmergency(emergencyContact || "");
        setIsEditing(false);
    };

    const InfoRow = ({
        icon: Icon,
        label,
        value,
        field,
        isEmergency = false,
    }: {
        icon: React.ElementType;
        label: string;
        value: string;
        field?: keyof AddressData;
        isEmergency?: boolean;
    }) => (
        <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-surface-active flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon className="w-4 h-4 text-text-muted" />
            </div>
            <div className="flex-1 min-w-0">
                {isEditing ? (
                    <Input
                        label={label}
                        value={isEmergency ? emergency : formData[field!] || ""}
                        onChange={(e) =>
                            isEmergency
                                ? setEmergency(e.target.value)
                                : handleChange(field!, e.target.value)
                        }
                    />
                ) : (
                    <>
                        <p className="text-xs text-text-muted mb-0.5">{label}</p>
                        <p className="text-sm text-text-primary font-medium">{value || "—"}</p>
                    </>
                )}
            </div>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-background rounded-2xl border border-border shadow-sm overflow-hidden"
        >
            {/* Header */}
            <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-surface/50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-surface-active flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-text-secondary" />
                    </div>
                    <h3 className="font-semibold text-text-primary font-heading">
                        Address & Contact
                    </h3>
                </div>

                {isEditing ? (
                    <div className="flex gap-2">
                        <button
                            onClick={handleCancel}
                            className="p-2 rounded-lg hover:bg-surface-hover text-text-muted hover:text-error transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleSave}
                            className="p-2 rounded-lg bg-accent text-white hover:bg-accent-hover transition-colors"
                        >
                            <Save className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="p-2 rounded-lg hover:bg-surface-hover text-text-muted hover:text-accent transition-colors"
                    >
                        <Edit3 className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <InfoRow
                            icon={MapPin}
                            label="Address"
                            value={address.address}
                            field="address"
                        />
                    </div>
                    <InfoRow icon={Building} label="City" value={address.city} field="city" />
                    <InfoRow icon={Map} label="State / Province" value={address.state} field="state" />
                    <div className="md:col-span-2">
                        <InfoRow
                            icon={Phone}
                            label="Emergency Contact"
                            value={emergencyContact || ""}
                            isEmergency
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
