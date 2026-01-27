"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Save, X, MapPin, Building, Map, Phone } from "lucide-react";
import { InfoRow } from "@/components/student/profile/InfoRow";

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

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-background rounded-2xl border border-border shadow-sm overflow-hidden"
        >
            {/* Header */}
            <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-surface/50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent-gradient flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-text-primary font-heading">
                        Address & Emergency
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
                        className="px-3 py-1.5 rounded-lg hover:bg-surface-hover text-text-muted hover:text-accent transition-colors text-sm font-medium"
                    >
                        Edit
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
                            isEditing={isEditing}
                            formValue={formData.address}
                            onChange={(value) => handleChange("address", value)}
                        />
                    </div>
                    <InfoRow
                        icon={Building}
                        label="City"
                        value={address.city}
                        isEditing={isEditing}
                        formValue={formData.city}
                        onChange={(value) => handleChange("city", value)}
                    />
                    <InfoRow
                        icon={Map}
                        label="State / Province"
                        value={address.state}
                        isEditing={isEditing}
                        formValue={formData.state}
                        onChange={(value) => handleChange("state", value)}
                    />
                    <div className="md:col-span-2">
                        <InfoRow
                            icon={Phone}
                            label="Emergency Contact"
                            value={emergencyContact || ""}
                            isEditing={isEditing}
                            formValue={emergency}
                            onChange={setEmergency}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
