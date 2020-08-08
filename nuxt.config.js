export default {
  /*
   ** Build configuration
   */
  build: {
    extend() {},
  },

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build', 'nuxt-composition-api'],

  /*
   ** Auto import components
   */
  components: true,

  /*
   ** Global CSS
   */
  css: [
    '@mdi/font/css/materialdesignicons.css',
    'typeface-roboto/index.css',
    '~/assets/app.scss',
  ],

  /*
   ** Generate configuration
   */
  generate: {
    dir: 'docs',
    fallback: true,
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description,
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  /*
   ** Nuxt rendering mode
   */
  mode: 'spa',

  /*
   ** Nuxt.js modules
   */
  modules: [
    [
      '@nuxtjs/vuetify',
      {
        customVariables: ['~/assets/variables.scss'],
        defaultAssets: false,
        theme: {
          themes: {
            light: {
              primary: '#ff4081',
              secondary: '#424242',
              accent: '#ff4081',
            },
            dark: {
              primary: '#ff4081',
              secondary: '#E0E0E0',
              accent: '#ff4081',
            },
          },
        },
      },
    ],
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Router configuration
   */
  router: {
    base: '/web-tools/',
  },

  /*
   ** Source directory
   */
  srcDir: 'src',

  /*
   ** Vue configuration
   */
  vue: {
    config: {
      productionTip: false,
    },
  },
}
