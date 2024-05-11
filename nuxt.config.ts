// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {enabled: true},

  // https://nitro.unjs.io/config
  nitro: {
    storage: {
      db: {
        driver: "fs",
        base: "./db",
      },
    },
    devStorage: {
      db: {
        driver: "fs",
        base: "./db",
      },
    },
  },

  modules: [
    "@nuxt/content",
    "@nuxt/devtools",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
  ],
  experimental: {
    writeEarlyHints: false
  },
  routeRules: {
    // 为了SEO目的，在构建时生成
    '/': {prerender: true},
    // 缓存1小时
    '/api/*': {cache: {maxAge: 60 * 60}},
    // 重定向以避免404
    '/old-page': {
      redirect: {to: '/new-page', statusCode: 302}
    }
  }
})