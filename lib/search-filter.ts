export type SearchDoc = {
  title: string;
  url: string;
  description?: string;
  content: string;
};

export type SearchResult = SearchDoc & { excerpt?: string };

const EXCERPT_RADIUS = 60;

function countOccurrences(haystack: string, needle: string): number {
  let count = 0;
  let index = haystack.indexOf(needle);

  while (index !== -1) {
    count += 1;
    index = haystack.indexOf(needle, index + needle.length);
  }

  return count;
}

function excerptAround(content: string, term: string): string | undefined {
  const index = content.toLowerCase().indexOf(term);
  if (index === -1) return undefined;

  const start = Math.max(0, index - EXCERPT_RADIUS);
  const end = Math.min(content.length, index + term.length + EXCERPT_RADIUS);
  const text = content.slice(start, end).replace(/\s+/g, " ").trim();

  return `${start > 0 ? "…" : ""}${text}${end < content.length ? "…" : ""}`;
}

/**
 * Ranks pages against a query, weighting title hits above description hits and
 * those above body hits. Every term must match somewhere for a page to appear.
 */
export function searchDocs(
  docs: SearchDoc[],
  query: string,
  limit = 8,
): SearchResult[] {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];

  const scored: { doc: SearchDoc; score: number }[] = [];

  for (const doc of docs) {
    const title = doc.title.toLowerCase();
    const description = doc.description?.toLowerCase() ?? "";
    const content = doc.content.toLowerCase();
    let score = 0;
    let matchedEveryTerm = true;

    for (const term of terms) {
      const inTitle = title.includes(term);
      const inDescription = description.includes(term);
      const bodyHits = countOccurrences(content, term);

      if (!inTitle && !inDescription && bodyHits === 0) {
        matchedEveryTerm = false;
        break;
      }

      if (title.startsWith(term)) score += 12;
      else if (inTitle) score += 8;
      if (inDescription) score += 4;
      score += Math.min(bodyHits, 5);
    }

    if (matchedEveryTerm) scored.push({ doc, score });
  }

  return scored
    .sort((a, b) => b.score - a.score || a.doc.url.length - b.doc.url.length)
    .slice(0, limit)
    .map(({ doc }) => ({
      ...doc,
      excerpt: doc.description ?? excerptAround(doc.content, terms[0]),
    }));
}
