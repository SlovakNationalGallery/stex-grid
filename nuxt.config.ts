// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  modules: ["@nuxtjs/i18n"],
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
  },
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_API_URL,
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
