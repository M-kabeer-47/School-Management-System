"use client";

import * as React from "react";
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";

import { cn } from "@/lib/student/utils";

type TabsVariant = "default" | "underline" | "pills";

const TabsContext = React.createContext<{
  variant: TabsVariant;
  responsive?: boolean;
}>({
  variant: "default",
});

function Tabs({
  className,
  variant = "default",
  responsive = false,
  ...props
}: TabsPrimitive.Root.Props & {
  variant?: TabsVariant;
  responsive?: boolean;
}) {
  return (
    <TabsContext.Provider value={{ variant, responsive }}>
      <TabsPrimitive.Root
        className={cn(
          "flex flex-col gap-2 data-[orientation=vertical]:flex-row",
          className,
        )}
        data-slot="tabs"
        {...props}
      />
    </TabsContext.Provider>
  );
}

function TabsList({
  variant: listVariant,
  className,
  children,
  ...props
}: TabsPrimitive.List.Props & {
  variant?: TabsVariant;
}) {
  const { variant: contextVariant, responsive } = React.useContext(TabsContext);
  const variant = listVariant || contextVariant;
  const listRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (variant === "pills") return;
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
  }, [children, variant]);

  return (
    <TabsPrimitive.List
      ref={listRef}
      className={cn(
        "relative z-0 flex items-center gap-x-0.5 text-text-secondary w-fit max-w-full overflow-x-auto no-scrollbar",
        "data-[orientation=vertical]:flex-col",

        // Default variant
        variant === "default" && [
          !responsive &&
            "rounded-lg bg-surface border border-border p-1 shadow-sm h-12 justify-center",
          responsive &&
            "sm:rounded-lg sm:bg-surface sm:border sm:border-border sm:p-1 sm:shadow-sm sm:h-12 sm:justify-center",
        ],

        // Underline variant
        variant === "underline" && [
          "data-[orientation=vertical]:px-1 data-[orientation=horizontal]:py-1 *:data-[slot=tabs-tab]:hover:bg-accent justify-center",
        ],

        // Pills variant (Static)
        variant === "pills" &&
          "gap-2 overflow-visible border-none bg-transparent p-0 h-auto flex-wrap",

        // Responsive additions (Switch to pills on mobile)
        responsive &&
          variant !== "pills" &&
          "max-sm:gap-2 max-sm:border-none max-sm:bg-transparent max-sm:p-0 max-sm:h-auto max-sm:flex-wrap",

        className,
      )}
      data-slot="tabs-list"
      {...props}
    >
      {children}
      {variant !== "pills" && (
        <TabsPrimitive.Indicator
          className={cn(
            "absolute top-1/2 left-0 transition-[width,transform] duration-300 ease-out",
            responsive && "hidden sm:block",
            variant === "underline"
              ? "data-[orientation=vertical]:-translate-x-px z-10 bg-accent data-[orientation=horizontal]:h-0.5 data-[orientation=vertical]:w-0.5 data-[orientation=horizontal]:translate-y-px"
              : "-z-1 rounded-lg bg-accent-gradient shadow-md",
          )}
          style={{
            width: "var(--active-tab-width)",
            height: "var(--active-tab-height)",
            transform: "translateX(var(--active-tab-left)) translateY(-50%)",
          }}
          data-slot="tab-indicator"
        />
      )}
    </TabsPrimitive.List>
  );
}

function TabsTab({ className, ...props }: TabsPrimitive.Tab.Props) {
  const { variant, responsive } = React.useContext(TabsContext);
  return (
    <TabsPrimitive.Tab
      className={cn(
        "[&_svg]:-mx-0.5 relative flex h-auto shrink-0 grow cursor-pointer items-center justify-center gap-2.5 whitespace-nowrap outline-none transition-all",
        "text-text-secondary hover:text-text-primary",
        "focus-visible:ring-2 focus-visible:ring-ring",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        "data-[orientation=vertical]:w-full data-[orientation=vertical]:justify-start",
        "[&_svg:not([class*='size-'])]:size-5 [&_svg]:pointer-events-none [&_svg]:shrink-0",

        // Default / Underline styling
        (variant === "default" || variant === "underline") && [
          !responsive &&
            "rounded-lg border border-transparent px-5 py-2 font-semibold text-sm h-full",
          !responsive && "data-active:text-white data-[selected]:text-white",
          responsive && [
            "sm:rounded-lg sm:border sm:border-transparent sm:px-5 sm:py-2 sm:font-semibold sm:text-sm sm:h-full",
            "sm:data-active:text-white sm:data-[selected]:text-white",
          ],
        ],

        // Pills styling (Static)
        variant === "pills" && [
          "px-4 py-2 rounded-full text-sm font-medium border border-border bg-surface hover:bg-surface-hover",
          "data-active:bg-accent data-active:text-white data-active:border-accent data-active:shadow-md",
          "data-[selected]:bg-accent data-[selected]:text-white data-[selected]:border-accent data-[selected]:shadow-md",
        ],

        // Responsive Pills (On mobile)
        responsive &&
          variant !== "pills" && [
            "max-sm:px-4 max-sm:py-2 max-sm:rounded-full max-sm:text-sm max-sm:font-medium max-sm:border max-sm:border-border max-sm:bg-surface max-sm:hover:bg-surface-hover",
            "max-sm:data-active:bg-accent max-sm:data-active:text-white max-sm:data-active:border-accent max-sm:data-active:shadow-md",
            "max-sm:data-[selected]:bg-accent max-sm:data-[selected]:text-white max-sm:data-[selected]:border-accent max-sm:data-[selected]:shadow-md",
          ],

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
