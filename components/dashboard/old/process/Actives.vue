<script setup lang="ts">
import type { ProcessActives } from "~/types/process";

const props = defineProps<{
  items: ProcessActives[];
  loading?: boolean;
}>();

const search = ref("");

const filteredItems = computed(() => {
  return props.items
    .filter((el) => {
      return (
        el.name.includes(search.value) ||
        (el.job ?? "").includes(search.value) ||
        (el.metaTitle ?? "").includes(search.value) ||
        (el.metaDescription ?? "").includes(search.value) ||
        el.title.includes(search.value) ||
        el.position.includes(search.value) ||
        el.step.includes(search.value) ||
        el.unit.includes(search.value)
      );
    })
    .reverse();
});
</script>
<template>
  <div v-if="loading" class="text-center py-3">
    <v-progress-circular indeterminate class="mx-auto" />
  </div>
  <template v-else>
    <v-text-field
      v-if="props.items.length"
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
      :to="process.link"
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
          <div><v-icon> mdi-information </v-icon> {{ process.name }}</div>
          <div class="text-muted">{{ process.position }}</div>
        </div>
        <div v-if="process?.job" class="text--primary mb-2">
          {{ process.job }}
        </div>
        <div v-if="process?.metaTitle" class="text--primary mb-2">
          {{ process.metaTitle }}
        </div>
        <div v-if="process?.metaDescription" class="text--muted mb-2">
          {{ process.metaDescription }}
        </div>
        <div class="d-md-flex justify-space-between">
          <div>{{ process.step }}</div>
          <div class="text-muted">{{ process.unit }}</div>
        </div>
      </v-card-text>
    </v-card>
    <div v-if="!loading && !props.items.length" class="text-center py-3">
      آیتمی موجود نیست
    </div>
  </template>
</template>
