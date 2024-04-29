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
    .postForm(`/form/${route.params.url}/create`, value.value)
    .then((result: any) => {
      console.log(result);
      submiting.value = false;
      form.value.reset();
      router.push(`/forms/list/${route.params.url}`).catch((err) => {
        console.log(err);
      });
    })
    .catch((err: any) => {
      console.log(err);
      submiting.value = false;
    });
};
onMounted(() => {
  loading.value = true;

  $axios
    .get(`/form/${route.params.url}`)
    .then(({ data }) => {
      schema = data.schema;
      value.value = data.model;
      console.log(data);
      loading.value = false;
    })
    .catch((err: any) => {
      console.log(err);
      loading.value = false;
    });
});

const log = (data: any) => {
  console.log(data);
};
</script>
<template>
  <div>
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
      <v-btn class="mt-3" :loading="submiting" @click="submit">
        ثبت اطلاعات
      </v-btn>
    </v-form>
  </div>
</template>
