<script lang="ts" setup>
import type { Project } from "~/types/projects/projects";
import type { SelectedFiles, Band, Action } from "~/types/tools/tools";
import type { ChooseFileDto } from "~/types/dto/components/ChooseFileDto";

import CloseIcon from "~icons/material-symbols-light/cancel-outline-rounded";

import ImageEnhancementIcon from "~icons/carbon/edge-enhancement";
import FiltersIcon from "~icons/solar/filters-bold-duotone";
import MosaicIcon from "~icons/gis/mosaic";

const actions = ref<Action[]>([
  {
    title: "Image Enhancement",
    type: "-",
    icon: ImageEnhancementIcon,
  },
  {
    title: "Filters",
    type: "-",
    icon: FiltersIcon,
  },
  {
    title: "Mosaic",
    type: "-",
    icon: MosaicIcon,
  },
]);

const selectedProject = ref<null | Project>(null);

const selectedFiles = ref<SelectedFiles>({
  RED: null,
  GREEN: null,
  BLUE: null,
  NIR: null,
  SWIR1: null,
  SWIR2: null,
});

const bands: Band[] = ["RED", "GREEN", "BLUE", "NIR", "SWIR1", "SWIR2"];

const disabledTools = ref(true);

const exports = ref([]);

const showExport = (exported: any) => {
  console.log(exported);
};

const selectFile = (file: ChooseFileDto, band: Band) => {
  selectedFiles.value[band] = file;
  disabledTools.value = false;

  console.log(selectedFiles.value);
};

const clearFile = (band: Band) => {
  selectedFiles.value[band] = null;
};

const clearProject = () => {
  selectedProject.value = null;
  selectedFiles.value = {
    RED: null,
    GREEN: null,
    BLUE: null,
    NIR: null,
    SWIR1: null,
    SWIR2: null,
  };
  disabledTools.value = true;
};

const selectProject = (project: Project) => {
  console.log(project);
  selectedProject.value = project;
};

const scrolling = (e: WheelEvent) => {
  const el = e.target as HTMLElement;
  e.preventDefault();
  el.scrollLeft += e.deltaY;
};
</script>
<template>
  <div class="flex flex-column ma-0 h-100 w-100">
    <div class="tool-topbor overflow-x-auto">
      <ToolsVGlassCard
        class="overflow-hidden"
        :card-props="{ height: 100 }"
        transparent
      >
        <v-card-text
          class="d-flex no-wrap overflow-x-auto h-100 align-center py-1 scroll-behavior"
          @wheel="scrolling"
        >
          <v-btn
            v-for="action in actions"
            :key="action.title"
            class="mx-3"
            variant="text"
            icon
            size="70"
            stacked
            :disabled="disabledTools"
          >
            <v-icon size="40" :icon="action.icon"> </v-icon>
            <span class="text-body-2">{{ action.title }}</span>
          </v-btn>
        </v-card-text>
      </ToolsVGlassCard>
    </div>
    <div class="tool-content">
      <div class="d-flex pt-3 h-100">
        <v-col class="pa-0" cols="2">
          <ToolsVGlassCard transparent class="h-100 d-flex flex-column">
            <v-card-text class="pa-0">
              <v-list class="bg-transparent text-primary rounded-xl">
                <p class="text-primary py-3 pl-4">Exports</p>
                <v-divider></v-divider>
                <v-list-item
                  v-for="(exported, index) in exports"
                  :key="index"
                  class="text-primary"
                  :title="exported"
                  :disabled="disabledTools"
                  @click="showExport(exported)"
                ></v-list-item>
                <p
                  v-if="exports.length < 1"
                  class="text-primary text-center text-body-1 py-3"
                >
                  There is no export yet!
                  <br />
                  try to export something
                </p>
              </v-list>
            </v-card-text>

            <v-card-actions v-if="selectedProject">
              <v-btn block color="primary" @click="clearProject">
                Close Project
              </v-btn>
            </v-card-actions>
          </ToolsVGlassCard>
        </v-col>
        <v-col class="pa-0 pl-3 max-h-100" cols="10">
          <ToolsVGlassCard v-if="selectedProject" transparent class="h-100">
            <v-card-item class="h-100 d-flex align-center justify-center">
              <v-row>
                <v-col v-for="band in bands" :key="band" cols="4">
                  <v-card
                    v-if="!selectedFiles[band]"
                    border="dashed md primary opacity-75"
                    class="rounded-xl text-center"
                    color="transparent"
                    max-width="500"
                    max-height="400"
                  >
                    <v-card-text
                      class="d-flex flex-column justify-center align-center h-100"
                    >
                      <h2 class="text-h4 text-primary">{{ band }}</h2>
                      <p class="text-primary mb-6 mt-2">
                        Upload different image bands for processing. Band
                        validation is currently unavailable. Please upload
                        correct bands.
                      </p>
                      <SharedChooseFile
                        :project-id="selectedProject.id"
                        @choose="(e) => selectFile(e, band)"
                      >
                        <template #default="{ props }">
                          <v-btn v-bind="props">
                            Upload File or Choose one
                          </v-btn>
                        </template>
                      </SharedChooseFile>
                    </v-card-text>
                  </v-card>
                  <v-hover v-else v-slot="{ isHovering, props }">
                    <v-card
                      border="dashed md primary opacity-75"
                      class="rounded-xl text-center"
                      color="transparent"
                      height="100%"
                      max-width="500"
                      max-height="400"
                      v-bind="props"
                    >
                      <v-card-text
                        class="d-flex flex-column justify-center align-center h-100 pa-0"
                      >
                        <v-img
                          :src="selectedFiles[band].thumbnail_path"
                          height="100%"
                          max-height="100%"
                          width="auto"
                        >
                          <v-expand-transition>
                            <div
                              v-if="isHovering"
                              class="d-flex flex-column align-center justify-center transition-fast-in-fast-out opacity-25 v-card--reveal text-h2"
                              style="
                                height: 100%;
                                background-color: rgba(
                                  var(--v-theme-primary),
                                  0.4
                                );
                              "
                            >
                              <h3 class="text-h3 text-center text-white">
                                {{ band }}
                              </h3>
                              <v-btn
                                color="white"
                                icon
                                variant="text"
                                size="60"
                                @click="clearFile(band)"
                              >
                                <v-icon size="60" :icon="CloseIcon"></v-icon>
                              </v-btn>
                            </div>
                          </v-expand-transition>
                        </v-img>
                      </v-card-text>
                    </v-card>
                  </v-hover>
                </v-col>
              </v-row>
            </v-card-item>
          </ToolsVGlassCard>
          <ToolsVGlassCard v-else transparent class="h-100">
            <v-card-item class="h-100 d-flex align-center justify-center">
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
                  <h2 class="text-h4 text-primary">Choose Project</h2>
                  <p class="text-primary mb-6 mt-4">
                    Want to continue on an existing project or start something
                    fresh? The choice is yours.
                  </p>
                  <SharedChooseProject @choose="selectProject">
                    <template #default="{ props }">
                      <v-btn v-bind="props"> Choose one </v-btn>
                    </template>
                  </SharedChooseProject>
                </v-card-text>
              </v-card>
            </v-card-item>
          </ToolsVGlassCard>
        </v-col>
      </div>
    </div>
  </div>
</template>
~/types/dto/ChooseFileDto
