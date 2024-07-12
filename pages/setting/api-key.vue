<script setup lang="ts">
const axios = useApi();

import copyIcon from "~icons/material-symbols-light/content-copy-outline-rounded";

const keyName = ref("");
const loading = ref(false);

const generateApiKey = () => {
  loading.value = true;
  axios
    .post(`/apikey/generate-apikey?name=${keyName.value}`)
    .then((result) => {
      console.log(result);
      loading.value = false;
    })
    .catch((err) => {
      console.log(err);
      loading.value = false;
    });
};

const apiKey = ref("You have to generate one first");
const noApiKey = ref(true);
</script>
<template>
  <ToolsVGlassCard transparent class="h-100">
    <v-card-text>
      <v-row>
        <v-col>
          <v-card-title class="text-h2 font-weight-regular">
            Api Key
          </v-card-title>
          <v-card-text class="px-4 pt-4 text-h5 font-weight-regular">
            To create a third-party access interface, you must generate an API
            key and use that interface as your authentication for FEZcore
            system. <br />
            Use the link below for how-to documentation.
          </v-card-text>
          <v-card-item class="px-4">
            <v-row>
              <v-col cols="12" md="7">
                <v-form class="text-end">
                  <v-text-field
                    v-model="keyName"
                    class="my-3"
                    label="Key name"
                  ></v-text-field>
                  <v-btn
                    class="mb-3"
                    text="Generate"
                    color="primary"
                    size="large"
                    :disabled="keyName.length < 1"
                    @click="generateApiKey"
                  ></v-btn>
                </v-form>
              </v-col>
            </v-row>
            <v-row class="mt-md-12">
              <v-col cols="12" md="7">
                <v-form class="text-start">
                  <v-textarea
                    :model-value="apiKey"
                    class="mb-3"
                    label="Api key"
                    readonly
                  ></v-textarea>
                  <v-btn
                    class="mb-3"
                    variant="text"
                    icon
                    color="white"
                    :disabled="noApiKey"
                  >
                    <v-icon :icon="copyIcon"></v-icon>
                  </v-btn>
                </v-form>
              </v-col>
            </v-row>
          </v-card-item>
        </v-col>
      </v-row>
    </v-card-text>
  </ToolsVGlassCard>
</template>
