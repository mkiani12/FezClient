<script setup lang="ts">
import { ref } from "vue";
import VueCountdown from "@chenfengyuan/vue-countdown";
/*-For Set Blank Layout-*/
definePageMeta({
  layout: "blank",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});

useHead({
  title: "Confirm your email",
});
const route = useRoute();
const router = useRouter();
const axios = useApi();
const notify = useSnackbarStore();

const otp = ref("");
const loading = ref(false);
const resendLoading = ref(false);

const counting = ref(false);
const startCountdown = () => {
  counting.value = true;
};
const onCountdownEnd = () => {
  counting.value = false;
};

const confirm = () => {
  loading.value = true;
  startCountdown();
  const credentials = {
    email: route.query.email,
    code: otp.value,
  };
  axios
    .post("/auth/confirm", credentials)
    .then((result) => {
      console.log(result);
      notify.showMessage("Email confirmed successfully", "success");
      loading.value = false;
      router.push("/auth/login");
    })
    .catch((e) => {
      if (e.message) {
        const { detail } = e.response.data;
        if (detail) {
          console.log(detail);
          notify.showMessage(detail, "error");
        }
      } else {
        console.log(e);
      }
      loading.value = false;
    });
};

const resendConfirmCode = () => {
  resendLoading.value = true;
  axios
    .post(`/auth/resend-confirmation?email=${route.query.email}`)
    .then((result) => {
      notify.showMessage("Confirmation code was successfully sent!", "success");
      startCountdown();
      resendLoading.value = false;
    })
    .catch((e) => {
      if (e.message) {
        const { detail } = e.response.data;
        if (detail) {
          console.log(detail);
          notify.showMessage(detail, "error");
        }
      } else {
        console.log(e);
      }
      resendLoading.value = false;
    });
};

onBeforeMount(() => {
  if (!route.query.email) {
    router.push("/auth/signup");
  }
});
</script>
<template>
  <div class="authentication">
    <v-container fluid class="pa-3">
      <v-row class="h-100vh d-flex justify-center align-center">
        <v-col cols="12" lg="4" xl="3" class="d-flex align-center">
          <div
            rounded="md"
            elevation="10"
            class="px-sm-1 px-0 withbg mx-auto"
            max-width="500"
          >
            <v-card-item class="pa-sm-8">
              <div class="d-flex justify-center py-4 mb-12">
                <LayoutFullLogoDynamicLogo width="188" />
              </div>

              <v-row class="d-flex mb-3">
                <v-col cols="12">
                  <h2 class="position-relative z-1">Confirm your Email</h2>
                </v-col>

                <v-col cols="12">
                  <VOtpInput
                    v-model="otp"
                    class="mx-n2"
                    length="5"
                    placeholder="*"
                    max-width="100%"
                    height="80"
                    @finish="confirm"
                  ></VOtpInput>
                </v-col>
                <v-col cols="12">
                  <VueCountdown
                    v-if="counting"
                    :time="60000"
                    @end="onCountdownEnd"
                    v-slot="{ totalSeconds }"
                  >
                    <h5 class="position-relative z-1 text-center">
                      Resend code in {{ totalSeconds }} seconds later
                    </h5>
                  </VueCountdown>
                  <v-btn
                    v-else
                    color="lightprimary"
                    size="large"
                    block
                    flat
                    :loading="resendLoading"
                    @click="resendConfirmCode"
                  >
                    Resend Verification Code
                  </v-btn>
                </v-col>

                <v-col cols="12">
                  <v-btn
                    color="lightprimary"
                    size="large"
                    block
                    flat
                    :loading="loading"
                    :disabled="otp.length < 5"
                    @click="confirm"
                  >
                    {{ $t("auth.signup") }}
                  </v-btn>
                </v-col>

                <v-col cols="12" class="pt-0">
                  <div class="z-10 position-relative">
                    <div class="mr-sm-auto">
                      <NuxtLink
                        to="/auth/login"
                        class="text-white text-decoration-none text-body-1 opacity-1"
                      >
                        {{ $t("auth.have-account") }}
                      </NuxtLink>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-card-item>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style lang="scss">
.color-fixed-textfield * {
  color: white !important;
}
</style>
