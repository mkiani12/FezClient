<script setup lang="ts">
import type { LogItem } from "~/types/process";

const props = defineProps<{
  items?: LogItem[];
  loading?: boolean;
}>();
</script>
<template>
  <div v-if="loading" class="pa-4 text-center w-100">
    <v-progress-circular indeterminate />
  </div>
  <div v-else v-for="(item, i) in props.items" :key="i" class="ma-4">
    <v-card v-if="item.statusNumber == 2" color="success" max-width="100%">
      <template #title>
        <span class="text-h6">
          {{ item.formName }}
        </span>
      </template>

      <v-card-text>
        <div class="mb-2">
          {{ item.name }}
        </div>
        <div class="mb-2">
          {{ item.positionTitle }}
        </div>
        <div v-if="item?.job" class="mb-2">
          {{ item.job }}
        </div>
        <div class="mb-2">
          {{ item.status }}
        </div>
        <div class="mb-2 text-left">
          {{ item.time }}
        </div>
      </v-card-text>
    </v-card>
    <v-card
      v-else
      :color="item.statusNumber == 1 ? 'error' : ''"
      max-width="100%"
    >
      <template #title>
        <span class="text-h6">
          {{ item.formName }}
        </span>
      </template>

      <v-card-text>
        <div class="mb-2">
          {{ item.name }}
        </div>
        <div class="mb-2">
          {{ item.positionTitle }}
        </div>
        <div v-if="item?.job" class="mb-2">
          {{ item.job }}
        </div>
        <div v-if="item.statusNumber == 1" class="mb-2 font-weight-bold">
          {{ item.status }}
        </div>
        <v-divider class="my-3"></v-divider>
        <v-row>
          <v-col v-for="(field, i) in item.formData" :key="i" md="6" cols="12">
            <div class="text-body-3 mb-1">{{ field.label }}</div>
            <div
              v-if="field.value && typeof field.value === 'object'"
              class="text-h6"
            >
              <div
                class="d-inline-block"
                v-for="(value, index) in field.value"
                :key="index"
              >
                <span v-if="field.type == 'file'">
                  <a :href="value" target="_blank">
                    <v-btn>
                      <v-icon> mdi-eye</v-icon>
                      مشاهده
                    </v-btn>
                  </a>
                </span>
                <span v-else>
                  {{ value + (index == field.value.length - 1 ? "" : " ,") }}
                </span>
              </div>
            </div>
            <div v-else class="text-h6">{{ field.value }}</div>
          </v-col>
        </v-row>
        <v-divider class="my-3"></v-divider>
        <div class="mb-2 text-left">
          {{ item.time }}
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
