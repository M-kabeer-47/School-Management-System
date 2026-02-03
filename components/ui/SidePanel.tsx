"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/common/utils";
import { createPortal } from "react-dom";
import { motion, useDragControls, useMotionValue } from "framer-motion";

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const SidePanel = ({
  isOpen,
  onClose,
  title,
  children,
  className,
}: SidePanelProps) => {
  const x = useMotionValue(0);
  const controls = useDragControls();
  const panelRef = useRef<HTMLDivElement>(null);

  // Variants for clean open/close animations
  const backdropVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

  const panelVariants = {
    open: { x: 0 },
    closed: { x: 480 }, // Safe value larger than max-w-md (448px/28rem)
  };

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Optional: Reset x on close (helps with edge cases)
  useEffect(() => {
    if (!isOpen) {
      x.set(0);
    }
  }, [isOpen, x]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <motion.div
      // Backdrop
      variants={backdropVariants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className={cn(
        "fixed inset-0 z-50 bg-black/30 backdrop-blur-sm",
        !isOpen && "pointer-events-none",
      )}
    >
      <motion.div
        ref={panelRef}
        variants={panelVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        transition={{
          type: "tween",
          duration: 0.35,
          ease: [0.32, 0.72, 0, 1], // Snappy, modern curve
        }}
        style={{ x }}
        drag="x"
        dragControls={controls}
        dragListener={isOpen} // Disable drag when closed
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={{ right: 0.35 }} // Gentle elastic on right (drag to close)
        onDragEnd={(_, { offset, velocity }) => {
          // Close if dragged enough to right or fast velocity
          if (offset.x > 120 || velocity.x > 500) {
            onClose();
          }
          // No else needed — animate prop will snap back to x:0 automatically!
        }}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "absolute right-0 top-0 h-full w-full max-w-md bg-background shadow-2xl",
          "flex flex-col border-l border-border",
          className,
        )}
      >
        {/* Header with drag handle */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b bg-surface/80 backdrop-blur-sm cursor-grab active:cursor-grabbing touch-none select-none"
          onPointerDown={(e) => isOpen && controls.start(e)}
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-1.5 rounded-full bg-muted hidden sm:block" />
            <h2 className="text-lg font-semibold text-text-primary">
              {title || "Details"}
            </h2>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="p-2 rounded-lg hover:bg-muted/70 transition-colors"
            aria-label="Close panel"
          >
            <X className="h-5 w-5 text-text-secondary hover:text-text-primary" />
          </button>
        </div>

        {/* Content - only render when open to avoid unnecessary renders */}
        {isOpen && (
          <div className="flex-1 overflow-y-auto p-5 md:p-6 scrollbar-thin scrollbar-thumb-border hover:scrollbar-thumb-text-muted">
            {children}
          </div>
        )}
      </motion.div>
    </motion.div>,
    document.body,
  );
};
