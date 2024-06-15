<script setup lang="ts">
/*Call Components*/
import Process from "~/components/dashboard/Process.vue";
import Requests from "~/components/dashboard/Requests.vue";
const { data } = useAuth();
console.log(data);
</script>
<template>
  <v-row>
    <v-col cols="12">
      <v-row>
        <v-col cols="12">
          <ToolsVGlassCard transparent>
            <v-card-text :class="true ? 'text-right' : 'text-left'">
              <v-btn variant="outlined" icon color="white">
                <v-icon> mdi-account-outline </v-icon>
              </v-btn>
            </v-card-text>
          </ToolsVGlassCard>
        </v-col>
        <!-- Sales overview -->
        <v-col cols="12">
          <ToolsVGlassCard transparent>
            <v-card-title class="pa-7 text-h3"> Recent projects </v-card-title>
            <v-card-text>
              <Process />
            </v-card-text>
          </ToolsVGlassCard>
        </v-col>
        <!-- Yearly Breakup / Monthly Earnings -->
        <v-col cols="12" lg="8">
          <ToolsVGlassCard transparent>
            <v-card-title class="pa-7 text-h3"> Climet Change </v-card-title>
            <v-card-text> </v-card-text>
          </ToolsVGlassCard>
        </v-col>
        <v-col cols="12" lg="4">
          <ToolsVGlassCard transparent>
            <v-card-title class="pa-7 text-h3"> Documents </v-card-title>
            <v-card-text> </v-card-text>
          </ToolsVGlassCard>
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
