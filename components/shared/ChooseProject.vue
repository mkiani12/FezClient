<script setup lang="ts">
import placeholderImage from "~/assets/placeholders/placeholder.jpg";
import type { Project } from "~/types/projects/projects";
import type { ChooseProjectDto } from "~/types/dto/components/ChooseProjectDto";
import moment from "jalali-moment";

const emit = defineEmits<{
  (e: "choose", file: ChooseProjectDto): void;
}>();

const axios = useApi();
const notify = useSnackbarStore();

const chooseProjectDialog = ref(false);

const loading = ref(false);
const projectList = ref<Project[]>([]);

const selectProject = (project: Project) => {
  emit("choose", project);
  chooseProjectDialog.value = false;
};

const getProjectList = () => {
  loading.value = true;
  axios
    .get("/project/list/?skip=0&limit=10")
    .then(({ data }) => {
      console.log(data);

      loading.value = false;
      projectList.value = data;
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
  <v-dialog v-model="chooseProjectDialog" max-width="600">
    <template #activator="{ props: activatorProps }">
      <slot :props="activatorProps"></slot>
    </template>
    <v-scroll-y-transition leave-absolute>
      <v-card rounded="xl" border="primary sm opacity-75">
        <v-card-title class="px-6 pt-5"> Choose project </v-card-title>
        <v-card-text class="overflow-y-auto" style="height: 500px">
          <v-row>
            <v-col
              v-for="(project, index) in projectList"
              :key="index"
              cols="12"
              md="6"
            >
              <v-card
                border="primary sm opacity-75"
                class="mx-auto pb-4 rounded-xl overflow-hidden"
                @click="selectProject(project)"
              >
                <v-img
                  height="200px"
                  :src="
                    project.files.length > 0 && project.files[0].thumbnail_path
                      ? project.files[0].thumbnail_path
                      : placeholderImage
                  "
                  cover
                ></v-img>

                <v-card-title>
                  {{ project.name }}
                </v-card-title>

                <v-card-subtitle>
                  {{ moment(project.created_at).format("DD MMMM YYYY") }}
                </v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-scroll-y-transition>
  </v-dialog>
</template>

<style scoped></style>
~/types/dto/ChooseProjectDto
