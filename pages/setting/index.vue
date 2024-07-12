<script setup lang="ts">
import uploadIcon from "~icons/solar/cloud-upload-broken";
</script>
<template>
  <ToolsVGlassCard transparent class="h-100">
    <v-card-item v-if="true" class="h-100 d-flex align-center justify-center">
      <v-card
        border="dashed md primary opacity-75"
        class="rounded-xl text-center"
        color="transparent"
        max-width="500"
        max-height="400"
      >
        <v-card-text
          class="d-flex flex-column justify-center align-center h-100"
        >
          <v-icon color="primary" size="100" :icon="uploadIcon"></v-icon>
          <p class="text-primary my-6">
            Please upload the picture for remote sensing analysis. Ensure that
            the file is in the appropriate format (e.g., JPEG, TIFF) and does
            not exceed the maximum size limit.
          </p>
          <v-btn> Upload File or Choose one</v-btn>
        </v-card-text>
      </v-card>
    </v-card-item>
    <v-card-item v-else class="h-100">
      <v-card-title>Content</v-card-title>
    </v-card-item>
  </ToolsVGlassCard>
</template>
