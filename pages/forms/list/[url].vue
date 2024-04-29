<script lang="ts" setup>
const route = useRoute();
const $axios = useApi();

interface TableHeader {
  title: string;
  key: string;
  align?: "end" | "start" | "center";
  width?: string;
}

interface TableCols {
  title: string;
  value: string | number;
}

const itemsPerPageItems = ref([
  {
    title: "10",
    value: 10,
  },
  {
    title: "15",
    value: 15,
  },
  {
    title: "20",
    value: 20,
  },
  {
    title: "30",
    value: 30,
  },
  {
    title: "همه",
    value: -1,
  },
]);
const itemsPerPage = ref(10);

const search = ref("");
const filterBy = ref<string | null>(null);
const loading = ref(true);

const headers = ref<TableHeader[]>([]);
const serverItems = ref<any[]>([]);

const totalItems = ref(0);
const page = ref(1);
const pageCount = computed(() => {
  return Math.ceil(totalItems.value / itemsPerPage.value);
});

const cols = ref<TableCols[]>([]);
const selectedCols = ref<TableCols[]>([]);
const unselectedCols = computed((): TableCols[] => {
  return cols.value.filter((e) => !selectedCols.value.includes(e));
});

const addCol = (col: TableCols) => {
  selectedCols.value.push(col);
  doFilter();
};

const removeCol = (col: TableCols) => {
  selectedCols.value = selectedCols.value.filter((c) => c.value !== col.value);
  doFilter();
};

const loadItems = async ({ page, itemsPerPage, sortBy }: any) => {
  loading.value = true;
  console.log(sortBy);

  const listOptions = {
    page,
    itemsPerPage,
    sortBy: sortBy[0] ?? {},
    filter: search.value,
    filterBy: filterBy.value,
    selectedCols: selectedCols.value,
  };
  console.log("config", listOptions);

  if (selectedCols.value.length) {
    await $axios
      .post(`/form/${route.params.url}/list`, listOptions)
      .then(({ data: body }) => {
        console.log("items", body);
        serverItems.value = body.data;
        headers.value = body.headers;
        totalItems.value = body.itemLength;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  loading.value = false;
};

const doFilter = async () => {
  await loadItems({
    page: page.value,
    itemsPerPage: itemsPerPage.value,
    sortBy: [],
  });
};

onBeforeMount(async () => {
  await $axios
    .get(`/form/${route.params.url}/list/options`)
    .then(({ data }) => {
      console.log("options -->", data);
      cols.value = data.allColumns;
      selectedCols.value = cols.value.filter((e) => {
        for (const item of data.defaultColumns) {
          if (item.value == e.value) {
            return true;
          }
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
  await doFilter();
});
</script>
<template>
  <div>
    <v-data-table-server
      v-model:page="page"
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items-length="totalItems"
      :items="serverItems"
      :loading="loading"
      :search="search"
      class="rounded"
      @update:options="loadItems"
    >
      <template #item.actions="{ item }">
        <v-btn density="compact" :to="`/system/show-doc/${item.id}`">
          <v-icon>mdi-eye</v-icon>
          مشاهده
        </v-btn>
      </template>
      <template #item.statusDoc="{ item }">
        <span v-if="item.statusDoc == 1" class="text-success">معتبر</span>

        <span v-if="item.statusDoc == 2" class="text-warning">
          در دست تغییر
        </span>

        <span v-if="item.statusDoc == 3" class="text-error">نا معتبر</span>
      </template>
      <template #top>
        <v-row class="ma-0">
          <v-col class="d-flex align-items-center">
            <v-menu>
              <template #activator="{ props }">
                <v-btn v-bind="props"> افزودن ستون </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="col in unselectedCols"
                  :key="col.value"
                  @click="addCol(col)"
                >
                  {{ col.title }}
                </v-list-item>
                <v-list-item v-if="!unselectedCols.length">
                  آیتمی موجود نیست
                </v-list-item>
              </v-list>
            </v-menu>
            <v-chip-group>
              <v-chip
                v-for="col in selectedCols"
                :key="col.value"
                closable
                class="my-0"
                @click:close="removeCol(col)"
              >
                {{ col.title }}
              </v-chip>
            </v-chip-group>
          </v-col>
        </v-row>
        <v-row class="ma-0">
          <v-col class="d-md-flex">
            <div class="ml-1" style="width: 150px">
              <v-select
                label="فیلتر با"
                v-model="filterBy"
                :items="selectedCols"
                density="compact"
                @update:model-value="doFilter"
              >
              </v-select>
            </div>
            <v-text-field
              v-model="search"
              color="primary"
              prepend-inner-icon="mdi-magnify"
              density="compact"
              placeholder="فیلتر"
              @update:model-value="doFilter"
            ></v-text-field>
          </v-col>
          <v-col class="d-flex">
            <v-btn
              class="mr-auto"
              density="default"
              color="primary"
              prepend-icon="mdi-plus"
              :to="`/forms/create/${route.params.url}`"
            >
              افزودن
            </v-btn>
          </v-col>
        </v-row>
      </template>
      <template #bottom>
        <div class="pt-2 d-md-flex justify-start align-center">
          <div class="mr-3" style="width: 100px">
            <v-select
              v-model="itemsPerPage"
              :items="itemsPerPageItems"
              label="تعداد در صفحه"
              density="compact"
            ></v-select>
          </div>
          <div>
            <v-pagination v-model="page" :length="pageCount"></v-pagination>
          </div>
        </div>
      </template>
    </v-data-table-server>
  </div>
</template>
