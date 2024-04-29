<script setup lang="ts">
import { nextTick, watch } from "vue";
import { VueFlow, useVueFlow } from "@vue-flow/core";
import { Background } from "@vue-flow/background";
import { Controls } from "@vue-flow/controls";
import { MiniMap } from "@vue-flow/minimap";
import Nodes from "~/components/process/Nodes.vue";

let id = 0;
function getId() {
  return `dndnode_${id++}`;
}

const { findNode, onConnect, addEdges, addNodes, project, vueFlowRef }: any =
  useVueFlow({
    nodes: [
      {
        id: "1",
        type: "input",
        label: "input node",
        position: { x: 250, y: 25 },
      },
    ],
  });

function onDragOver(event: any) {
  event.preventDefault();

  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = "move";
  }
}

onConnect((params: any) => addEdges(params));

function onDrop(event: any) {
  const type = event.dataTransfer?.getData("application/vueflow");

  const { left, top } = vueFlowRef.value.getBoundingClientRect();

  const position = project({
    x: event.clientX - left,
    y: event.clientY - top,
  });

  const newNode = {
    id: getId(),
    type,
    position,
    label: `${type} node`,
  };

  addNodes([newNode]);

  // align node position after drop, so it's centered to the mouse
  nextTick(() => {
    const node = findNode(newNode.id);
    const stop = watch(
      () => node.dimensions,
      (dimensions) => {
        if (dimensions.width > 0 && dimensions.height > 0) {
          node.position = {
            x: node.position.x - node.dimensions.width / 2,
            y: node.position.y - node.dimensions.height / 2,
          };
          stop();
        }
      },
      { deep: true, flush: "post" }
    );
  });
}
</script>

<template>
  <v-main class="dndflow" @drop="onDrop">
    <Nodes />
    <VueFlow class="ltr" @dragover="onDragOver">
      <MiniMap />
      <Controls />
      <Background :pattern-color="false ? '#FFFFFB' : '#aaa'" :gap="8" />
    </VueFlow>
  </v-main>
</template>

<style>
/* import the necessary styles for Vue Flow to work */
@import "@vue-flow/core/dist/style.css";

/* import the default theme, this is optional but generally recommended */
@import "@vue-flow/core/dist/theme-default.css";

@import "@vue-flow/controls/dist/style.css";
@import "@vue-flow/minimap/dist/style.css";
</style>
