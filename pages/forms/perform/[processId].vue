<script setup lang="ts">
const route = useRoute();
const { $event } = useNuxtApp();

const openLogs = () => {
  $event("process:open-logs", route.params.processId);
};
</script>
<template>
  <NuxtPage />
</template>
