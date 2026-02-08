import { useState, useEffect } from "react";
import { Save, Zap, BadgePercent } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Switch } from "@/components/ui/Switch";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

interface AddDiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: {
    name: string;
    type: "percentage" | "fixed";
    value: number;
    description: string;
    autoApply: boolean;
  }) => void;
}

export function AddDiscountModal({
  isOpen,
  onClose,
  onAdd,
}: AddDiscountModalProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState<"percentage" | "fixed">("percentage");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [autoApply, setAutoApply] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setName("");
      setType("percentage");
      setValue("");
      setDescription("");
      setAutoApply(false);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !value) return;

    onAdd({
      name,
      type,
      value: Number(value),
      description,
      autoApply,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Discount"
      description="Create a new fee discount or scholarship."
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Input
            id="discount-name"
            label="Discount Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Sibling Discount, Staff Child"
            autoFocus
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="discount-type" className="text-sm font-medium">
              Type
            </label>
            <Select
              value={type}
              onValueChange={(v) => setType(v as "percentage" | "fixed")}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">Percentage (%)</SelectItem>
                <SelectItem value="fixed">Fixed Amount (Rs.)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="discount-value" className="text-sm font-medium">
              {type === "percentage" ? "Percentage" : "Amount"}
            </label>
            <div className="relative">
              <Input
                id="discount-value"
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="0"
                min="0"
                className={type === "percentage" ? "pr-8" : "pl-8"}
              />
              {type === "percentage" ? (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-sm font-medium">
                  %
                </span>
              ) : (
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm font-medium">
                  Rs.
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="discount-desc" className="text-sm font-medium">
            Description
          </label>
          <Input
            id="discount-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief details about who is eligible"
          />
        </div>

        <div className="flex items-center justify-between pt-2 px-1">
          <div className="space-y-0.5">
            <div className="text-sm font-medium text-text-primary flex items-center gap-2">
              <Zap className="w-4 h-4 text-accent" /> Auto-Apply
            </div>
            <div className="text-xs text-text-muted">
              Automatically apply to eligible students.
            </div>
          </div>
          <Switch checked={autoApply} onCheckedChange={setAutoApply} />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!name || !value}
            className="bg-accent hover:bg-accent-hover text-white gap-2"
          >
            <Save className="w-4 h-4" /> Add Discount
          </Button>
        </div>
      </form>
    </Modal>
  );
}
