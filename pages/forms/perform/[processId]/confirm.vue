<script setup lang="ts">
interface SelectOption {
  title: string;
  value: string | number;
}

interface ProcessFlowStep {
  name: string;
  position: string;
  stepId: string;
}

const { validationRules: rules } = useValidation();
const $axios = useApi();
const route = useRoute();
const router = useRouter();

const formValid = ref(false);

const receiver = ref<string | null>(null);
const receiverOptions = ref<SelectOption[]>([]);
const attachment = ref<File[]>([]);
const description = ref<string>("");

const submiting = ref(false);

const submit = () => {
  submiting.value = true;
  $axios
    .postForm(`/form/confirm/create/?pfid=${route.params.processId}`)
    .then(async ({ status }) => {
      if (status == 200) {
        await $axios.post(`/processFlow/move/${route.params.processId}`);
      }
      submiting.value = false;
      router.push(`/`).catch((err) => {
        console.log(err);
      });
    })
    .catch((err: any) => {
      console.log(err);
      submiting.value = false;
    });
};

const rejecting = ref(false);

const rejectProcess = () => {
  rejecting.value = true;
  $axios
    .postForm(
      `/form/confirm/create/?pfid=${route.params.processId}&isRejecting=true`,
      {
        attachments: attachment.value,
        description: description.value,
      }
    )
    .then(async ({ status }) => {
      if (status == 200) {
        await $axios.post(`/processFlow/reject/${route.params.processId}`, {
          stepId: receiver.value,
        });
      }
      rejecting.value = false;
      router.push(`/`).catch((err) => {
        console.log(err);
      });
    })
    .catch((err: any) => {
      console.log(err);
      rejecting.value = false;
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

const getOptions = () => {
  $axios
    .get(`/processFlow/reject/${route.params.processId}`)
    .then(({ data, status }) => {
      if (status == 200) {
        console.log(data);
        receiverOptions.value = data.map((el: ProcessFlowStep) => {
          return {
            title: `${el.position} - ${el.name}`,
            value: el.stepId,
          };
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

onBeforeMount(() => {
  getOptions();
});
</script>
<template>
  <v-form v-model="formValid" @submit.prevent="submit">
    <v-row>
      <v-col cols="12" md="6">
        <v-select
          v-model="receiver"
          :items="receiverOptions"
          :rules="[rules.required]"
          label="دریافت کننده"
          outlined
          required
        ></v-select>
      </v-col>
      <v-col cols="12" md="6">
        <v-file-input
          v-model="attachment"
          :rules="[rules.requiredArray]"
          label="فایل ضمیمه"
          outlined
          required
        ></v-file-input>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-textarea
          v-model="description"
          :rules="[rules.required]"
          label="توضیحات"
          outlined
          required
        ></v-textarea>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-btn class="ml-2" type="submit" :disabled="formValid">تایید</v-btn>
        <v-btn
          class="ml-2"
          @click="rejectProcess"
          :disabled="!formValid"
          :loading="rejecting"
        >
          رد و ارجاع
        </v-btn>

        <v-dialog v-model="closeProcessDialog" max-width="500">
          <template #activator="{ props }">
            <v-btn class="ml-2" v-bind="props">ابطال روند</v-btn>
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
