<script setup>
const props = defineProps({ item: Object });
</script>

<template>
  <!---Single Item-->
  <nuxt-link
    v-slot="{ navigate, isExactActive }"
    :to="item.to"
    :external="item.type === 'external'"
    class="f-menu-item text-center"
    exact-active-class="f-active-menu"
  >
    <v-tooltip :text="item.title">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          :disabled="item.disabled"
          variant="text"
          icon
          size="70"
          class="my-1"
          :color="isExactActive ? 'primary' : 'lightprimary'"
          @click="navigate"
        >
          <v-icon size="45"> {{ item.icon }} </v-icon>
        </v-btn>
      </template>
    </v-tooltip>
  </nuxt-link>
</template>
