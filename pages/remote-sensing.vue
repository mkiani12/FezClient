<script lang="ts" setup>
const open = ref(["Users"]);
const admins = ref([
  ["Management", "mdi-account-multiple-outline"],
  ["Settings", "mdi-cog-outline"],
]);
const cruds = ref([
  ["Create", "mdi-plus-outline"],
  ["Read", "mdi-file-outline"],
  ["Update", "mdi-update"],
  ["Delete", "mdi-delete"],
]);

import toolIcon from "~icons/material-symbols-light/arrow-selector-tool-outline-rounded";
import uploadIcon from "~icons/solar/cloud-upload-broken";

const chooseProjectDialog = ref(false);
</script>
<template>
  <v-row class="flex-column ma-0 h-100 w-100">
    <div class="">
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
            disabled
          >
            <v-icon size="40" :icon="toolIcon"> </v-icon>
            <span>Tool {{ n }}</span>
          </v-btn>
        </v-card-item>
      </ToolsVGlassCard>
    </div>
    <v-col class="pa-0">
      <v-row class="h-100 mt-0">
        <v-col class="pb-0" cols="2">
          <ToolsVGlassCard transparent class="h-100">
            <v-list
              v-model:opened="open"
              class="bg-transparent text-primary rounded-xl"
            >
              <v-list-item
                class="text-primary"
                title="Home"
                disabled
              ></v-list-item>

              <v-list-group value="Users">
                <template v-slot:activator="{ props }">
                  <v-list-item
                    class="text-primary"
                    v-bind="props"
                    title="Users"
                    disabled
                  ></v-list-item>
                </template>

                <v-list-item
                  class="text-primary pl-0"
                  title="Admin"
                  disabled
                ></v-list-item>
                <v-list-item
                  class="text-primary"
                  title="Actions"
                  disabled
                ></v-list-item>
              </v-list-group>
            </v-list>
          </ToolsVGlassCard>
        </v-col>
        <v-col class="pb-0" cols="10">
          <ToolsVGlassCard transparent class="h-100">
            <v-card-item
              v-if="true"
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
                  <v-dialog v-model="chooseProjectDialog" max-width="450">
                    <template #activator="{ props: activatorProps }">
                      <v-btn v-bind="activatorProps">
                        Upload File or Choose one</v-btn
                      >
                    </template>
                    <v-card rounded="xl" border="primary sm opacity-75">
                      <v-card-title class="px-6 pt-5">
                        Choose project
                      </v-card-title>
                      <v-card-text> </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                          text="Choose"
                          @click="chooseProjectDialog = false"
                        ></v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-card-text>
              </v-card>
            </v-card-item>
            <v-card-item v-else class="h-100">
              <v-card-title>Content</v-card-title>
            </v-card-item>
          </ToolsVGlassCard>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
