<script setup lang="ts">
const { localeProperties } = useI18n();
const { dir } = localeProperties.value;
</script>

<template>
  <v-locale-provider :rtl="dir == 'rtl'">
    <v-app class="f-main-container">
      <div class="f-main-overlay py-7">
        <LayoutFullMain />
        <v-main class="mr-md-6 mx-2 mx-md-0 pb-1 h-100">
          <ToolsVGlassCard class="h-100">
            <v-card-text>
              <NuxtPage />
            </v-card-text>
          </ToolsVGlassCard>
        </v-main>
      </div>
    </v-app>
  </v-locale-provider>
</template>
