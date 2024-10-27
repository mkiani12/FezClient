<script lang="ts" setup>
import BackIcon from "~icons/material-symbols/arrow-circle-left-outline-rounded";
import TrashIcon from "~icons/material-symbols/delete-outline-rounded";
import BandIcon from "~icons/material-symbols/document-scanner-outline-rounded";
import BeforeAfterIcon from "~icons/material-symbols/two-pager-rounded";
import TifIcon from "~icons/material-symbols/imagesmode-outline";

import { isEqual } from "lodash";

// todo: clean view and make components of this views

import { actions } from "~/data/actionsData";

import type { Project, ExportedFile } from "~/types/projects/projects";
import type {
  Band,
  Action,
  OperationMode,
  SelectedFiles,
} from "~/types/tools/tools";

const axios = useApi();
const notify = useSnackbarStore();
const projects = useProjectStore();
const { validationRules: rules } = useValidation();
const { $listen, $off } = useNuxtApp();

const selectedProject = ref<null | Project>(null);

const selectedFiles = ref<SelectedFiles>({
  bands: {
    RED: null,
    GREEN: null,
    BLUE: null,
    NIR: null,
    SWIR1: null,
    SWIR2: null,
  },
  before_after: {
    before: {
      RED: null,
      GREEN: null,
      BLUE: null,
      NIR: null,
      SWIR1: null,
      SWIR2: null,
    },
    after: {
      RED: null,
      GREEN: null,
      BLUE: null,
      NIR: null,
      SWIR1: null,
      SWIR2: null,
    },
  },
  tif: null,
});

const operationModes: OperationMode[] = [
  { title: "Bands", icon: BandIcon, value: "bands" },
  {
    title: "Before & after(bands)",
    icon: BeforeAfterIcon,
    value: "before_after",
  },
  { title: "Single file", icon: TifIcon, value: "tif" },
];

const selectedOperationMode = ref<OperationMode>({
  title: "Bands",
  icon: BandIcon,
  value: "bands",
});

const disabledTools = computed(() => {
  return isEqual(selectedFiles.value, {
    bands: {
      RED: null,
      GREEN: null,
      BLUE: null,
      NIR: null,
      SWIR1: null,
      SWIR2: null,
    },
    before_after: {
      before: {
        RED: null,
        GREEN: null,
        BLUE: null,
        NIR: null,
        SWIR1: null,
        SWIR2: null,
      },
      after: {
        RED: null,
        GREEN: null,
        BLUE: null,
        NIR: null,
        SWIR1: null,
        SWIR2: null,
      },
    },
    tif: null,
  });
});

const view = ref<"chooseProject" | "showExport">("chooseProject");
const selectedExport = ref<ExportedFile | null>(null);

const showExport = (exported: ExportedFile) => {
  selectedExport.value = exported;
  view.value = "showExport";
};

const clearShowExport = () => {
  selectedExport.value = null;
  view.value = "chooseProject";
};

const clearProject = () => {
  selectedProject.value = null;
  selectedFiles.value = {
    bands: {
      RED: null,
      GREEN: null,
      BLUE: null,
      NIR: null,
      SWIR1: null,
      SWIR2: null,
    },
    before_after: {
      before: {
        RED: null,
        GREEN: null,
        BLUE: null,
        NIR: null,
        SWIR1: null,
        SWIR2: null,
      },
      after: {
        RED: null,
        GREEN: null,
        BLUE: null,
        NIR: null,
        SWIR1: null,
        SWIR2: null,
      },
    },
    tif: null,
  };
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

const prepareOperationData = () => {
  let bands = {};

  if (selectedOperationMode.value.value == "bands") {
    bands = {
      red_band: selectedFiles.value.bands.RED
        ? selectedFiles.value.bands.RED.id
        : undefined,
      green_band: selectedFiles.value.bands.GREEN
        ? selectedFiles.value.bands.GREEN.id
        : undefined,
      blue_band: selectedFiles.value.bands.BLUE
        ? selectedFiles.value.bands.BLUE.id
        : undefined,
      nir_band: selectedFiles.value.bands.NIR
        ? selectedFiles.value.bands.NIR.id
        : undefined,
      swir1_band: selectedFiles.value.bands.SWIR1
        ? selectedFiles.value.bands.SWIR1.id
        : undefined,
      swir2_band: selectedFiles.value.bands.SWIR2
        ? selectedFiles.value.bands.SWIR2.id
        : undefined,
    };
  }

  const extra_params = {} as Record<string, string | number | null>;

  if (selectedInnerOperate.value?.extra_param) {
    for (const key in selectedInnerOperate.value?.extra_param) {
      if (
        Object.prototype.hasOwnProperty.call(
          selectedInnerOperate.value?.extra_param,
          key
        )
      ) {
        const param = selectedInnerOperate.value?.extra_param[key];

        extra_params[key] = param.value
          ? param.type == "Number"
            ? parseInt(param.value)
            : param.value
          : null;
      }
    }
  }

  const tif_file = selectedFiles.value.tif
    ? selectedFiles.value.tif.id
    : undefined;

  return {
    bands,
    extra_params,
    tif_file,
  };
};

const doOperate = () => {
  const data = prepareOperationData();

  operationLoading.value = true;
  axios
    .post(
      `/operation/?operation_type=${selectedInnerOperate.value?.type}&project_id=${selectedProject.value?.id}&title=${title.value}`,
      data
    )
    .then(({ data: exported }) => {
      console.log(exported);
      projects.addExportToProject(selectedProject.value?.id ?? 0, exported);
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
  let haveRequireBands = true;

  switch (selectedOperationMode.value.value) {
    case "bands":
      if (bands.length == 0) return false;
      for (const band of bands) {
        if (!selectedFiles.value.bands[band]) haveRequireBands = false;
      }
      break;
    case "before_after":
      if (bands.length == 0) return false;
      for (const band of bands) {
        if (!selectedFiles.value.before_after.before[band])
          haveRequireBands = false;
        if (!selectedFiles.value.before_after.after[band])
          haveRequireBands = false;
      }
      break;
    case "tif":
      if (!selectedFiles.value.tif) haveRequireBands = false;
      break;
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

onMounted(() => {
  $listen("project:delete-export", () => {
    projects.loadProjects(true);
  });
});

onBeforeUnmount(() => {
  $off("project:delete-export");
});
</script>
<template>
  <div class="flex flex-column ma-0 h-100 w-100">
    <!-- header -->
    <div class="tool-topbor overflow-x-auto">
      <v-dialog
        v-model="operationDialog"
        max-width="450"
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
                label="Title"
                :rules="[rules.required]"
              ></v-text-field>

              <v-text-field
                v-for="param in selectedInnerOperate.extra_param"
                v-model="param.value"
                class="my-2"
                :label="param.title"
                :type="param.type"
                :rules="[param.required ? rules.required : true]"
                :hint="param.typeHint"
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
            v-for="action in actions[selectedOperationMode.value]"
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
            <div
              class="tools-title text-body-2 d-flex flex-column justify-center"
            >
              <div>
                {{ action.title }}
              </div>
            </div>
          </v-btn>
          <v-btn v-if="selectedProject" class="ml-auto" color="primary" icon>
            <v-icon :icon="selectedOperationMode.icon"></v-icon>
            <v-tooltip activator="parent">
              {{ selectedOperationMode.title }}
            </v-tooltip>
            <v-menu activator="parent">
              <v-item-group v-model="selectedOperationMode">
                <v-list>
                  <v-item
                    v-for="mode in operationModes"
                    :key="mode.title"
                    :value="mode"
                    v-slot:default="{ toggle }"
                  >
                    <v-list-item @click="toggle" :prepend-icon="mode.icon">
                      <v-list-item-title>{{ mode.title }}</v-list-item-title>
                    </v-list-item>
                  </v-item>
                </v-list>
              </v-item-group>
            </v-menu>
          </v-btn>
        </v-card-text>
      </ToolsVGlassCard>
    </div>
    <!-- header -->
    <div class="tool-content">
      <div class="d-flex pt-3 h-100">
        <!-- sidebar -->
        <v-col class="pa-0" cols="2">
          <ToolsVGlassCard
            transparent
            class="overflow-hidden h-100 d-flex flex-column"
          >
            <v-card-text class="pa-0 overflow-y-auto">
              <SharedExportList
                :exports="selectedProject?.operation_output ?? []"
                @show-export="showExport"
              />
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
            <RemoteSensingBandsSelect
              v-if="selectedOperationMode.value == 'bands'"
              v-model="selectedFiles.bands"
              :project-id="selectedProject.id"
            />
            <RemoteSensingBeforeAfterSelect
              v-else-if="selectedOperationMode.value == 'before_after'"
              v-model="selectedFiles.before_after"
              :project-id="selectedProject.id"
            />
            <RemoteSensingSingleFileSelect
              v-else-if="selectedOperationMode.value == 'tif'"
              v-model="selectedFiles.tif"
              :project-id="selectedProject.id"
            />
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
          <SharedShowExport
            v-else-if="selectedExport"
            :project-id="selectedProject?.id ?? 0"
            :output="selectedExport"
          />
          <!-- showExportView -->
        </v-col>
        <!-- content -->
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.tools-title {
  height: 35px;
}
</style>
