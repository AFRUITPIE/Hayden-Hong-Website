import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: <span>Hayden Hong</span>,
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
  head: "%s – Hayden Hong",
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
