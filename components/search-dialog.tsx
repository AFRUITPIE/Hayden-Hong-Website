"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Kbd } from "@/components/ui/kbd";
import { searchDocs, type SearchDoc } from "@/lib/search-filter";

export function SearchDialog() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [docs, setDocs] = React.useState<SearchDoc[]>([]);

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((previous) => !previous);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // The whole index is one small static response, fetched once on first open.
  React.useEffect(() => {
    if (!open || docs.length > 0) return;

    let cancelled = false;

    fetch("/api/search")
      .then((response) => response.json() as Promise<SearchDoc[]>)
      .then((loaded) => {
        if (!cancelled) setDocs(loaded);
      })
      .catch(() => {
        // Leave the index empty; the dialog shows its empty state.
      });

    return () => {
      cancelled = true;
    };
  }, [open, docs.length]);

  const results = React.useMemo(() => searchDocs(docs, query), [docs, query]);

  function onSelect(url: string) {
    setOpen(false);
    setQuery("");
    router.push(url);
  }

  return (
    <>
      <button
        type="button"
        data-testid="search-trigger"
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-2 rounded-md border border-input/50 bg-input/30 px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-input/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        <SearchIcon className="size-4 shrink-0" />
        <span className="flex-1 text-left">Search</span>
        <Kbd>⌘K</Kbd>
      </button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search"
        description="Search this site"
      >
        {/* Results are already ranked by searchDocs, so cmdk must not re-filter. */}
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search"
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {query.trim() ? (
              <CommandEmpty>No results found.</CommandEmpty>
            ) : null}
            {results.map((result) => (
              <CommandItem
                key={result.url}
                value={result.url}
                onSelect={() => onSelect(result.url)}
              >
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="truncate font-medium">{result.title}</span>
                  {result.excerpt ? (
                    <span className="truncate text-xs text-muted-foreground">
                      {result.excerpt}
                    </span>
                  ) : null}
                </div>
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
