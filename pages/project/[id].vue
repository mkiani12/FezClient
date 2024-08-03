<script setup lang="ts">
import uploadIcon from "~icons/solar/cloud-upload-broken";
import type { Project } from "~/types/projects/projects";

const route = useRoute();
const axios = useApi();

const id = route.params.id;
const project = ref<Project | null>(null);

const getProjectData = () => {
  axios
    .get(`/project/${id}`)
    .then(({ data: selectedProject }) => {
      console.log(selectedProject);
      project.value = selectedProject;
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  getProjectData();
});
</script>
<template>
  <ToolsVGlassCard v-if="project" transparent class="h-100">
    <v-card-title class="text-h3 mt-1 text-primary">
      {{ project.name }}
      <span class="text-white text-h6 font-weight-regular">
        {{ project.subtitle }}
      </span>
    </v-card-title>
  </ToolsVGlassCard>
  <ToolsVGlassCard v-else transparent class="h-100">
    <v-card-title class="text-h3 mt-1 text-primary"> </v-card-title>
  </ToolsVGlassCard>
</template>
