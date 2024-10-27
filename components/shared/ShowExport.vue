<template>
  <ToolsVGlassCard transparent class="h-100">
    <v-btn
      class="position-absolute right-0 top-0 mr-3 mt-3 z-10"
      icon
      variant="text"
      @click="deleteExport"
    >
      <v-icon :icon="TrashIcon"></v-icon>
      <v-tooltip activator="parent"> Delete Export </v-tooltip>
    </v-btn>
    <v-card-text class="h-100 d-flex align-center justify-center">
      <v-img :src="output?.image_path" height="100%"></v-img>
    </v-card-text>
  </ToolsVGlassCard>
</template>

<script setup lang="ts">
import type { ExportedFile } from "~/types/projects/projects";
import TrashIcon from "~icons/material-symbols/delete-outline-rounded";

const projects = useProjectStore();

const props = defineProps<{
  projectId: number;
  output: ExportedFile;
}>();

const deleteExport = () => {
  if (props.output && props.projectId != 0) {
    projects.showDeleteDialog("Export", props.output, props.projectId);
  }
};
</script>

<style scoped></style>
