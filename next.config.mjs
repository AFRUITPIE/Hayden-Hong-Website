import createMDX from "@next/mdx";

// Plugins are declared as module names rather than imported functions so the
// same config works under Turbopack, which cannot serialise plugin functions.
const withMDX = createMDX({
  options: {
    remarkPlugins: [
      ["remark-frontmatter", ["yaml"]],
      ["remark-gfm", {}],
    ],
    rehypePlugins: [
      ["rehype-slug", {}],
      [
        "rehype-pretty-code",
        {
          theme: { light: "github-light", dark: "github-dark" },
          keepBackground: false,
        },
      ],
    ],
  },
});

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "mdx"],
};

export default withMDX(config);
