// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from "vite-svg-loader";

export default defineNuxtConfig({
  modules: ["@nuxtjs/i18n", "@zadigetvoltaire/nuxt-gtm"],
  ssr: false,
  vite: {
    plugins: [svgLoader({})],
  },

  i18n: {
    locales: [
      { code: "sk", iso: "sk-SK", file: "sk.js" },
      { code: "en", iso: "en-EN", file: "en.js" },
    ],
    defaultLocale: "sk",
    detectBrowserLanguage: false,
    strategy: "no_prefix",
    langDir: "lang/",
    compilation: { strictMessage: false },
  },

  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_API_URL,
    },
  },
  gtm: {
    id: process.env.NUXT_APP_GTM_ID || '',
    enabled: process.env.NUXT_APP_GTM_ID === 'true' ? true : false, // Enable GTM tracking
  },

  app: {
    baseURL: process.env.NUXT_APP_BASE_URL,
    head: {
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
        },
      ],
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  compatibilityDate: "2024-07-22",
});
