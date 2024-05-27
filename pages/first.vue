<script lang="ts" setup>
const open = ref(["Users"]);
const admins = ref([
  ["Management", "mdi-account-multiple-outline"],
  ["Settings", "mdi-cog-outline"],
]);
const cruds = ref([
  ["Create", "mdi-plus-outline"],
  ["Read", "mdi-file-outline"],
  ["Update", "mdi-update"],
  ["Delete", "mdi-delete"],
]);
</script>
<template>
  <v-row class="flex-column ma-0 h-100 w-100">
    <div class="">
      <ToolsVGlassCard :card-props="{ height: 100 }" transparent>
        <v-card-item class="d-flex h-100 align-center py-1">
          <v-btn class="mx-1" variant="text" icon size="70" stacked>
            <v-icon size="40"> mdi-tools </v-icon>
            <span>Favorites</span>
          </v-btn>
          <v-btn class="mx-1" variant="text" icon size="70" stacked>
            <v-icon size="40"> mdi-tools </v-icon>
            <span>Favorites</span>
          </v-btn>
          <v-btn class="mx-1" variant="text" icon size="70" stacked>
            <v-icon size="40"> mdi-tools </v-icon>
            <span>Favorites</span>
          </v-btn>
          <v-btn class="mx-1" variant="text" icon size="70" stacked>
            <v-icon size="40"> mdi-tools </v-icon>
            <span>Favorites</span>
          </v-btn>
          <v-btn class="mx-1" variant="text" icon size="70" stacked>
            <v-icon size="40"> mdi-tools </v-icon>
            <span>Favorites</span>
          </v-btn>
          <v-btn class="mx-1" variant="text" icon size="70" stacked>
            <v-icon size="40"> mdi-tools </v-icon>
            <span>Favorites</span>
          </v-btn>
          <v-btn class="mx-1" variant="text" icon size="70" stacked>
            <v-icon size="40"> mdi-tools </v-icon>
            <span>Favorites</span>
          </v-btn>
          <v-btn class="mx-1" variant="text" icon size="70" stacked>
            <v-icon size="40"> mdi-tools </v-icon>
            <span>Favorites</span>
          </v-btn>
          <v-btn class="mx-1" variant="text" icon size="70" stacked>
            <v-icon size="40"> mdi-tools </v-icon>
            <span>Favorites</span>
          </v-btn>
          <v-btn class="mx-1" variant="text" icon size="70" stacked>
            <v-icon size="40"> mdi-tools </v-icon>
            <span>Favorites</span>
          </v-btn>
          <v-btn class="mx-1" variant="text" icon size="70" stacked>
            <v-icon size="40"> mdi-tools </v-icon>
            <span>Favorites</span>
          </v-btn>
          <v-btn class="mx-1" variant="text" icon size="70" stacked>
            <v-icon size="40"> mdi-tools </v-icon>
            <span>Favorites</span>
          </v-btn>
          <v-btn class="mx-1" variant="text" icon size="70" stacked>
            <v-icon size="40"> mdi-tools </v-icon>
            <span>Favorites</span>
          </v-btn>
          <v-btn class="mx-1" variant="text" icon size="70" stacked>
            <v-icon size="40"> mdi-tools </v-icon>
            <span>Favorites</span>
          </v-btn>
          <v-btn class="mx-1" variant="text" icon size="70" stacked>
            <v-icon size="40"> mdi-tools </v-icon>
            <span>Favorites</span>
          </v-btn>
          <v-btn class="mx-1" variant="text" icon size="70" stacked>
            <v-icon size="40"> mdi-tools </v-icon>
            <span>Favorites</span>
          </v-btn>
          <v-btn class="mx-1" variant="text" icon size="70" stacked>
            <v-icon size="40"> mdi-tools </v-icon>
            <span>Favorites</span>
          </v-btn>
          <v-btn class="mx-1" variant="text" icon size="70" stacked>
            <v-icon size="40"> mdi-tools </v-icon>
            <span>Favorites</span>
          </v-btn>
        </v-card-item>
      </ToolsVGlassCard>
    </div>
    <v-col class="pa-0">
      <v-row class="h-100 mt-0">
        <v-col class="pb-0" cols="2">
          <ToolsVGlassCard transparent class="h-100">
            <v-list
              v-model:opened="open"
              class="bg-transparent text-primary rounded-xl"
            >
              <v-list-item class="text-primary" title="Home"></v-list-item>

              <v-list-group value="Users">
                <template v-slot:activator="{ props }">
                  <v-list-item
                    class="text-primary"
                    v-bind="props"
                    title="Users"
                  ></v-list-item>
                </template>

                <v-list-group value="Admin">
                  <template v-slot:activator="{ props }">
                    <v-list-item
                      class="text-primary"
                      v-bind="props"
                      title="Admin"
                    ></v-list-item>
                  </template>

                  <v-list-item
                    class="text-primary"
                    v-for="([title], i) in admins"
                    :key="i"
                    :title="title"
                    :value="title"
                  ></v-list-item>
                </v-list-group>

                <v-list-group value="Actions">
                  <template v-slot:activator="{ props }">
                    <v-list-item
                      class="text-primary"
                      v-bind="props"
                      title="Actions"
                    ></v-list-item>
                  </template>

                  <v-list-item
                    class="text-primary"
                    v-for="([title], i) in cruds"
                    :key="i"
                    :title="title"
                    :value="title"
                  ></v-list-item>
                </v-list-group>
              </v-list-group>
            </v-list>
          </ToolsVGlassCard>
        </v-col>
        <v-col class="pb-0" cols="10">
          <ToolsVGlassCard transparent class="h-100">
            <v-card-item>
              <v-card-title>Content</v-card-title>
            </v-card-item>
          </ToolsVGlassCard>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
