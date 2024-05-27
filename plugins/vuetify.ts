import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import PerfectScrollbar from "vue3-perfect-scrollbar";
import VueApexCharts from "vue3-apexcharts";
import VueTablerIcons from "vue-tabler-icons";
import { LightTheme } from "@/theme/LightTheme";
import { DarkTheme } from "@/theme/DarkTheme";
import defaults from "./vuetify/defaults";

import "@mdi/font/css/materialdesignicons.css";
import "@/scss/style.scss";

export default defineNuxtPlugin((nuxtApp) => {
  // config variables

  nuxtApp.$v_variant = "outlined";
  nuxtApp.$v_btn_variant = "outlined";

  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: "dark",
      themes: {
        light: LightTheme,
        dark: DarkTheme,
      },
    },
    defaults,
  });

  nuxtApp.vueApp.use(vuetify);
  nuxtApp.vueApp.use(PerfectScrollbar);
  nuxtApp.vueApp.use(VueApexCharts);
  nuxtApp.vueApp.use(VueTablerIcons);
});
