require('dotenv').config()
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const config = require('../common/config/config.development')
export default {
  head: {
    title: 'Pilot',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no' },
      { hid: 'description', name: 'description', content: '' },
      // закрытие от индексации удалить, когда сайт будет готов Да когда запустим проект на хосте
      { name: "robots", content: "noindex, nofollow" },

    ],
    script: [
      { type: "text/javascript", src: "/source/js/t-scroll.min.js" },
      { type: "text/javascript", src: "/source/js/swiper-bundle.min.js" },
      { type: "text/javascript", src: "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js" },
      { type: "text/javascript", src: "https://cdn.jsdelivr.net/npm/jquery.maskedinput@1.4.1/src/jquery.maskedinput.min.js" },
      { type: "text/javascript", src: "/source/js/main.js" }

    ],
    link: [
      { type: "text/css", rel: "stylesheet", href: "/source/js/swiper-bundle.min.css" },

      { type: "text/css", rel: "stylesheet", href: "/source/css/t-scroll.min.css" },
      { type: "text/css", rel: "stylesheet", href: "/source/css/style.css" },

      { rel: "shortcut icon", href: "/source/img/favicon.png", type: "image/png" },



    ]
  },

  server: {
    host: process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost',
    port: process.env.FRONTEND_PORT
  },
  /*
 ** Global CSS
 */
  css: [
    // "~assets/css/style.scss"
  ],
  loading: {
    // color: '#2D64F1'
  },
  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '@/plugins/error' },
    { src: '@/plugins/api' },
    { src: "@/plugins/url" },
    { src: "@/plugins/sticky-directive", mode: 'client' },
    { src: "@/plugins/click-outside", },
    { src: "@/plugins/modal", },
    { src: "@/plugins/swiper", mode: 'client' },
    { src: "@/plugins/load-script", mode: 'client' },
    { src: "@/plugins/v-mask", },
    { src: "@/plugins/range-slider", mode: 'client' },

  ],
  router: {
    scrollToTop: true,
  },
  scrollToTop: true,
  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [

  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    "@nuxtjs/style-resources",
    "nuxt-svg-loader",
    'cookie-universal-nuxt',
    '@nuxtjs/toast',
  ],
  toast: {
    position: 'bottom-right',
  },
  styleResources: {
    // scss: ["~assets/scss/_const.scss", "~assets/scss/_mixin.scss"]
  },
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  env: {
    development: process.env.NODE_ENV !== 'production',
    NODE_ENV: process.env.NODE_ENV
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {

    plugins: [
    ]
  }
}
