// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app:{
    head:{
      title: 'volt',
    }
  },

  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxt/icon',
    '@nuxt/image'
  ],
  googleFonts:{
    families:{
      Lato:true
    }
  }
})