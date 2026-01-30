import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/shadcn/utils";

const buttonVariants = cva(
  "flex items-center justify-center gap-2 rounded-md whitespace-nowrap rounded-md sm:text-sm text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 min-w-[120px] p-3",
  {
    variants: {
      variant: {
        default: "bg-accent-gradient text-white shadow hover:bg-accent/90",
        destructive:
          "bg-destructive text-white shadow-sm hover:bg-destructive/90",
        outline: "border bg-secondary/5 text-main-bg hover:bg-secondary/15",
        secondary: "bg-white text-accent shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent-light/20 hover:text-accent-foreground",
        link: "text-primary underline underline-offset-4",
      },
      size: {
        default: "sm:h-9.5 px-4 h-9",
        sm: "h-9",
        lg: "h-[45px]",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
