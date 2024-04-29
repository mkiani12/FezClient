<script lang="ts" setup></script>
<template>
  <div class="mb-6">
    <v-card height="288">
      <template #prepend>
        <v-icon>mdi-information</v-icon>
      </template>
      <template #title>
        <div class="text-body-1">پیشنهادی</div>
      </template>
      <v-divider></v-divider>
      <v-card-item>
        <v-list density="compact">
          <v-list-item to="/forms/list/documents">
            لیست مدارک سازمانی
          </v-list-item>
        </v-list>
      </v-card-item>
    </v-card>
  </div>
  <div>
    <v-card height="288">
      <template #prepend>
        <v-icon>mdi-information</v-icon>
      </template>
      <template #title>
        <div class="text-body-1">درخواست ها</div>
      </template>
      <v-divider></v-divider>
      <v-card-item class="py-0">
        <v-list density="compact">
          <v-list-item to="/forms/create/request-to-create-document">
            درخواست تدوین مدرک
          </v-list-item>
        </v-list>
      </v-card-item>
    </v-card>
  </div>
</template>
