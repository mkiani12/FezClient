<script setup lang="ts">
const cards = [
  {
    title: "مدارک سازمانی",
    icon: "mdi-file",
    link: "/",
  },
  {
    title: "دانلود نرم افزار",
    icon: "mdi-download",
    link: "/",
  },
  {
    title: "کتابخانه",
    icon: "mdi-library",
    link: "/",
  },
  {
    title: "فیلم های آموزشی",
    icon: "mdi-monitor",
    link: "/",
  },
  {
    title: "مدیریت دانش",
    icon: "mdi-brain",
    link: "/",
  },
];
</script>
<template>
  <v-row>
    <v-col
      v-for="(card, i) in cards"
      :key="i"
      :cols="i == cards.length - 1 ? 12 : 6"
      :sm="i == cards.length - 1 || i == cards.length - 2 ? 6 : 4"
      md=""
    >
      <v-card class="text-center" variant="outlined" :to="card.link">
        <v-card-item>
          <div class="mb-3">
            <v-icon size="40">
              {{ card.icon }}
            </v-icon>
          </div>
          <div class="text-xl mb-1">
            {{ card.title }}
          </div>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
</template>
