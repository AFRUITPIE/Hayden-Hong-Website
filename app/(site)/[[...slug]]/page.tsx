import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage, getPageImage, getPages, getToc } from "@/lib/content";
import { Toc } from "@/components/toc";

type PageProps = { params: Promise<{ slug?: string[] }> };

export default async function Page({ params }: PageProps) {
  const page = getPage((await params).slug);
  if (!page) notFound();

  // `page.file` is a path under content/docs, e.g. work-experience/amazon/index.mdx
  const { default: MDX } = await import(`@/content/docs/${page.file}`);

  return (
    <div className="mx-auto flex w-full max-w-6xl gap-12 px-6 py-10 lg:px-10">
      <article className="min-w-0 flex-1">
        <header className="mb-8">
          <h1 className="text-4xl font-semibold tracking-tight">
            {page.title}
          </h1>
          {page.description ? (
            <p className="mt-3 text-lg text-muted-foreground">
              {page.description}
            </p>
          ) : null}
        </header>
        <MDX />
      </article>
      <Toc entries={getToc(page)} />
    </div>
  );
}

export function generateStaticParams() {
  return getPages().map((page) => ({ slug: page.slugs }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const page = getPage((await params).slug);
  if (!page) notFound();

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
