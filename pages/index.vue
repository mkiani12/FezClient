<script setup lang="ts">
/*Call Components*/
import LinkCards from "~/components/dashboard/LinkCards.vue";
import Process from "~/components/dashboard/Process.vue";
import Requests from "~/components/dashboard/Requests.vue";
</script>
<template>
  <v-row>
    <v-col cols="12">
      <v-row>
        <v-col cols="12">
          <LinkCards />
        </v-col>
        <!-- Sales overview -->
        <v-col cols="12" lg="8">
          <Process />
        </v-col>
        <!-- Yearly Breakup / Monthly Earnings -->
        <v-col cols="12" lg="4">
          <Requests />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
