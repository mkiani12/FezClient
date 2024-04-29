<script setup lang="ts">
import { useTheme } from "vuetify";
const theme = useTheme();
import wLogo from "~/assets/logo/white-logo.png";
</script>
<template>
  <div class="logo">
    <NuxtLink to="/">
      <v-img
        v-if="theme.global.current.value.dark"
        :src="wLogo"
        width="188"
      ></v-img>
      <v-img v-else :src="wLogo" width="188"></v-img>
    </NuxtLink>
  </div>
</template>
