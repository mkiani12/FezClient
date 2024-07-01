<script setup lang="ts"></script>
<template>
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
                    <span class="text-white text-h6 font-weight-regular">
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
                          <span class="text-primary"> Image enhancement </span>
                        </p>
                        <p class="desc-text mt-2">
                          Description:
                          <span class="text-primary">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
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
                          <span class="text-primary"> 11 June 2024 </span>
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
</template>
