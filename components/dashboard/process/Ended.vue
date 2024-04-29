import type { boolean } from 'yup/lib/locale';
<script setup lang="ts">
import type { ProcessEnded } from "~/types/process";
const { $event } = useNuxtApp();

const props = defineProps<{
  items: ProcessEnded[];
  loading?: boolean;
}>();

const search = ref("");

const filteredItems = computed(() => {
  return props.items
    .filter((el) => {
      return (
        el.title.includes(search.value) ||
        el.description.includes(search.value) ||
        el.time.includes(search.value)
      );
    })
    .reverse();
});

const showDetails = (processId: string | number) => {
  $event("process:open-logs", processId);
};
</script>
<template>
  <div v-if="props.loading" class="text-center py-3">
    <v-progress-circular indeterminate class="mx-auto" />
  </div>
  <template v-else>
    <v-text-field
      v-if="props.items?.length"
      v-model="search"
      class="mb-3"
      placeholder="جستجو"
      prepend-inner-icon="mdi-magnify"
      density="compact"
    />
    <v-card
      v-for="process in filteredItems"
      :key="process.id"
      variant="outlined"
      class="mb-3"
      :color="process.status == 'rejected' ? 'error' : ''"
      @click="showDetails(process.id)"
    >
      <template #title> {{ process.title }} </template>
      <template v-slot:prepend>
        <v-avatar color="muted">
          <v-icon icon="mdi-file"></v-icon>
        </v-avatar>
      </template>
      <template v-slot:append>
        <span class="text-body-2"> {{ process.time }} </span>
      </template>
      <v-card-text>
        <div v-if="process.metaTitle" class="text--primary mb-2">
          <v-icon> mdi-information </v-icon> {{ process.metaTitle }}
        </div>
        <div v-if="process.metaDescription" class="mb-2">
          {{ process.metaDescription }}
        </div>

        <div class="d-md-flex justify-space-between">
          <div>{{ process.description }}</div>
          <div class="font-weight-bold">
            {{ process.status == "rejected" ? "ابطال شده" : "اتمام یافته" }}
          </div>
        </div>
      </v-card-text>
    </v-card>
    <div v-if="!loading && !props.items?.length" class="text-center py-3">
      آیتمی موجود نیست
    </div>
  </template>
</template>
