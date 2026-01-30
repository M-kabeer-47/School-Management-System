"use client";

import { Button } from "@/components/ui/Button";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function StudentProfileHeader() {
  const router = useRouter();

  return (
    <div className="flex items-center gap-4">
      <Button variant="ghost" size="icon" onClick={() => router.back()}>
        <ArrowLeft className="w-5 h-5" />
      </Button>
      <div>
        <h1 className="text-2xl font-bold text-text-primary font-heading">
          Student Profile
        </h1>
        <p className="text-text-secondary text-sm">
          View and manage student information
        </p>
      </div>
      <div className="ml-auto flex gap-2">
        <Button
          variant="outline"
          className="text-error border-error/20 hover:bg-error/10 hover:text-error"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </Button>
        <Button>
          <Edit className="w-4 h-4 mr-2" />
          Edit Information
        </Button>
      </div>
    </div>
  );
}
