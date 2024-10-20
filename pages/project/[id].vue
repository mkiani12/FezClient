<script lang="ts" setup>
import TrashIcon from "~icons/material-symbols/delete-outline-rounded";

import moment from "jalali-moment";
import type { Project, ExportedFile } from "~/types/projects/projects";

const route = useRoute();
const axios = useApi();
const projects = useProjectStore();
const { mediaRules } = useValidation();
const notify = useSnackbarStore();

const id = route.params.id;
const project = ref<Project | null>(null);

const selectedImageIndex = ref(0);
const selectedImage = computed(() => {
  return project.value?.files[selectedImageIndex.value];
});
const selectImage = (index: number) => {
  selectedImageIndex.value = index;
};

const view = ref<"showFiles" | "showExport">("showFiles");
const selectedExport = ref<ExportedFile | null>(null);

const showExport = (exported: ExportedFile) => {
  selectedExport.value = exported;
  view.value = "showExport";
  console.log(exported);
};

const clearShowExport = () => {
  selectedExport.value = null;
  view.value = "showFiles";
};

const uploadFileDialog = ref(false);
const file = ref<File | null>(null);
const uploading = ref(false);
const uploadProgress = ref(0);

const uploadFile = () => {
  if (!uploading.value) {
    uploading.value = true;

    const uploadData = {
      file: file.value,
      filename: file.value?.name,
    };

    axios
      .postForm(`/file/upload?project_id=${id}`, uploadData, {
        onUploadProgress: (progressEvent) => {
          uploadProgress.value = Math.floor(
            (progressEvent.progress ?? 0) * 100
          );
        },
      })
      .then(({ data: newFile }) => {
        console.log(newFile);
        project.value?.files.push(newFile);
        uploading.value = false;
        file.value = null;
        uploadProgress.value = 0;
        uploadFileDialog.value = false;
      })
      .catch((e) => {
        console.log(e);
        uploading.value = false;
        uploadProgress.value = 0;
        notify.handleCatch(e);
      });
  }
};

const deleteProject = () => {
  projects.showDeleteDialog("Project", project.value);
};

const getProjectData = () => {
  axios
    .get(`/project/${id}`)
    .then(({ data: selectedProject }) => {
      console.log(selectedProject);
      project.value = selectedProject;
    })
    .catch((e) => {
      notify.handleCatch(e);
    });
};

onMounted(() => {
  getProjectData();
});
</script>
<template>
  <div v-if="project" class="flex flex-column ma-0 h-100 w-100">
    <div class="tool-topbor overflow-x-auto">
      <ToolsVGlassCard
        class="overflow-hidden d-flex align-center"
        :card-props="{ height: 100 }"
        transparent
      >
        <v-card-title class="d-flex align-center w-100 text-h2 text-primary">
          {{ project.name.toUpperCase() }}
          <span class="text-white text-h5 font-weight-regular">
            {{ project.subtitle }}
          </span>

          <v-btn class="ml-auto" icon variant="text" @click="deleteProject">
            <v-icon :icon="TrashIcon"></v-icon>
          </v-btn>
        </v-card-title>
      </ToolsVGlassCard>
    </div>
    <div class="tool-content-2">
      <div class="d-flex pt-3 h-100">
        <v-col class="pa-0" cols="2">
          <!-- sidebar -->
          <ToolsVGlassCard
            transparent
            class="h-100 d-flex flex-column overflow-hidden"
          >
            <v-card-text class="overflow-y-auto">
              <div class="mb-2 pl-2 text-body-2">
                <div>
                  Last action:
                  <span class="text-primary">
                    {{ project.last_action ?? "No action yet" }}
                  </span>
                </div>
                <div class="desc-text mt-2">
                  Description:
                  <span class="text-primary">
                    {{ project.description }}
                  </span>
                </div>
              </div>
              <div class="mb-2 pl-2 text-body-2">
                <div>
                  Created at:
                  <span class="text-primary">
                    {{ moment(project.created_at).format("DD MMMM YYYY") }}
                  </span>
                </div>
                <div class="mt-2">
                  Modified
                  <span class="text-primary">
                    {{ moment(project.updated_at).format("DD MMMM YYYY") }}
                  </span>
                </div>
                <div class="mt-2">
                  <div class="mb-1">Tags :</div>
                  <span>
                    <v-chip density="compact" color="primary">
                      {{ project.tag }}
                    </v-chip>
                  </span>
                </div>
                <v-list class="bg-transparent text-primary rounded-xl">
                  <div class="text-primary py-3">Exports</div>
                  <v-divider></v-divider>
                  <v-list-item
                    v-for="(exported, index) in project.operation_output"
                    :key="index"
                    class="text-primary px-0"
                    :title="exported.title"
                    @click="showExport(exported)"
                  ></v-list-item>
                  <div
                    v-if="!project || project.operation_output.length < 1"
                    class="text-primary text-center text-body-1 py-3"
                  >
                    There is no export yet!
                    <br />
                    try to export something
                  </div>
                </v-list>
              </div>
            </v-card-text>
            <v-card-actions>
              <div class="d-flex flex-column w-100">
                <v-btn
                  v-if="view == 'showExport'"
                  class="mb-2"
                  block
                  color="primary"
                  @click="clearShowExport"
                >
                  Close export
                </v-btn>
                <!-- file upload -->
                <v-dialog
                  v-model="uploadFileDialog"
                  max-width="450"
                  @update:modelValue="file = null"
                >
                  <template #activator="{ props: activatorProps }">
                    <v-btn
                      v-bind="activatorProps"
                      block
                      color="primary"
                      class="ml-0"
                    >
                      Upload File
                    </v-btn>
                  </template>
                  <v-card rounded="xl" border="primary sm opacity-75">
                    <v-card-title class="px-6 pt-5">
                      Choose a file to Upload
                    </v-card-title>
                    <v-card-text>
                      <v-file-input
                        v-model="file"
                        label="File"
                        accept="image/tiff"
                        :rules="[mediaRules.justTif]"
                      >
                      </v-file-input>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn
                        text="Upload"
                        @click="uploadFile"
                        :disabled="!file"
                      >
                        <v-progress-circular
                          v-if="uploading"
                          color="white"
                          size="25"
                          :model-value="uploadProgress"
                        ></v-progress-circular>
                        <span v-else> Upload File </span>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <!-- file upload -->
              </div>
            </v-card-actions>
          </ToolsVGlassCard>
          <!-- sidebar -->
        </v-col>
        <v-col class="pa-0 pl-3 max-h-100" cols="10">
          <!-- content -->
          <ToolsVGlassCard
            v-if="view == 'showFiles'"
            transparent
            class="h-100 d-flex flex-column"
          >
            <v-img
              :src="selectedImage?.image_path"
              class="my-4 image-dynamic-height"
              contain
            ></v-img>
            <v-sheet class="mt-auto" color="transparent">
              <v-slide-group v-model="selectedImageIndex">
                <v-slide-group-item
                  v-for="(image, index) in project.files"
                  :key="index"
                >
                  <v-card
                    class="ma-4 bg-transparent overflow-hidden rounded-xl"
                    height="150"
                    width="150"
                    border="primary sm opacity-75"
                  >
                    <v-img
                      :src="image.thumbnail_path"
                      height="150"
                      contain
                      @click="selectImage(index)"
                    ></v-img>
                  </v-card>
                </v-slide-group-item>
              </v-slide-group>
            </v-sheet>
          </ToolsVGlassCard>

          <ToolsVGlassCard v-else transparent class="h-100">
            <v-card-text class="h-100 d-flex align-center justify-center">
              <v-img :src="selectedExport?.image_path" height="100%"></v-img>
            </v-card-text>
          </ToolsVGlassCard>
          <!-- content -->
        </v-col>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.image-dynamic-height {
  height: calc(100% - 250px);
}
</style>
