import { getPages, getPlainText } from "@/lib/content";
import type { SearchDoc } from "@/lib/search-filter";

// The index is small and content only changes at build time, so it ships as a
// prerendered response and the dialog ranks results on the client.
export const dynamic = "force-static";

export function GET() {
  const docs: SearchDoc[] = getPages().map((page) => ({
    title: page.title,
    url: page.url,
    description: page.description,
    content: getPlainText(page),
  }));

  return Response.json(docs);
}
