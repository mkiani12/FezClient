<script setup lang="ts">
const route = useRoute();
const $axios = useApi();
import { VuePDF, usePDF } from "@tato30/vue-pdf";
import "@tato30/vue-pdf/style.css";

interface DocumentAttachment {
  link: string;
  name: string;
  code: string;
}

const file = ref("");
const tab = ref(1);
const attachments = ref<DocumentAttachment[]>([]);
const docExist = ref(true);
const page = ref(1);

try {
  const { data } = await $axios.get(`/form/documents/read/${route.params.doc}`);
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
  <v-row class="d-md-flex mt-3 justify-space-between">
    <v-col cols="12" md="6">
      <VuePDF
        :pdf="pdf"
        text-layer
        annotation-layer
        fit-parent
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
    </v-col>
    <v-col cols="12" md="6">
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
    </v-col>
  </v-row>
</template>
