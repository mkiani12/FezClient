<script lang="ts" setup>
import type { VCard } from "vuetify/components";

const props = defineProps<{
  cardProps?: VCard | undefined | object;
}>();
</script>
<template>
  <v-card v-bind="cardProps" class="f-glass-card rounded-xl">
    <slot></slot>
  </v-card>
</template>
