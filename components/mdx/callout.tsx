import type { ReactNode } from "react";
import {
  CircleAlertIcon,
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { cn } from "@/lib/utils";

const VARIANTS = {
  info: { icon: InfoIcon, className: "text-blue-600 dark:text-blue-400" },
  success: {
    icon: CircleCheckIcon,
    className: "text-emerald-600 dark:text-emerald-400",
  },
  warning: {
    icon: TriangleAlertIcon,
    className: "text-amber-600 dark:text-amber-400",
  },
  error: { icon: CircleAlertIcon, className: "text-destructive" },
} as const;

type CalloutProps = {
  title?: ReactNode;
  type?: keyof typeof VARIANTS;
  icon?: ReactNode;
  children?: ReactNode;
};

export function Callout({
  title,
  type = "info",
  icon,
  children,
}: CalloutProps) {
  const variant = VARIANTS[type] ?? VARIANTS.info;
  const Icon = variant.icon;

  return (
    <Item variant="muted" className="my-6 items-start">
      <ItemMedia variant="icon" className={cn("mt-0.5", variant.className)}>
        {icon ?? <Icon aria-hidden="true" />}
      </ItemMedia>
      <ItemContent className="[&>p]:text-sm [&>p]:text-muted-foreground [&>p+p]:mt-2">
        {title ? <ItemTitle>{title}</ItemTitle> : null}
        {children}
      </ItemContent>
    </Item>
  );
}
