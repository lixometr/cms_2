<template>
  <div class="page-items" v-if="!$store.getters.isLoading">
    <CCard v-if="showSearch">
      <CCardBody>
        <h6 class="mb-2">Поиск</h6>
        <CInput v-model="searchPhraseModel" />
      </CCardBody>
    </CCard>
    <BtnAdd @click="create" v-if="createBtn">{{ createBtn }}</BtnAdd>
    <AppPagination
      align="end"
      :activePage.sync="activePageModel"
      :pages="totalPages"
    />

    <CDataTable :items="items" :fields="_fields" border outlined striped>
      <template #edit="{ item }">
        <td>
          <div class="d-flex">
            <CButton color="warning" @click="editItem(item.id)">
              <CIcon name="cil-pencil"></CIcon>
            </CButton>
            <CButton color="danger" class="ml-2" @click="removeItem(item.id)">
              <CIcon name="cil-trash"></CIcon>
            </CButton>
          </div>
        </td>
      </template>
      <template v-for="(slot, name) in $scopedSlots" v-slot:[name]="props">
        <slot :name="name" v-bind="props" />
      </template>
    </CDataTable>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    fields: {
      type: Array,
      default: () => [],
    },
    showSearch: {
      type: Boolean,
      default: true,
    },
    searchPhrase: {
      type: String,
    },
    createBtn: {
      type: [String, Boolean],
    },
    activePage: {
      type: Number,
    },
    totalPages: {
      type: Number,
    },
  },
  computed: {
    activePageModel: {
      get() {
        return this.activePage;
      },
      set(value) {
        this.$emit("update:activePage", value);
      },
    },
    searchPhraseModel: {
      get() {
        return this.searchPhrase;
      },
      set(val) {
        this.$emit("update:searchPhrase", val);
      },
    },
    _fields() {
      const currentFields = [...this.fields];
      if (currentFields.findIndex((field) => field.key === "edit") < 0) {
        currentFields.push({
          key: "edit",
          label: "Действия",
        });
      }
      return currentFields;
    },
  },
  methods: {
    removeItem(id) {
      this.$emit("remove", id);
    },
    editItem(id) {
      this.$emit("edit", id);
    },
    create() {
      this.$emit("create");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>