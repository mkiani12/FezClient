<script lang="ts" setup>
import { forms } from "@/data/formsData";
const items = shallowRef(forms);
</script>
<template>
  <div>
    <v-row>
      <v-col v-for="(item, i) in items" :key="i" cols="12" md="6">
        <v-card>
          <v-card-item>
            <v-card-title>{{ item.title }}</v-card-title>
          </v-card-item>
          <v-card-actions>
            <v-btn :to="`/forms/list/${item.url}`" color="primary">
              لیست
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
