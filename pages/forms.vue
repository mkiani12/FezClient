<script setup lang="ts">
import { ref } from "vue";
import UiParentCard from "@/components/shared/UiParentCard.vue";
</script>
<template>
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard title="Sample Page">
        <div class="pa-7">
          <NuxtPage />
        </div>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
