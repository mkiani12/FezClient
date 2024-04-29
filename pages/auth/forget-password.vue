<script setup lang="ts">
import { ref } from "vue";
/*-For Set Blank Layout-*/
definePageMeta({
  layout: "blank",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});

const username = ref("");
const loading = ref(false);

const renewPassword = async () => {
  loading.value = true;
  const credential = {
    username: username.value,
  };

  console.log(credential);

  loading.value = false;
};
</script>
<template>
  <div class="authentication">
    <v-container fluid class="pa-3">
      <v-row class="h-100vh d-flex justify-center align-center">
        <v-col cols="12" lg="4" xl="3" class="d-flex align-center">
          <v-card
            rounded="md"
            elevation="10"
            class="px-sm-1 px-0 withbg mx-auto"
            max-width="500"
          >
            <v-card-item class="pa-sm-8">
              <div class="d-flex justify-center py-4">
                <LayoutFullLogo />
              </div>
              <div class="text-body-1 text-muted mb-3">
                برای بازنشانی گزرواژه خود نام کاربری را وارد کنید.
              </div>

              <v-row class="d-flex mb-3">
                <v-col cols="12">
                  <v-text-field
                    v-model="username"
                    label="نام کاربری"
                    color="primary"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <div class="text-body-1 text-muted mb-3">
                    در صورت عدم دسترسی به شماره همراه و یا فراموشی نام کاربری
                    خود با پشتیبانی تماس بگیرید.
                  </div>
                  <div>
                    <NuxtLink
                      to="/auth/login"
                      class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium"
                    >
                      بازگشت
                    </NuxtLink>
                  </div>
                </v-col>

                <v-col cols="12">
                  <v-btn
                    size="large"
                    block
                    flat
                    :loading="loading"
                    @click="renewPassword"
                  >
                    بازنشانی
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
