<script setup lang="ts">
const selectedJob = useCookie("op:selected-job");
const { data } = useAuth();

onBeforeMount(() => {
  if (!selectedJob.value) {
    selectedJob.value = data.value?.userPositions[0].id?.toString();
  }
});
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
