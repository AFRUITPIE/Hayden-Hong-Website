import React from "react";
import { DocsThemeConfig, useConfig } from "nextra-theme-docs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/router";

const config: DocsThemeConfig = {
  logo: (
    <span className="mr-6 flex items-center space-x-2">
      <Avatar>
        <AvatarImage src="/assets/Hayden.jpeg" alt="Hayden" />
        <AvatarFallback>HH</AvatarFallback>
      </Avatar>
      <span className="font-bold">Hayden Hong</span>
    </span>
  ),
  project: {
    link: "https://github.com/AFRUITPIE/Hayden-Hong-Website",
  },
  docsRepositoryBase: "https://github.com/AFRUITPIE/Hayden-Hong-Website",
  footer: {
    content: (
      <span>
        MIT {new Date().getFullYear()} © Hayden Hong
        <br />
        Made with ♥️ in Seattle
      </span>
    ),
  },
  head() {
    const { asPath } = useRouter();
    const { frontMatter } = useConfig();
    
    const url = `https://haydenhong.com${asPath}`;
    const title = frontMatter.title ? `${frontMatter.title} | Hayden Hong` : 'Hayden Hong';

    return (
      <>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:url" content={url} />
        <meta
          property="og:description"
          content={frontMatter.description || 'Hayden Hong\'s personal website'}
        />
        <meta
          property="og:image"
          content="https://haydenhong.com/assets/Hayden.jpeg"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </>
    );
  },
  search: {
    placeholder: "Search",
  },
  feedback: {
    content: null,
  },
  faviconGlyph: "🥸",
  // Not disabling dark mode, just hiding the button
  darkMode: false,
};

export default config;
