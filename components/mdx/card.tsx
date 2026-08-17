import type { ReactNode } from "react";
import Link from "next/link";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { cn } from "@/lib/utils";

export function Cards({
  className,
  ...props
}: React.ComponentProps<typeof ItemGroup>) {
  return (
    <ItemGroup
      className={cn("my-6 grid gap-3 sm:grid-cols-2", className)}
      {...props}
    />
  );
}

type CardProps = {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  href?: string;
  children?: ReactNode;
};

function isExternal(href: string): boolean {
  return !href.startsWith("/");
}

export function Card({ title, description, icon, href, children }: CardProps) {
  const body = (
    <>
      {icon ? <ItemMedia variant="icon">{icon}</ItemMedia> : null}
      <ItemContent>
        <ItemTitle>{title}</ItemTitle>
        {description ? <ItemDescription>{description}</ItemDescription> : null}
        {children}
      </ItemContent>
    </>
  );

  if (!href) {
    return (
      <Item variant="outline" className="h-full">
        {body}
      </Item>
    );
  }

  return (
    <Item
      variant="outline"
      className="h-full"
      render={isExternal(href) ? <a href={href} /> : <Link href={href} />}
    >
      {body}
    </Item>
  );
}
