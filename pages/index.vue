<script setup lang="ts">
/*Call Components*/
import profileIcon from "~icons/material-symbols-light/person-outline-rounded";

import geoinformaticsIcon from "~icons/material-symbols-light/satellite-alt-outline-rounded";
import articleIcon from "~icons/material-symbols-light/article-outline-rounded";
import geologyIcon from "~icons/hugeicons/geology-crust";
import softwareIcon from "~icons/iconoir/github";

const data = useAuth();
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
                <v-icon :icon="profileIcon" size="30"></v-icon>
              </v-btn>
            </v-card-text>
          </ToolsVGlassCard>
        </v-col>
        <!-- Sales overview -->
        <v-col cols="12">
          <ToolsVGlassCard transparent>
            <v-card-title class="pa-4 pa-md-7 text-h2 font-weight-regular">
              Recent projects
            </v-card-title>
            <v-card-text class="px-md-6 px-4">
              <v-row>
                <v-col cols="7">
                  <v-text-field
                    label="Filter projects"
                    density="compact"
                    max-width="500"
                  ></v-text-field>
                </v-col>
                <v-col cols="5" class="d-md-flex justify-end">
                  <v-select
                    max-width="200"
                    label="Sort by"
                    density="compact"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-sheet color="transparent">
                    <v-slide-group
                      class="px-4 mx-md-n6 mx-n8 projects-slide"
                      selected-class="bg-success"
                    >
                      <v-slide-group-item v-for="n in 5" :key="n">
                        <ToolsVGlassCard
                          class="ma-4 border-white"
                          :card-props="{ width: 350, height: 250 }"
                        >
                          <v-card-title class="text-h3 mt-1 text-primary">
                            Saqqez
                            <span
                              class="text-white text-h6 font-weight-regular"
                            >
                              Sensitive data
                            </span>
                          </v-card-title>
                          <v-card-text class="px-4">
                            <div class="d-flex mb-2">
                              <div>
                                <v-img
                                  src="https://picsum.photos/200"
                                  class="rounded-lg border-primary border"
                                  width="80"
                                  height="80"
                                ></v-img>
                              </div>
                              <div class="pl-2 text-body-2">
                                <p>
                                  Last action:
                                  <span class="text-primary">
                                    Image enhancement
                                  </span>
                                </p>
                                <p class="desc-text mt-2">
                                  Description:
                                  <span class="text-primary">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et
                                  </span>
                                </p>
                              </div>
                            </div>
                            <div class="d-flex">
                              <div class="images-box">
                                <v-img
                                  src="https://picsum.photos/200"
                                  class="rounded-lg border-primary border"
                                  width="35"
                                  height="35"
                                ></v-img>
                                <v-img
                                  src="https://picsum.photos/200"
                                  class="rounded-lg border-primary border"
                                  width="35"
                                  height="35"
                                ></v-img>
                                <v-img
                                  src="https://picsum.photos/200"
                                  class="rounded-lg border-primary border"
                                  width="35"
                                  height="35"
                                ></v-img>
                                <v-img
                                  src="https://picsum.photos/200"
                                  class="rounded-lg border-primary border"
                                  width="35"
                                  height="35"
                                ></v-img>
                              </div>
                              <div class="pl-2 text-body-2">
                                <p>
                                  Created at:
                                  <span class="text-primary">
                                    11 June 2024
                                  </span>
                                </p>
                                <p class="mt-2">
                                  <span>
                                    <v-chip density="compact" color="primary">
                                      Remote sensing
                                    </v-chip>
                                  </span>
                                </p>
                                <p class="mt-2">
                                  Modified
                                  <span class="text-primary"> 5 days ago </span>
                                </p>
                              </div>
                            </div>
                          </v-card-text>
                        </ToolsVGlassCard>
                      </v-slide-group-item>
                    </v-slide-group>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-card-text>
          </ToolsVGlassCard>
        </v-col>
        <!-- Yearly Breakup / Monthly Earnings -->
        <v-col cols="12" lg="7">
          <ToolsVGlassCard class="h-100" transparent>
            <v-card-title class="pa-4 pa-md-7 text-h2 font-weight-regular">
              Climet Change
              <span class="text-primary text-h6 font-weight-regular">
                Soon
              </span>
            </v-card-title>
            <v-card-text class="px-md-7 px-4 text-h6 font-weight-regular">
              Climate change involves long-term shifts in temperature and
              weather patterns, mainly due to human activities like burning
              fossil fuels and deforestation. These actions increase greenhouse
              gases in the atmosphere, causing global warming. The consequences
              include rising sea levels, extreme weather events, and disrupted
              ecosystems. Combating climate change requires global cooperation
              to reduce emissions, transition to renewable energy, and implement
              sustainable practices to mitigate its effects and adapt to the
              changing environment.
            </v-card-text>
          </ToolsVGlassCard>
        </v-col>
        <v-col cols="12" lg="5">
          <ToolsVGlassCard class="h-100" transparent>
            <v-card-title class="pa-4 pa-md-7 text-h2 font-weight-regular">
              Documents
            </v-card-title>
            <v-card-text class="px-md-5 px-4">
              <v-row class="ma-n1">
                <v-col cols="12" md="7">
                  <v-btn color="primary" size="x-large" block>
                    <v-icon
                      class="mr-4 ml-n4"
                      :icon="geoinformaticsIcon"
                      size="30"
                    ></v-icon>
                    Geoinformatics
                  </v-btn>
                </v-col>
                <v-col cols="12" md="5">
                  <v-btn color="primary" size="x-large" block>
                    <v-icon
                      class="mr-4 ml-n4"
                      :icon="articleIcon"
                      size="35"
                    ></v-icon>
                    Article
                  </v-btn>
                </v-col>
              </v-row>
              <v-row class="ma-n1">
                <v-col cols="12" md="6">
                  <v-btn color="primary" size="x-large" block>
                    <v-icon
                      class="mr-4 ml-n4"
                      :icon="geologyIcon"
                      size="30"
                    ></v-icon>
                    Geology
                  </v-btn>
                </v-col>
                <v-col cols="12" md="6">
                  <v-btn color="primary" size="x-large" block>
                    <v-icon
                      class="mr-4 ml-n4"
                      :icon="softwareIcon"
                      size="28"
                    ></v-icon>
                    Software
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
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
.desc-text {
  display: -moz-box;
  display: -webkit-box;
  max-width: 200px;
  -moz-line-clamp: 3;
  -moz-box-orient: vertical;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.images-box {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
}

.projects-slide {
  .v-slide-group__prev--disabled,
  .v-slide-group__next--disabled {
    overflow: hidden;
    max-width: 0;
    min-width: 0;
  }

  .v-slide-group__prev,
  .v-slide-group__next {
    color: rgb(255, 255, 255);
    transition: all 0.2s ease-in-out;
  }
}
</style>
