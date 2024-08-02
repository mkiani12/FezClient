<script lang="ts" setup>
import type { ProjectFile } from "~/types/projects/projects";
import type { ChooseProjectDto } from "~/types/components/ChooseProjectDto";

import uploadIcon from "~icons/solar/cloud-upload-broken";
import toolIcon from "~icons/material-symbols-light/arrow-selector-tool-outline-rounded";

const selectedFile = ref<ProjectFile | null>(null);
const disabledTools = ref(true);

const selectFile = (file: ChooseProjectDto) => {
  selectedFile.value = file;
  disabledTools.value = false;

  console.log(selectedFile.value);
};
</script>
<template>
  <div class="flex flex-column ma-0 h-100 w-100">
    <div class="tool-topbor">
      <ToolsVGlassCard :card-props="{ height: 100 }" transparent>
        <v-card-item class="d-flex h-100 align-center py-1">
          <v-btn
            v-for="n in 18"
            :key="n"
            class="mx-1"
            variant="text"
            icon
            size="70"
            stacked
            :disabled="disabledTools"
          >
            <v-icon size="40" :icon="toolIcon"> </v-icon>
            <span>Tool {{ n }}</span>
          </v-btn>
        </v-card-item>
      </ToolsVGlassCard>
    </div>
    <div class="tool-content">
      <div class="d-flex pt-3 h-100">
        <v-col class="pa-0" cols="2">
          <ToolsVGlassCard transparent class="h-100">
            <v-list class="bg-transparent text-primary rounded-xl">
              <v-list-item
                class="text-primary"
                title="Home"
                :disabled="disabledTools"
              ></v-list-item>

              <v-list-group value="Users">
                <template v-slot:activator="{ props }">
                  <v-list-item
                    class="text-primary"
                    v-bind="props"
                    title="Users"
                    :disabled="disabledTools"
                  ></v-list-item>
                </template>

                <v-list-item
                  class="text-primary pl-0"
                  title="Admin"
                  :disabled="disabledTools"
                ></v-list-item>
                <v-list-item
                  class="text-primary"
                  title="Actions"
                  :disabled="disabledTools"
                ></v-list-item>
              </v-list-group>
            </v-list>
          </ToolsVGlassCard>
        </v-col>
        <v-col class="pa-0 pl-3 max-h-100" cols="10">
          <ToolsVGlassCard transparent class="h-100">
            <v-card-item
              v-if="!selectedFile"
              class="h-100 d-flex align-center justify-center"
            >
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
                  <v-icon
                    color="primary"
                    size="100"
                    :icon="uploadIcon"
                  ></v-icon>
                  <p class="text-primary my-6">
                    Please upload the picture for remote sensing analysis.
                    Ensure that the file is in the appropriate format (e.g.,
                    JPEG, TIFF) and does not exceed the maximum size limit.
                  </p>
                  <SharedChooseProject @choose="selectFile">
                    <template #default="{ props }">
                      <v-btn v-bind="props"> Upload File or Choose one </v-btn>
                    </template>
                  </SharedChooseProject>
                </v-card-text>
              </v-card>
            </v-card-item>
            <v-card-text v-else class="h-100">
              <v-img
                class="rounded-xl"
                :src="selectedFile.image_path ?? ''"
                max-height="100%"
              ></v-img>
            </v-card-text>
          </ToolsVGlassCard>
        </v-col>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.tool-topbar {
  height: 100px !important;
}

.tool-content {
  height: calc(100% - 100px) !important;
}
</style>
