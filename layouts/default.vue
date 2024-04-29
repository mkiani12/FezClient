<script setup lang="ts">
import { ref } from "vue";
import type { LogItem } from "~/types/process";

const { localeProperties } = useI18n();
const { dir } = localeProperties.value;
const $axios = useApi();
const { $listen } = useNuxtApp();

const drawerLogs = ref(false);

const logLoading = ref(false);

const logItems = ref([] as LogItem[]);

const getLogs = async (processId: string) => {
  logLoading.value = true;
  await $axios
    .post(`/processflow/log/${processId}`)
    .then(({ data, status }) => {
      if (status == 200) {
        logItems.value = data.reverse();

        console.log("logs -->", logItems.value);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  logLoading.value = false;
};

onBeforeMount(() => {
  $listen("process:open-logs", (processId: string) => {
    drawerLogs.value = true;
    getLogs(processId);
  });
});
</script>

<template>
  <v-locale-provider :rtl="dir == 'rtl'">
    <v-app>
      <LayoutFullMain />
      <v-main class="mr-md-5 mx-2 mx-md-0">
        <v-navigation-drawer
          v-model="drawerLogs"
          width="500"
          mobile-breakpoint="md"
          temporary
          location="left"
        >
          <div
            class="px-3 pt-3 w-100 d-flex justify-space-between align-items-center"
          >
            <div class="pt-3 text-h6">تاریخچه روند</div>
            <v-btn
              variant="text"
              icon
              @click="
                drawerLogs = false;
                logItems = [];
              "
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
          <FormsShowLogs
            v-if="logItems.length"
            :items="logItems"
            :loading="logLoading"
          />
        </v-navigation-drawer>
        <v-container fluid class="page-wrapper">
          <div class="maxWidth">
            <NuxtPage />
          </div>
        </v-container>
      </v-main>
    </v-app>
  </v-locale-provider>
</template>
