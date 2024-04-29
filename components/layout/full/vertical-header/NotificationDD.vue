<script setup lang="ts">
import { BellRingingIcon } from "vue-tabler-icons";

const notificationBadge = ref(true);
</script>
<template>
  <v-menu :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-btn
        icon
        variant="text"
        class="custom-hover-primary ml-5 text-muted"
        v-bind="props"
      >
        <v-badge
          :model-value="notificationBadge"
          dot
          color="primary"
          offset-x="-5"
          offset-y="-3"
        >
          <BellRingingIcon stroke-width="1.5" size="22" />
        </v-badge>
      </v-btn>
    </template>
    <v-sheet rounded="md" width="200" elevation="10" class="mt-2">
      <v-list class="py-0" lines="one" density="compact">
        <v-list-item value="item1" color="primary">
          <v-list-item-title class="pr-4 text-body-1 text-center">
            هیج اعلانی وجود ندارد
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-sheet>
  </v-menu>
</template>
