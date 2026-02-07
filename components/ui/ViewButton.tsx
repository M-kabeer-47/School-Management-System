import { Eye } from "lucide-react";

interface ViewButtonProps {
  onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  label?: string;
}

export function ViewButton({ onClick, label = "View" }: ViewButtonProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-surface-hover text-text-secondary hover:text-accent hover:bg-accent/10 transition-all font-medium text-sm"
    >
      <Eye className="w-4 h-4" />
      {label}
    </button>
  );
}
