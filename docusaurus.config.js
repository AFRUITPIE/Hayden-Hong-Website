// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const fs = require("fs");
const path = require("path");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Hayden Hong',
  tagline: 'Hayden Hong\'s portfolio webpage ',
  favicon: 'img/favicon.svg',

  // Set the production url of your site here
  url: 'https://haydenhong.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  staticDirectories: ["static"],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: 'blog',
          sidebarPath: require.resolve('./sidebars.js')
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  plugins: [
    //  Copy the Cloudflare pages redirects file to the build dir
    () => ({
      name: "copy-redirects",
      async postBuild({ outDir }) {
        fs.copyFileSync(
          path.resolve(__dirname, "_redirects"),
          path.resolve(outDir, "_redirects")
        );
      },
    }),
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Hayden Hong',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'contentSidebar',
            position: 'left',
            label: 'Blog',
          },
        ],
      },
      footer: {
        links: [
          {
            title: 'Links',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/AFRUITPIE',
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/hayden-hong-software/',
              }
            ],
          },
          {
            title: 'Contact',
            items: [
              {
                label: 'Email',
                href: 'mailto:hello@haydenhong.com',
              },
              {
                label: 'Mastodon',
                rel: "me",
                href: 'https://mastodon.social/@afruitpie',
              }
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Hayden Hong. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
        respectPrefersColorScheme: true,
      },
    }),
};

module.exports = config;
