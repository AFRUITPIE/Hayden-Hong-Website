import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
