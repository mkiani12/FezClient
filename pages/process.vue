<script setup lang="ts">
definePageMeta({
  layout: "blank",
});
</script>
<template>
  <v-layout>
    <v-app-bar density="compact" elevation="1">
      <v-btn to="/" icon>
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>

      <v-toolbar-title>روند ها</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs align-tabs="title">
          <v-tab to="/process/code-view" exact> ویرایش کد </v-tab>
          <v-tab to="/process" exact> دیاگرام </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <NuxtPage keepalive />
  </v-layout>
</template>
