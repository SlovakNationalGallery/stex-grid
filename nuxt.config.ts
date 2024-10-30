// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  modules: ["@nuxtjs/i18n", "@nuxt/scripts"],
  ssr: false,

  vite: {
    plugins: [svgLoader({})]
  },

  i18n: {
    locales: [
      { "code": "sk", "iso": "sk-SK", "file": "sk.js" },
      { "code": "en", "iso": "en-EN", "file": "en.js" },
    ],
    defaultLocale: "sk",
    detectBrowserLanguage: false,
    strategy: "no_prefix",
    langDir: 'lang/',
    compilation: { strictMessage: false}
  },

  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  scripts: {
    registry: {
      googleTagManager: true,
    }
  },
  // you need to provide a runtime config to access the environment variables

  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_API_URL,
      scripts: {
        googleTagManager: {
          id: process.env.NUXT_APP_GTM_ID, 
        },
      }
    },
  },

  app: {
    baseURL: process.env.NUXT_APP_BASE_URL,
    head: {
      meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" }],
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