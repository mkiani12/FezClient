<script setup lang="ts">
const { data } = useAuth();
console.log(data.value);
</script>
<template>
  <v-row>
    <v-col cols="12">
      <v-row>
        <v-col cols="12">
          <DashboardTopbar />
        </v-col>
        <!-- Sales overview -->
        <v-col cols="12">
          <DashboardRecentProjects />
        </v-col>
        <!-- Yearly Breakup / Monthly Earnings -->
        <v-col cols="12" lg="7">
          <DashboardNextNews />
        </v-col>
        <v-col cols="12" lg="5">
          <DashboardDocuments />
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
