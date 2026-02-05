"use client";

import { cn } from "@/lib/common/utils";
import type { AdmitCardTemplateProps } from "@/lib/admin/types/admit-card";
import { StandardTemplate } from "./StandardTemplate";
import { CompactTemplate } from "./CompactTemplate";
import { DetailedTemplate } from "./DetailedTemplate";

export function AdmitCardTemplate({
  data,
  variant,
  className,
}: AdmitCardTemplateProps) {
  return (
    <div className={cn("admit-card-template", className)}>
      {variant === "standard" && <StandardTemplate data={data} />}
      {variant === "compact" && <CompactTemplate data={data} />}
      {variant === "detailed" && <DetailedTemplate data={data} />}
    </div>
  );
}
