<script setup lang="ts">
import {
  ChevronLeftIcon,
  ListCheckIcon,
  UserCircleIcon,
} from "vue-tabler-icons";

const { signOut, data } = useAuth();
const userInformation = data.value?.userInformations as UserInformations;
const userPositions = data.value?.userPositions as JobData[];

const selectedJob = useCookie("op:selected-job");
const { $event } = useNuxtApp();

const fullName = computed((): string => {
  return userInformation.firstname + " " + userInformation.lastname;
});

const activeJob = computed((): JobData | undefined => {
  return userPositions.find((p) => p.id == selectedJob.value);
});

const changeJob = (job: JobData) => {
  selectedJob.value = job.id?.toString();
  $event("op:job-change");
};

const logout = () => {
  const cookies = {
    selectedJob: useCookie("op:selected-job"),
  };

  signOut({ callbackUrl: "/auth/login" }).then(() => {
    cookies.selectedJob.value = null;
  });
};
</script>

<template>
  <!-- ---------------------------------------------- -->
  <!-- notifications DD -->
  <!-- ---------------------------------------------- -->
  <v-menu :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-btn
        class="profileBtn custom-hover-primary"
        variant="text"
        v-bind="props"
        icon
      >
        <v-avatar size="35" color="gray">
          <!-- <img src="/images/users/avatar-1.jpg" height="35" alt="user" /> -->
          <UserCircleIcon stroke-width="1.5" size="35" />
        </v-avatar>
      </v-btn>
    </template>
    <v-sheet rounded="md" elevation="10" class="mt-2">
      <v-list class="py-0" lines="one" density="compact">
        <v-list-item color="primary">
          <v-list-item-title class="text-body-1 text-center">
            {{ fullName }}
          </v-list-item-title>
        </v-list-item>
        <v-menu location="left">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" value="item2" color="primary">
              <template v-slot:append>
                <ChevronLeftIcon stroke-width="1.5" size="20" />
              </template>
              <v-list-item-title class="text-body-1">
                {{ activeJob?.postTitle + " - " + activeJob?.project }}
              </v-list-item-title>
            </v-list-item>
          </template>
          <v-sheet rounded="md" elevation="10" class="mt-2">
            <v-list class="py-0" lines="one" density="compact">
              <v-list-item
                v-for="job in userPositions"
                :value="job.id"
                :key="job.id"
                :active="selectedJob == job.id"
                color="primary"
                @click="changeJob(job)"
              >
                <v-list-item-title class="text-body-1 text-center">
                  {{ job.postTitle + " - " + job.project }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-sheet>
        </v-menu>
      </v-list>
      <div class="pt-4 pb-4 px-5 text-center">
        <v-btn
          to="/auth/login"
          color="primary"
          variant="outlined"
          block
          @click="logout"
        >
          خروج
        </v-btn>
      </div>
    </v-sheet>
  </v-menu>
</template>
