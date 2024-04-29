<script setup lang="ts">
const $axios = useApi();
const { $listen, $off } = useNuxtApp();
import type {
  ProcessActives,
  ProcessInflows,
  ProcessEnded,
} from "~/types/process";

const tab = ref(null);
const loading = ref(false);

const activeProcesses = ref([] as ProcessActives[]);
const inflowProcesses = ref([] as ProcessInflows[]);
const endedProcesses = ref([] as ProcessEnded[]);

const getActiveProcess = async () => {
  await $axios
    .get("/processflow/actives")
    .then(({ data }) => {
      // console.log("actives", data);

      activeProcesses.value = data;
    })
    .catch((err) => {
      console.log(err);
      if (err.response && err.response.status == 404) {
        activeProcesses.value = [];
      }
    });
};
const getInflowProcess = async () => {
  await $axios
    .get("/processflow/find/inflow")
    .then(({ data }) => {
      // console.log("inflow", data);

      inflowProcesses.value = data;
    })
    .catch((err) => {
      console.log(err);
      if (err.response && err.response.status == 404) {
        inflowProcesses.value = [];
      }
    });
};
const getEndedProcess = async () => {
  await $axios
    .get("/processflow/ended")
    .then(({ data }) => {
      console.log("ended", data);

      endedProcesses.value = data;
    })
    .catch((err) => {
      console.log(err);
      if (err.response && err.response.status == 404) {
        endedProcesses.value = [];
      }
    });
};

const getDashboardData = async () => {
  loading.value = true;
  await getActiveProcess();
  await getInflowProcess();
  await getEndedProcess();
  loading.value = false;
};

onMounted(() => {
  $listen("op:job-changed", () => getDashboardData());
  getDashboardData();
});
onBeforeUnmount(() => {
  $off("op:job-changed");
});
</script>
<template>
  <v-card class="overflow-hidden" height="600">
    <v-tabs v-model="tab" color="primary">
      <v-tab :value="1">دریافت شده</v-tab>
      <v-tab :value="2">در جریان</v-tab>
      <v-tab :value="3">خاتمه یافته</v-tab>
    </v-tabs>
    <v-window v-model="tab" class="h-100 pb-15">
      <v-window-item class="overflow-auto h-100 pa-3 pb-0" :value="1">
        <dashboard-process-actives
          :items="activeProcesses"
          :loading="loading"
        />
      </v-window-item>
      <v-window-item class="overflow-auto h-100 pa-3 pb-0" :value="2">
        <dashboard-process-inflow :items="inflowProcesses" :loading="loading" />
      </v-window-item>
      <v-window-item class="overflow-auto h-100 pa-3 pb-0" :value="3">
        <dashboard-process-ended :items="endedProcesses" :loading="loading" />
      </v-window-item>
    </v-window>
  </v-card>
</template>
