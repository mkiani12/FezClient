<script setup lang="ts">
import type { Project } from "~/types/projects/projects";

import placeholderImage from "~/assets/placeholders/placeholder.jpg";

const axios = useApi();
const { validationRules: rules } = useValidation();
const notify = useSnackbarStore();
import moment from "jalali-moment";

const loading = ref(false);
const projectList = ref<Project[]>([]);

const addProjectDialog = ref(false);
const addProjectLoading = ref(false);
const addProjectValidated = ref(false);

const addProjectName = ref("");
const addProjectDescription = ref("");

const addProject = () => {
  addProjectDialog.value = false;
  addProjectLoading.value = true;

  const addProjectData = {
    name: addProjectName.value,
    description: addProjectDescription.value,
  };

  axios
    .post("/project/", addProjectData)
    .then((result) => {
      console.log(result);
      addProjectName.value = "";
      addProjectDescription.value = "";
      addProjectLoading.value = false;
    })
    .catch((e) => {
      addProjectName.value = "";
      addProjectDescription.value = "";
      addProjectLoading.value = false;
      if (e.response) {
        const { detail } = e.response.data;
        if (detail) {
          console.log(detail);
          notify.showMessage(detail, "error");
        }
      } else {
        console.log(e);
      }
    });
};

const getProjectList = () => {
  loading.value = true;
  axios
    .get("/project/list/?skip=0&limit=10")
    .then(({ data }) => {
      loading.value = false;
      projectList.value = data;
      console.log([...data]);

      data.forEach((element: Project) => {
        if (element.files.length > 0) {
          element.first_file = element.files.shift();
        }
      });
    })
    .catch((e) => {
      loading.value = false;
      if (e.response) {
        const { detail } = e.response.data;
        if (detail) {
          console.log(detail);
          notify.showMessage(detail, "error");
        }
      } else {
        console.log(e);
      }
    });
};

onMounted(() => {
  getProjectList();
});
</script>
<template>
  <ToolsVGlassCard transparent>
    <v-card-title class="pa-4 pa-md-7 text-h2 font-weight-regular">
      Recent projects
    </v-card-title>
    <v-card-text class="px-md-6 px-4">
      <v-row>
        <v-col cols="7">
          <v-text-field
            label="Filter projects"
            density="compact"
            max-width="500"
          ></v-text-field>
        </v-col>
        <v-col cols="5" class="d-md-flex justify-end">
          <v-select
            max-width="200"
            label="Sort by"
            density="compact"
          ></v-select>
          <v-dialog v-model="addProjectDialog" max-width="450">
            <template #activator="{ props: activatorProps }">
              <v-btn v-bind="activatorProps" class="ml-3" icon color="primary">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <v-card rounded="xl" border="primary sm opacity-75">
              <v-card-title class="px-6 pt-5"> Add Project </v-card-title>
              <v-card-text>
                <v-form v-model="addProjectValidated">
                  <v-text-field
                    class="mb-3"
                    v-model="addProjectName"
                    :rules="[rules.required]"
                    label="Project name"
                  ></v-text-field>
                  <v-textarea
                    class="mb-3"
                    v-model="addProjectDescription"
                    label="Description"
                  ></v-textarea>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  text="Add Project"
                  :disabled="!addProjectValidated"
                  @click="addProject"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-sheet color="transparent">
            <v-slide-group
              class="px-4 mx-md-n6 mx-n8 projects-slide"
              selected-class="bg-success"
            >
              <v-slide-group-item
                v-for="(project, index) in projectList"
                :key="index"
              >
                <ToolsVGlassCard
                  class="ma-4 border-white"
                  :card-props="{ width: 350, height: 250 }"
                >
                  <v-card-title class="text-h3 mt-1 text-primary">
                    {{ project.name }}
                    <span class="text-white text-h6 font-weight-regular">
                      {{ project.subtitle }}
                    </span>
                  </v-card-title>
                  <v-card-text class="px-4">
                    <div class="d-flex mb-2">
                      <div>
                        <v-img
                          :src="
                            project.first_file
                              ? project.first_file.path
                              : placeholderImage
                          "
                          class="rounded-lg border-primary border"
                          width="80"
                          height="80"
                        ></v-img>
                      </div>
                      <div class="pl-2 text-body-2">
                        <p>
                          Last action:
                          <span class="text-primary">
                            {{ project.last_action ?? "No action yet" }}
                          </span>
                        </p>
                        <p class="desc-text mt-2">
                          Description:
                          <span class="text-primary">
                            {{ project.description }}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div class="d-flex">
                      <div class="images-box">
                        <v-img
                          v-for="file in project.files"
                          :key="file.id"
                          src="https://picsum.photos/200"
                          class="rounded-lg border-primary border"
                          width="35"
                          height="35"
                        ></v-img>
                      </div>
                      <div class="pl-2 text-body-2">
                        <p>
                          Created at:
                          <span class="text-primary">
                            {{
                              moment(project.created_at).format("DD MMMM YYYY")
                            }}
                          </span>
                        </p>
                        <p class="mt-2">
                          <span>
                            <v-chip density="compact" color="primary">
                              {{ project.tag }}
                            </v-chip>
                          </span>
                        </p>
                        <p class="mt-2">
                          Modified
                          <span class="text-primary">
                            {{
                              moment(project.updated_at).format("DD MMMM YYYY")
                            }}
                          </span>
                        </p>
                      </div>
                    </div>
                  </v-card-text>
                </ToolsVGlassCard>
              </v-slide-group-item>
              <template v-if="loading">
                <v-slide-group-item v-for="i in 4" :key="i">
                  <ToolsVGlassCard
                    class="ma-4 border-white"
                    :card-props="{ width: 350, height: 250 }"
                  >
                    <v-skeleton-loader
                      :loading="loading"
                      class="skeleton-fullscreen bg-transparent rounded-xl overflow-hidden"
                      height="250"
                      type="image"
                    >
                    </v-skeleton-loader>
                  </ToolsVGlassCard>
                </v-slide-group-item>
              </template>
              <v-slide-group-item v-if="projectList.length < 1 && !loading">
                <ToolsVGlassCard
                  class="ma-4 border-white"
                  :card-props="{ width: 350, height: 250 }"
                >
                  <v-card-text
                    class="d-flex align-center justify-center h-100 flex-column"
                  >
                    <v-card-title class="text-center">
                      There is no Project <br />
                      try to make one
                    </v-card-title>
                    <v-btn
                      icon
                      color="primary"
                      @click="addProjectDialog = true"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </v-card-text>
                </ToolsVGlassCard>
              </v-slide-group-item>
            </v-slide-group>
          </v-sheet>
        </v-col>
      </v-row>
    </v-card-text>
  </ToolsVGlassCard>
</template>

<style lang="scss">
.skeleton-fullscreen .v-skeleton-loader__image {
  height: 100% !important;
}

.desc-text {
  display: -moz-box;
  display: -webkit-box;
  max-width: 200px;
  -moz-line-clamp: 3;
  -moz-box-orient: vertical;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.images-box {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  min-width: 78px;
}

.projects-slide {
  .v-slide-group__prev--disabled,
  .v-slide-group__next--disabled {
    overflow: hidden;
    max-width: 0;
    min-width: 0;
  }

  .v-slide-group__prev,
  .v-slide-group__next {
    color: rgb(255, 255, 255);
    transition: all 0.2s ease-in-out;
  }
}
</style>
