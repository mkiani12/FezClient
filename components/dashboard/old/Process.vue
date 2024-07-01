<script setup lang="ts">
const tab = ref(null);
const loading = ref(false);
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
      </v-window-item>
      <v-window-item class="overflow-auto h-100 pa-3 pb-0" :value="2">
      </v-window-item>
      <v-window-item class="overflow-auto h-100 pa-3 pb-0" :value="3">
      </v-window-item>
    </v-window>
  </v-card>
</template>
