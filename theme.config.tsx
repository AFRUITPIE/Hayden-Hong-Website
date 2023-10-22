import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>Hayden Hong</span>,
  project: {
    link: 'https://github.com/AFRUITPIE/Hayden-Hong-Website-Nextra',
  },
  docsRepositoryBase: 'https://github.com/AFRUITPIE/Hayden-Hong-Website-Nextra',
  footer: {
    text: (
      <span>
        MIT {new Date().getFullYear()} © Hayden Hong<br />
        Made with ♥️ in Seattle
      </span>
    )
  },
  search: {
    placeholder: "Search"
  },
  feedback: {
    content: null,
  },
  faviconGlyph: "🥸"
}

export default config
