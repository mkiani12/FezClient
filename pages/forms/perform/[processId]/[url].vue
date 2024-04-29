<script lang="ts" setup>
import VFormBase from "~/components/tools/VFormBase.vue";
const $axios = useApi();
const route = useRoute();
const router = useRouter();

let schema = reactive({});
let value = ref({});
const form = ref(null as any);
const loading = ref(false);

const submiting = ref(false);

const submit = () => {
  submiting.value = true;
  $axios
    .postForm(
      `/form/${route.params.url}/create/?pfid=${route.params.processId}`,
      value.value
    )
    .then(async ({ status }) => {
      if (status == 200) {
        await $axios.post(`/processFlow/move/${route.params.processId}`);
      }

      submiting.value = false;
      form.value.reset();
      router.push(`/`).catch((err) => {
        console.log(err);
      });
    })
    .catch((err: any) => {
      console.log(err);
      submiting.value = false;
    });
};

const getFormSchema = async () => {
  await $axios
    .get(`/form/${route.params.url}`)
    .then(({ data, status }) => {
      if (status == 200) {
        console.log(data);
        schema = data.schema;
        value.value = data.model;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const closeProcessDialog = ref(false);
const closingProcess = ref(false);

const closeProcess = () => {
  closingProcess.value = true;
  $axios
    .post(`/processFlow/fullReject/${route.params.processId}`)
    .then((result) => {
      console.log(result);
      closingProcess.value = false;
      closeProcessDialog.value = false;
      router.push(`/`).catch((err) => {
        console.log(err);
      });
    })
    .catch((err) => {
      console.log(err);
      closingProcess.value = false;
      closeProcessDialog.value = false;
    });
};

const rejectDialog = ref(false);

const rejected = () => {
  rejectDialog.value = false;
  router.push("/");
};

const loadContent = async () => {
  loading.value = true;
  await getFormSchema();
  loading.value = false;
};

const log = (logs: any) => {
  console.log(logs);
};

onBeforeMount(() => {
  loadContent();
});
</script>
<template>
  <v-form ref="form">
    <VFormBase
      v-model="value"
      :schema="schema"
      :loading="loading"
      :col="{
        cols: 12,
        sm: 6,
        md: 4,
      }"
      @update:model-value="log"
    />
    <v-row>
      <v-col>
        <v-btn class="ml-2" :loading="submiting" @click="submit">
          ثبت اطلاعات
        </v-btn>
        <v-dialog v-model="rejectDialog" max-width="600">
          <template #activator="{ props }">
            <v-btn class="ml-2" color="error" v-bind="props">رد و ارجاع</v-btn>
          </template>

          <FormsRejectAndReturn
            @close="rejectDialog = false"
            @submit="rejected"
          />
        </v-dialog>
        <v-dialog v-model="closeProcessDialog" max-width="500">
          <template #activator="{ props }">
            <v-btn class="ml-2" color="error" v-bind="props">ابطال روند</v-btn>
          </template>
          <v-card>
            <v-card-title class="text-h5">
              آیا میخواهید روند را باطل کنید ؟
            </v-card-title>
            <v-card-text>
              روند به طور کلی بسته خواهد شد و به درخواست کننده اطلاع داده میشود.
              داده های روند قابل بازیابی نمیباشند، آیا مطمئن هستید ؟
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="success" @click="closeProcessDialog = false">
                لغو
              </v-btn>
              <v-btn color="error" @click="closeProcess"> تایید </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-form>
</template>
