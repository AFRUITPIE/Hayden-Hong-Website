import type { TocEntry } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Toc({ entries }: { entries: TocEntry[] }) {
  if (entries.length === 0) return null;

  return (
    <nav
      aria-label="On this page"
      className="sticky top-8 hidden w-56 shrink-0 self-start xl:block"
    >
      <p className="mb-3 text-sm font-medium">On this page</p>
      <ul className="space-y-2 text-sm">
        {entries.map((entry) => (
          <li key={entry.url}>
            <a
              href={entry.url}
              className={cn(
                "block text-muted-foreground transition-colors hover:text-foreground",
                entry.depth > 2 && "pl-3",
              )}
            >
              {entry.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
