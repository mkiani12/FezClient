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

const formValid = ref(false);

const receiver = ref<string | null>(null);
const receiverOptions = ref<SelectOption[]>([]);
const attachment = ref<File[]>([]);
const description = ref<string>("");

const rejecting = ref(false);

const emit = defineEmits(["close", "submit"]);

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
      console.log("submit");
      emit("submit");
    })
    .catch((err: any) => {
      console.log(err);
      rejecting.value = false;
    });
};

const loading = ref(false);

const getOptions = () => {
  loading.value = true;
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
      loading.value = false;
    })
    .catch((err) => {
      console.log(err);
      loading.value = false;
    });
};

onBeforeMount(() => {
  getOptions();
});
</script>
<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">ارجاع</span>
    </v-card-title>
    <v-card-text>
      <v-form class="py-3" v-model="formValid">
        <v-row>
          <v-col cols="12" md="6">
            <v-select
              v-model="receiver"
              :items="receiverOptions"
              :rules="[rules.required]"
              :loading="loading"
              label="دریافت کننده"
              :menu-props="{ offset: 275 }"
            >
            </v-select>
          </v-col>
          <v-col cols="12" md="6">
            <v-file-input
              v-model="attachment"
              :rules="[rules.requiredArray]"
              label="فایل ضمیمه"
            ></v-file-input>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-textarea
              v-model="description"
              :rules="[rules.required]"
              label="توضیحات"
            ></v-textarea>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-btn
              class="ml-2"
              :disabled="!formValid"
              :loading="rejecting"
              @click="rejectProcess"
            >
              رد و ارجاع
            </v-btn>
            <v-btn class="ml-2" @click="emit('close')"> لفو </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>
