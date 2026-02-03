"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Percent, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/admin/PageHeader";
import Modal from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/Select";
import { salaryComponents } from "@/lib/admin/mock-data/salary";
import { SalaryComponent } from "@/lib/admin/types/salary";
import { cn } from "@/lib/common/utils";

export default function SalaryStructurePage() {
    const [components, setComponents] = useState<SalaryComponent[]>(salaryComponents);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingComponent, setEditingComponent] = useState<SalaryComponent | null>(null);
    const [newComponent, setNewComponent] = useState({
        name: "",
        type: "allowance" as "allowance" | "deduction",
        value: "",
        isPercentage: false,
        description: "",
    });

    const allowances = components.filter(c => c.type === "allowance");
    const deductions = components.filter(c => c.type === "deduction");

    const openAddModal = () => {
        setEditingComponent(null);
        setNewComponent({
            name: "",
            type: "allowance",
            value: "",
            isPercentage: false,
            description: "",
        });
        setIsModalOpen(true);
    };

    const openEditModal = (component: SalaryComponent) => {
        setEditingComponent(component);
        setNewComponent({
            name: component.name,
            type: component.type,
            value: component.value.toString(),
            isPercentage: component.isPercentage,
            description: component.description || "",
        });
        setIsModalOpen(true);
    };

    const handleSave = () => {
        if (!newComponent.name || !newComponent.value) return;

        if (editingComponent) {
            setComponents(prev =>
                prev.map(c =>
                    c.id === editingComponent.id
                        ? {
                            ...c,
                            name: newComponent.name,
                            type: newComponent.type,
                            value: parseFloat(newComponent.value),
                            isPercentage: newComponent.isPercentage,
                            description: newComponent.description,
                        }
                        : c
                )
            );
        } else {
            const newComp: SalaryComponent = {
                id: `comp-${Date.now()}`,
                name: newComponent.name,
                type: newComponent.type,
                value: parseFloat(newComponent.value),
                isPercentage: newComponent.isPercentage,
                description: newComponent.description,
            };
            setComponents(prev => [...prev, newComp]);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id: string) => {
        setComponents(prev => prev.filter(c => c.id !== id));
    };

    const ComponentCard = ({ component }: { component: SalaryComponent }) => (
        <div className="flex items-center justify-between p-4 bg-surface border border-border rounded-xl hover:border-accent/30 transition-colors">
            <div className="flex items-center gap-3">
                <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    component.type === "allowance"
                        ? "bg-green-100 dark:bg-green-900/30"
                        : "bg-red-100 dark:bg-red-900/30"
                )}>
                    {component.isPercentage ? (
                        <Percent className={cn(
                            "w-5 h-5",
                            component.type === "allowance"
                                ? "text-green-600 dark:text-green-400"
                                : "text-red-600 dark:text-red-400"
                        )} />
                    ) : (
                        <DollarSign className={cn(
                            "w-5 h-5",
                            component.type === "allowance"
                                ? "text-green-600 dark:text-green-400"
                                : "text-red-600 dark:text-red-400"
                        )} />
                    )}
                </div>
                <div>
                    <p className="font-medium text-text-primary">{component.name}</p>
                    <p className="text-sm text-text-muted">
                        {component.isPercentage
                            ? `${component.value}% of base salary`
                            : `Rs. ${component.value.toLocaleString()} fixed`}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditModal(component)}
                >
                    <Pencil className="w-4 h-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    onClick={() => handleDelete(component.id)}
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
        >
            <PageHeader
                title="Salary Structure"
                subtitle="Manage salary allowances and deductions"
            >
                <Button onClick={openAddModal}>
                    <Plus className="w-4 h-4" />
                    Add Component
                </Button>
            </PageHeader>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Allowances */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                            Allowances
                        </h3>
                        <span className="text-sm text-text-muted">
                            {allowances.length} items
                        </span>
                    </div>
                    <div className="space-y-3">
                        {allowances.length === 0 ? (
                            <div className="p-8 text-center bg-surface border border-border rounded-xl">
                                <p className="text-text-muted">No allowances configured</p>
                            </div>
                        ) : (
                            allowances.map(component => (
                                <ComponentCard key={component.id} component={component} />
                            ))
                        )}
                    </div>
                </div>

                {/* Deductions */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            Deductions
                        </h3>
                        <span className="text-sm text-text-muted">
                            {deductions.length} items
                        </span>
                    </div>
                    <div className="space-y-3">
                        {deductions.length === 0 ? (
                            <div className="p-8 text-center bg-surface border border-border rounded-xl">
                                <p className="text-text-muted">No deductions configured</p>
                            </div>
                        ) : (
                            deductions.map(component => (
                                <ComponentCard key={component.id} component={component} />
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Add/Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingComponent ? "Edit Component" : "Add Component"}
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                            Component Name
                        </label>
                        <Input
                            placeholder="e.g., House Rent Allowance"
                            value={newComponent.name}
                            onChange={(e) =>
                                setNewComponent(prev => ({ ...prev, name: e.target.value }))
                            }
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                            Type
                        </label>
                        <Select
                            value={newComponent.type}
                            onValueChange={(value: "allowance" | "deduction") =>
                                setNewComponent(prev => ({ ...prev, type: value }))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="allowance">Allowance (+)</SelectItem>
                                <SelectItem value="deduction">Deduction (-)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-2">
                                Value
                            </label>
                            <Input
                                type="number"
                                placeholder="Amount or %"
                                value={newComponent.value}
                                onChange={(e) =>
                                    setNewComponent(prev => ({ ...prev, value: e.target.value }))
                                }
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-2">
                                Value Type
                            </label>
                            <Select
                                value={newComponent.isPercentage ? "percentage" : "fixed"}
                                onValueChange={(value) =>
                                    setNewComponent(prev => ({
                                        ...prev,
                                        isPercentage: value === "percentage",
                                    }))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="fixed">Fixed Amount (Rs.)</SelectItem>
                                    <SelectItem value="percentage">Percentage (%)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                            Description (Optional)
                        </label>
                        <Input
                            placeholder="Brief description..."
                            value={newComponent.description}
                            onChange={(e) =>
                                setNewComponent(prev => ({ ...prev, description: e.target.value }))
                            }
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSave}>
                            {editingComponent ? "Save Changes" : "Add Component"}
                        </Button>
                    </div>
                </div>
            </Modal>
        </motion.div>
    );
}
