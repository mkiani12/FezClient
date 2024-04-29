<script setup>
function onDragStart(event, nodeType) {
  if (event.dataTransfer) {
    event.dataTransfer.setData("application/vueflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  }
}
</script>

<template>
  <v-navigation-drawer permanent elevation="4">
    <v-list nav variant="tonal">
      <v-list-item
        prepend-icon="mdi-email"
        title="input"
        :draggable="true"
        @dragstart="onDragStart($event, 'input')"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account-supervisor-circle"
        title="default"
        :draggable="true"
        @dragstart="onDragStart($event, 'default')"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-clock-start"
        title="output"
        :draggable="true"
        @dragstart="onDragStart($event, 'output')"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
