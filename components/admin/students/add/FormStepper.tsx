import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { clsx } from "clsx";
import { LucideIcon } from "lucide-react";

interface Step {
  id: number;
  title: string;
  subtitle: string;
  icon: LucideIcon;
}

interface FormStepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (stepId: number) => void;
}

export default function FormStepper({
  steps,
  currentStep,
  onStepClick,
}: FormStepperProps) {
  return (
    <div className="relative">
      <div className="absolute top-1/2 left-0 w-full h-[2px] -translate-y-1/2 bg-border z-0 rounded-full" />
      <div
        className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2 bg-accent-gradient z-0 rounded-full transition-all duration-500"
        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
      />

      <div className="relative z-10 flex justify-between">
        {steps.map((step) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;

          return (
            <div
              key={step.id}
              className="flex flex-col items-center gap-3 bg-background px-2"
            >
              <motion.button
                onClick={() => step.id < currentStep && onStepClick(step.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={clsx(
                  "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-sm",
                  isActive
                    ? "border-accent bg-background text-accent ring-4 ring-accent/10"
                    : isCompleted
                      ? "border-transparent bg-accent-gradient text-white"
                      : "border-border-strong bg-surface text-text-muted",
                )}
              >
                {isCompleted ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <step.icon className="w-5 h-5" />
                )}
              </motion.button>
              <div className="text-center">
                <p
                  className={clsx(
                    "text-sm font-bold tracking-tight transition-colors",
                    isActive || isCompleted
                      ? "text-text-primary"
                      : "text-text-muted",
                  )}
                >
                  {step.title}
                </p>
                <p className="text-xs text-text-muted hidden sm:block">
                  {step.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
