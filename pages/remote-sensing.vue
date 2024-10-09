<script lang="ts" setup>
import CloseIcon from "~icons/material-symbols-light/cancel-outline-rounded";
import BackIcon from "~icons/material-symbols-light/arrow-circle-left-outline-rounded";

import { actions } from "~/data/actionsData";

import type { Project, ExportedFile } from "~/types/projects/projects";
import type { SelectedFiles, Band, Action } from "~/types/tools/tools";
import type { ChooseFileDto } from "~/types/dto/components/ChooseFileDto";

const axios = useApi();
const notify = useSnackbarStore();
const { validationRules: rules } = useValidation();

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

const view = ref<"chooseProject" | "showExport">("chooseProject");
const selectedExport = ref<ExportedFile | null>(null);

const showExport = (exported: ExportedFile) => {
  selectedExport.value = exported;
  view.value = "showExport";
  console.log(exported);
};

const clearShowExport = () => {
  selectedExport.value = null;
  view.value = "chooseProject";
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
  clearShowExport();
};

const selectProject = (project: Project) => {
  console.log(project);
  selectedProject.value = project;
};

const selectedOperate = ref<Action | null>(null);
const operationDialog = ref(false);
const title = ref("");
const operationLoading = ref(false);
const operationMode = ref<"single" | "group">("single");
const selectedInnerOperate = ref<Action | null>(null);

const operate = (action: Action) => {
  if (action.childrens && action.childrens.length > 0) {
    operationMode.value = "group";
    selectedOperate.value = action;
  } else {
    operationMode.value = "single";
    selectedInnerOperate.value = action;
  }
  operationDialog.value = true;
  console.log(action);
};

const selectInnerOperate = (action: Action) => {
  selectedInnerOperate.value = action;
  operationMode.value = "single";
};

const doOperate = () => {
  const bands = {
    red_band: selectedFiles.value.RED ? selectedFiles.value.RED.id : undefined,
    green_band: selectedFiles.value.GREEN
      ? selectedFiles.value.GREEN.id
      : undefined,
    blue_band: selectedFiles.value.BLUE
      ? selectedFiles.value.BLUE.id
      : undefined,
    nir_band: selectedFiles.value.NIR ? selectedFiles.value.NIR.id : undefined,
    swir1_band: selectedFiles.value.SWIR1
      ? selectedFiles.value.SWIR1.id
      : undefined,
    swir2_band: selectedFiles.value.SWIR2
      ? selectedFiles.value.SWIR2.id
      : undefined,
  };
  operationLoading.value = true;
  axios
    .post(
      `/operation/?operation_type=${selectedInnerOperate.value?.type}&project_id=${selectedProject.value?.id}&title=${title.value}`,
      {
        bands,
      }
    )
    .then(({ data: exported }) => {
      console.log(exported);
      selectedProject.value?.operation_output.push(exported);
      showExport(exported);
      operationDialog.value = false;
      title.value = "";
      operationLoading.value = false;
    })
    .catch((e) => {
      operationDialog.value = false;
      title.value = "";
      operationLoading.value = false;
      notify.handleCatch(e);
    });
};

const clearOperate = (value: boolean) => {
  if (!value) {
    operationMode.value = "single";
    selectedOperate.value = null;
    selectedInnerOperate.value = null;
  }
};
// returns true if required band isn't filled
const checkRequireBands = (bands: Band[]) => {
  if (bands.length == 0) return false;

  let haveRequireBands = true;
  for (const band of bands) {
    if (!selectedFiles.value[band]) haveRequireBands = false;
  }

  return !haveRequireBands;
};

const tooltipText = (action: Action) => {
  return `This tool requires ${action.requiredBands.join(",")} bands`;
};

const scrolling = (e: WheelEvent) => {
  const el = e.target as HTMLElement;
  e.preventDefault();
  el.scrollLeft += e.deltaY;
};
</script>
<template>
  <div class="flex flex-column ma-0 h-100 w-100">
    <!-- header -->
    <div class="tool-topbor overflow-x-auto">
      <v-dialog
        v-model="operationDialog"
        max-width="400"
        @update:model-value="clearOperate"
      >
        <v-card
          v-if="operationMode == 'group' && selectedOperate"
          rounded="xl"
          border="primary sm opacity-75"
        >
          <v-card-title class="d-flex align-center px-6 pt-5">
            {{ selectedOperate.title }}
            <v-btn
              class="ml-auto"
              icon
              variant="text"
              color="white"
              @click="clearOperate(false), (operationDialog = false)"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="overflow-y-auto pt-0">
            <v-list v-if="selectedOperate.childrens">
              <v-tooltip
                :text="tooltipText(childAction)"
                v-for="childAction in selectedOperate.childrens"
                :key="childAction.type"
                :disabled="
                  !(
                    disabledTools ||
                    checkRequireBands(childAction.requiredBands)
                  )
                "
              >
                <template v-slot:activator="{ props }">
                  <span v-bind="props">
                    <v-list-item
                      @click="selectInnerOperate(childAction)"
                      :prepend-icon="childAction.icon"
                      :disabled="
                        disabledTools ||
                        checkRequireBands(childAction.requiredBands)
                      "
                    >
                      {{ childAction.title }}
                    </v-list-item>
                  </span>
                </template>
              </v-tooltip>
            </v-list>
          </v-card-text>
        </v-card>
        <v-card
          v-else-if="operationMode == 'single' && selectedInnerOperate"
          rounded="xl"
          border="primary sm opacity-75"
        >
          <v-card-title class="px-6 pt-5">
            <v-btn
              v-if="selectedOperate && selectedOperate.childrens"
              variant="text"
              icon
              @click="operationMode = 'group'"
            >
              <v-icon :icon="BackIcon"></v-icon>
            </v-btn>

            {{ selectedInnerOperate.title }}
          </v-card-title>
          <v-card-text class="overflow-y-auto">
            {{ selectedInnerOperate.title }} can significantly change the image.
            Are you certain you want to proceed?

            <v-form @submit.prevent="doOperate">
              <v-text-field
                v-model="title"
                class="my-2"
                label="title"
                :rules="[rules.required]"
              ></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-btn
              :disabled="!selectedInnerOperate || title.length < 1"
              @click="doOperate"
              :loading="operationLoading"
            >
              Proceed
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
            :disabled="
              disabledTools ||
              checkRequireBands(action.childrens ? [] : action.requiredBands)
            "
            @click="operate(action)"
          >
            <v-icon size="40" :icon="action.icon"> </v-icon>
            <span class="text-body-2">{{ action.title }}</span>
          </v-btn>
        </v-card-text>
      </ToolsVGlassCard>
    </div>
    <!-- header -->
    <div class="tool-content">
      <div class="d-flex pt-3 h-100">
        <!-- sidebar -->
        <v-col class="pa-0" cols="2">
          <ToolsVGlassCard transparent class="h-100 d-flex flex-column">
            <v-card-text class="pa-0">
              <v-list class="bg-transparent text-primary rounded-xl">
                <p class="text-primary py-3 pl-4">Exports</p>
                <v-divider></v-divider>
                <v-list-item
                  v-for="(exported, index) in selectedProject?.operation_output"
                  :key="index"
                  class="text-primary"
                  :title="exported.unique_name"
                  @click="showExport(exported)"
                ></v-list-item>
                <p
                  v-if="
                    !selectedProject ||
                    selectedProject.operation_output.length < 1
                  "
                  class="text-primary text-center text-body-1 py-3"
                >
                  There is no export yet!
                  <br />
                  try to export something
                </p>
              </v-list>
            </v-card-text>

            <v-card-actions v-if="selectedProject" class="d-flex flex-column">
              <v-btn
                v-if="selectedExport"
                class="ma-0 mt-1"
                block
                color="primary"
                @click="clearShowExport"
              >
                Back
              </v-btn>
              <v-btn
                class="ma-0 mt-1"
                block
                color="primary"
                @click="clearProject"
              >
                Close Project
              </v-btn>
            </v-card-actions>
          </ToolsVGlassCard>
        </v-col>
        <!-- sidebar -->
        <!-- content -->
        <v-col class="pa-0 pl-3 max-h-100" cols="10">
          <!-- chooseProjectView -->
          <ToolsVGlassCard
            v-if="selectedProject && view == 'chooseProject'"
            transparent
            class="h-100"
          >
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
          <!-- chooseProjectView -->
          <!-- chooseFileView -->
          <ToolsVGlassCard
            v-else-if="view == 'chooseProject'"
            transparent
            class="h-100"
          >
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
          <!-- chooseFileView -->
          <!-- showExportView -->
          <ToolsVGlassCard v-else transparent class="h-100">
            <v-card-text class="h-100 d-flex align-center justify-center">
              <v-img :src="selectedExport?.image_path" height="100%"></v-img>
            </v-card-text>
          </ToolsVGlassCard>
          <!-- showExportView -->
        </v-col>
        <!-- content -->
      </div>
    </div>
  </div>
</template>
