<script setup lang="ts">
import { VuePDF, usePDF } from "@tato30/vue-pdf";
import "@tato30/vue-pdf/style.css";
const route = useRoute();
const { $event } = useNuxtApp();
const $axios = useApi();

interface DocumentAttachment {
  link: string;
  name: string;
  code: string;
}

const tab = ref(1);
const file = ref("");
const page = ref(1);
const showDoc = ref(false);
const docExist = ref(true);
const attachments = ref<DocumentAttachment[]>([]);

const openLogs = () => {
  $event("process:open-logs", route.params.processId);
};

try {
  const { data } = await $axios.get(
    `/processflow/info/${route.params.processId}`
  );
  console.log("info", data);
  file.value = data.pdf;
  attachments.value = data.attachments;
} catch (e) {
  console.log(e);
  docExist.value = false;
}

const { pdf, pages } = usePDF(file.value);
</script>
<template>
  <div class="d-flex w-100">
    <v-btn v-if="docExist" class="mr-auto" icon @click="showDoc = !showDoc">
      <v-icon v-if="!showDoc"> mdi-text-box</v-icon>
      <v-icon v-else> mdi-minus</v-icon>
    </v-btn>
    <v-btn :class="docExist ? 'mr-2' : 'mr-auto'" icon @click="openLogs">
      <v-icon> mdi-note-text </v-icon>
    </v-btn>
  </div>

  <v-expand-transition>
    <div
      v-if="showDoc && docExist"
      class="d-md-flex mt-3 justify-space-between"
    >
      <div>
        <VuePDF
          :pdf="pdf"
          text-layer
          annotation-layer
          :scale="0.75"
          :page="page"
        />
        <div class="w-100 d-flex justify-space-between mt-3">
          <v-btn icon @click="page++">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          {{ page }} از {{ pages }}
          <v-btn icon @click="page--">
            <v-icon>mdi-minus</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="w-100">
        <v-tabs v-model="tab" align-tabs="center" color="deep-purple-accent-4">
          <v-tab :value="1">مدارک پیوست</v-tab>
          <v-tab :value="2">مدارک مرتبط</v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item :value="1">
            <v-list>
              <v-list-item
                v-for="attachment in attachments"
                :key="attachment.code"
              >
                {{ attachment.name }} - {{ attachment.code }}
              </v-list-item>
              <v-list-item v-if="attachments.length < 1">
                موردی یافت نشد
              </v-list-item>
            </v-list>
          </v-window-item>
          <v-window-item :value="2">
            <v-list-item> موردی یافت نشد </v-list-item>
          </v-window-item>
        </v-window>
      </div>
    </div>
  </v-expand-transition>
  <NuxtPage class="mt-5" />
</template>
