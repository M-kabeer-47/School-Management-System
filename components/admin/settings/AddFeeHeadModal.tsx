import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface AddFeeHeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: { name: string; amount: number }) => void;
  wingName?: string;
}

export function AddFeeHeadModal({
  isOpen,
  onClose,
  onAdd,
  wingName,
}: AddFeeHeadModalProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setName("");
      setAmount("");
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount) return;

    onAdd({
      name,
      amount: Number(amount),
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Fee Head"
      description={`Add a new fee head to the ${wingName || ""} Wing.`}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Input
            id="fee-name"
            label="Fee Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Computer Lab Fee"
            autoFocus
          />
        </div>

        <div className="space-y-2">
          <Input
            id="fee-amount"
            type="number"
            label="Monthly Amount (Rs.)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            min="0"
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!name || !amount}
            className="bg-accent hover:bg-accent-hover text-white gap-2"
          >
            Add Fee
          </Button>
        </div>
      </form>
    </Modal>
  );
}
