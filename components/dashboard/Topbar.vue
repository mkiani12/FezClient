<script setup lang="ts">
/*Call Components*/
import profileIcon from "~icons/material-symbols-light/person-outline-rounded";
</script>
<template>
  <ToolsVGlassCard transparent>
    <v-card-text class="text-end">
      <v-btn variant="outlined" icon color="white">
        <v-icon :icon="profileIcon" size="30"></v-icon>
      </v-btn>
    </v-card-text>
  </ToolsVGlassCard>
</template>
