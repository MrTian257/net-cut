// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/devtools",
    "@nuxt/test-utils",
    "@nuxt/scripts"
  ],
  routeRules: {
    // 为了SEO目的，在构建时生成
    '/': { prerender: true },
    // 缓存1小时
    '/api/*': { cache: { maxAge: 60 * 60 } },
    // 重定向以避免404
    '/old-page': {
      redirect: { to: '/new-page', statusCode: 302 }
    }
  }
})