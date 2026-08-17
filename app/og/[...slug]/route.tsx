import { getPage, getPageImage, getPages } from "@/lib/content";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";

export const revalidate = false;

const SITE = "Hayden Hong";

type OgRouteContext = {
  params: Promise<{
    slug: string[];
  }>;
};

export async function GET(_req: Request, { params }: OgRouteContext) {
  const { slug } = await params;
  // The trailing segment is the image filename, not part of the page slug.
  const page = getPage(slug.slice(0, -1));
  if (!page) notFound();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        backgroundColor: "#0a0a0a",
        color: "#fafafa",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 64, fontWeight: 600, lineHeight: 1.15 }}>
          {page.title}
        </div>
        {page.description ? (
          <div style={{ marginTop: 24, fontSize: 30, color: "#a1a1a1" }}>
            {page.description}
          </div>
        ) : null}
      </div>
      <div style={{ display: "flex", fontSize: 28, color: "#a1a1a1" }}>
        {SITE}
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}

export function generateStaticParams() {
  return getPages().map((page) => ({
    slug: getPageImage(page).segments,
  }));
}
