"use client";

import * as React from "react";
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";

import { cn } from "@/lib/student/utils";

type TabsVariant = "default" | "underline";

function Tabs({ className, ...props }: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      className={cn(
        "flex flex-col gap-2 data-[orientation=vertical]:flex-row",
        className,
      )}
      data-slot="tabs"
      {...props}
    />
  );
}

function TabsList({
  variant = "default",
  className,
  children,
  ...props
}: TabsPrimitive.List.Props & {
  variant?: TabsVariant;
}) {
  const listRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const updateIndicatorPosition = () => {
      const activeTab = list.querySelector(
        "[data-selected], [data-active]",
      ) as HTMLElement;
      if (activeTab) {
        list.style.setProperty(
          "--active-tab-left",
          `${activeTab.offsetLeft}px`,
        );
        list.style.setProperty(
          "--active-tab-width",
          `${activeTab.offsetWidth}px`,
        );
        list.style.setProperty(
          "--active-tab-height",
          `${activeTab.offsetHeight}px`,
        );
        list.style.setProperty("--active-tab-top", `${activeTab.offsetTop}px`);
        list.style.setProperty("--active-tab-bottom", "0px");
      }
    };

    // Initial update
    updateIndicatorPosition();

    // Watch for attribute changes
    const observer = new MutationObserver(updateIndicatorPosition);
    observer.observe(list, {
      subtree: true,
      attributes: true,
      attributeFilter: ["data-selected", "data-active", "data-state"],
    });

    // Handle resize
    const resizeObserver = new ResizeObserver(updateIndicatorPosition);
    resizeObserver.observe(list);

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, [children]);

  return (
    <TabsPrimitive.List
      ref={listRef}
      className={cn(
        "relative z-0 flex w-fit items-center justify-center gap-x-0.5 text-text-secondary",
        "data-[orientation=vertical]:flex-col",
        variant === "default"
          ? "rounded-2xl bg-surface border border-border p-1.5 shadow-sm h-14"
          : "data-[orientation=vertical]:px-1 data-[orientation=horizontal]:py-1 *:data-[slot=tabs-tab]:hover:bg-accent",
        className,
      )}
      data-slot="tabs-list"
      {...props}
    >
      {children}
      <TabsPrimitive.Indicator
        className={cn(
          "absolute top-1/2 left-0 transition-[width,transform] duration-300 ease-out",
          variant === "underline"
            ? "data-[orientation=vertical]:-translate-x-px z-10 bg-accent data-[orientation=horizontal]:h-0.5 data-[orientation=vertical]:w-0.5 data-[orientation=horizontal]:translate-y-px"
            : "-z-1 rounded-xl bg-accent-gradient shadow-md",
        )}
        style={{
          width: "var(--active-tab-width)",
          height: "var(--active-tab-height)",
          transform: "translateX(var(--active-tab-left)) translateY(-50%)",
        }}
        data-slot="tab-indicator"
      />
    </TabsPrimitive.List>
  );
}

function TabsTab({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      className={cn(
        "[&_svg]:-mx-0.5 relative flex h-auto shrink-0 grow cursor-pointer items-center justify-center gap-2.5 whitespace-nowrap rounded-xl border border-transparent px-6 py-3 font-semibold text-sm outline-none transition-[color,background-color,box-shadow]",
        "text-text-secondary hover:text-text-primary",
        "focus-visible:ring-2 focus-visible:ring-ring",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        "data-[orientation=vertical]:w-full data-[orientation=vertical]:justify-start",
        "data-active:text-white data-[selected]:text-white",
        "[&_svg:not([class*='size-'])]:size-5 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      data-slot="tabs-tab"
      {...props}
    />
  );
}

function TabsPanel({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      className={cn("flex-1 outline-none mt-6", className)}
      data-slot="tabs-content"
      {...props}
    />
  );
}

export {
  Tabs,
  TabsList,
  TabsTab,
  TabsTab as TabsTrigger,
  TabsPanel,
  TabsPanel as TabsContent,
};
