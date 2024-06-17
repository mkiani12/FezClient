import * as dotenv from "dotenv";
dotenv.config({
  path: `./env/.env.${process.env.NODE_ENV}.local`,
  override: false,
});
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "FEZtool - Free and Easy",
      titleTemplate: "%s - FEZtool",
    },
  },

  modules: [
    "@sidebase/nuxt-auth",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/i18n",
    "@nuxtjs/google-fonts",
  ],
  plugins: ["~/plugins/plugins"],

  googleFonts: {
    outputDir: "assets",
    preload: true,
    families: {
      Poppins: true,
    },
  },

  auth: {
    baseURL: process.env.BASE_URL,
    provider: {
      type: "local",
      pages: {
        login: "/auth/login",
      },
      endpoints: {
        signOut: {
          path: "/auth/logout",
          method: "post",
        },
        signIn: {
          path: "/auth/token",
          method: "post",
        },
        signUp: {
          path: "/auth/signup",
          method: "post",
        },
        getSession: {
          path: "/user/",
          method: "get",
        },
      },
      sessionDataType: {
        id: "number",
        role: "number",
        email: "string",
        firstname: "string",
        lastname: "string",
        created_at: "string",
        updated_at: "string",
      },
      token: {
        maxAgeInSeconds: 60 * 60 * 24,
      },
      // @ts-ignore
      // refreshToken: {
      //   maxAgeInSeconds: 60 * 60 * 24,
      // },
    },
    globalAppMiddleware: {
      isEnabled: true,
    },
  },

  i18n: {
    vueI18n: "./i18n/i18n.config.ts",
    locales: [
      { code: "en", iso: "en-US", dir: "ltr" },
      { code: "fa", iso: "fa-IR", dir: "rtl" },
    ],
    defaultLocale: "en",
  },

  ssr: false,

  typescript: {
    shim: false,
  },

  build: {
    transpile: ["vuetify"],
  },

  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },

  nitro: {
    serveStatic: true,
  },

  devServer: {
    port: parseInt(process.env.PORT ?? "3000"),
  },

  devServerHandlers: [],
  hooks: {},
});
