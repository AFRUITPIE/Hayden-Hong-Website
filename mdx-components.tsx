import type { MDXComponents } from "mdx/types";
import type { AnchorHTMLAttributes } from "react";
import Link from "next/link";
import { Card, Cards } from "@/components/mdx/card";
import { Callout } from "@/components/mdx/callout";
import { Step, Steps } from "@/components/mdx/steps";
import { Mermaid } from "@/components/mdx/mermaid";
import { cn } from "@/lib/utils";

/** Headings get an ID from `rehype-slug`, which doubles as the anchor target. */
function heading(level: 1 | 2 | 3 | 4, className: string) {
  const Tag = `h${level}` as const;

  return function Heading({
    className: extra,
    children,
    id,
    ...props
  }: React.ComponentProps<"h2">) {
    return (
      <Tag
        id={id}
        className={cn("group scroll-mt-24", className, extra)}
        {...props}
      >
        {children}
        {id ? (
          <a
            href={`#${id}`}
            aria-label="Link to this section"
            className="ml-2 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
          >
            #
          </a>
        ) : null}
      </Tag>
    );
  };
}

function Anchor({
  href = "",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const className =
    "font-medium underline underline-offset-4 hover:text-primary";

  if (href.startsWith("/")) {
    return <Link href={href} className={className} {...props} />;
  }

  return <a href={href} className={className} {...props} />;
}

export function useMDXComponents(
  components: MDXComponents = {},
): MDXComponents {
  return {
    h1: heading(
      1,
      "mt-10 mb-4 text-3xl font-semibold tracking-tight first:mt-0",
    ),
    h2: heading(
      2,
      "mt-10 mb-4 text-2xl font-semibold tracking-tight first:mt-0",
    ),
    h3: heading(3, "mt-8 mb-3 text-xl font-semibold tracking-tight"),
    h4: heading(4, "mt-6 mb-2 text-lg font-medium tracking-tight"),
    p: ({ className, ...props }) => (
      <p className={cn("my-4 leading-7", className)} {...props} />
    ),
    ul: ({ className, ...props }) => (
      <ul
        className={cn("my-4 ml-6 list-disc space-y-2", className)}
        {...props}
      />
    ),
    ol: ({ className, ...props }) => (
      <ol
        className={cn("my-4 ml-6 list-decimal space-y-2", className)}
        {...props}
      />
    ),
    li: ({ className, ...props }) => (
      <li className={cn("leading-7", className)} {...props} />
    ),
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={cn(
          "my-6 border-l-2 pl-6 text-muted-foreground italic",
          className,
        )}
        {...props}
      />
    ),
    hr: ({ className, ...props }) => (
      <hr className={cn("my-8 border-border", className)} {...props} />
    ),
    a: Anchor,
    code: ({ className, ...props }) => (
      <code
        className={cn(
          // Styling only applies to inline code; highlighted blocks opt out.
          "rounded bg-muted px-1.5 py-0.5 font-mono text-[0.875em] [pre_&]:bg-transparent [pre_&]:p-0",
          className,
        )}
        {...props}
      />
    ),
    pre: ({ className, ...props }) => (
      <pre
        className={cn(
          "my-6 overflow-x-auto rounded-lg border bg-muted/50 p-4 text-sm leading-relaxed",
          className,
        )}
        {...props}
      />
    ),
    table: ({ className, ...props }) => (
      <div className="my-6 w-full overflow-x-auto">
        <table className={cn("w-full text-sm", className)} {...props} />
      </div>
    ),
    th: ({ className, ...props }) => (
      <th
        className={cn("border-b px-3 py-2 text-left font-medium", className)}
        {...props}
      />
    ),
    td: ({ className, ...props }) => (
      <td className={cn("border-b px-3 py-2", className)} {...props} />
    ),
    Cards,
    Card,
    Callout,
    Steps,
    Step,
    Mermaid,
    ...components,
  };
}
