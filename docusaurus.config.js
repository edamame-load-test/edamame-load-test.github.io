// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const pathBrowserify = require("path-browserify");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Edamame",
  tagline: "A load generator for HTTP and WS",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://edamame-load-test.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "edamame-load-test", // Usually your GitHub org/user name.
  projectName: "edamame-load-test.github.io", // Usually your repo name.
  trailingSlash: false,

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          routeBasePath: "/",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          // 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  plugins: [
    async function myPlugin(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      colorMode: {
        defaultMode: "light",
        disableSwitch: true,
      },
      image: "img/edamame-social-card.png",
      navbar: {
        hideOnScroll: true,
        title: "Edamame",
        items: [
          {
            type: "doc",
            docId: "case-study",
            position: "right",
            label: "Case Study",
          },
          {
            type: "doc",
            docId: "docs",
            position: "right",
            label: "Docs",
          },
          {
            href: "/#team",
            label: "Team",
            position: "right",
          },
          {
            href: "https://github.com/facebook/docusaurus",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Edamame",
            items: [],
          },
          {
            title: "Navigation",
            items: [
              {
                label: "Case Study",
                href: "/case-study",
              },
              {
                label: "Documentation",
                href: "/Docs",
              },
              {
                label: "Live Presentation",
                href: "https://www.youtube.com/watch?v=VZun0GQaSLY",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/edamame-load-test/edamame",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Edamame Load Testing`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 3,
      },
    }),
};

module.exports = config;
