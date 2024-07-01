import type { boolean } from 'yup/lib/locale';
<script setup lang="ts">
import type { ProcessInflows } from "~/types/process";
const { $event } = useNuxtApp();

const props = defineProps<{
  items: ProcessInflows[];
  loading?: boolean;
}>();

const search = ref("");

const filteredItems = computed(() => {
  return props.items
    .filter((el) => {
      return (
        el.title.includes(search.value) ||
        el.position.includes(search.value) ||
        el.step.includes(search.value) ||
        el.project.includes(search.value) ||
        el.unit.includes(search.value) ||
        (el.job ?? "").includes(search.value) ||
        (el.metaTitle ?? "").includes(search.value) ||
        (el.metaDescription ?? "").includes(search.value)
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
      @click="showDetails(process.id)"
    >
      <template #title> {{ process.title }} </template>
      <template v-slot:prepend>
        <v-avatar color="muted">
          <v-icon icon="mdi-file"></v-icon>
        </v-avatar>
      </template>
      <template v-slot:append>
        <span class="text-muted text-body-2"> {{ process.time }} </span>
      </template>
      <v-card-text>
        <div class="d-md-flex text--primary mb-2 justify-space-between">
          <div><v-icon> mdi-information </v-icon> {{ process.position }}</div>
          <div v-if="process?.job" class="text--primary">
            {{ process.job }}
          </div>
        </div>

        <div v-if="process?.metaTitle" class="text--primary mb-2">
          {{ process.metaTitle }}
        </div>
        <div v-if="process?.metaDescription" class="text--muted mb-2">
          {{ process.metaDescription }}
        </div>

        <div class="d-md-flex justify-space-between">
          <div>{{ process.step }}</div>
          <div class="text-muted">
            {{ process.unit }} - {{ process.project }}
          </div>
        </div>
      </v-card-text>
    </v-card>
    <div v-if="!loading && !props.items?.length" class="text-center py-3">
      آیتمی موجود نیست
    </div>
  </template>
</template>
