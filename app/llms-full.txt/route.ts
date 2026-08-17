import { getLLMText, getPages } from "@/lib/content";

export const revalidate = false;

export function GET() {
  const body = getPages()
    .sort((a, b) => a.url.localeCompare(b.url))
    .map(getLLMText)
    .join("\n\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
