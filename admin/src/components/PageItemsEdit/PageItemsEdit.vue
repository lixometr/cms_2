<template>
  <div class="page-items-edit">
    <BtnAdd @click="addItem" v-if="addBtn">
      {{ addBtn }}
    </BtnAdd>
    <CCardBody>
      <CDataTable :items="items" :fields="_fields" hover>
        <template #edit="{ item, index }">
          <td class="d-flex">
            <CButton color="danger" @click="deleteItem(index)">
              <CIcon name="cil-trash"></CIcon>
            </CButton>
            <CButton
              color="success"
              class="ml-2"
              @click="saveItem(index)"
              v-if="item.isChanged"
            >
              <CIcon name="cil-save"></CIcon>
            </CButton>
          </td>
        </template>
        <template v-for="(slot, name) in $scopedSlots" v-slot:[name]="opts">
          <slot :name="name" v-bind="opts" />
        </template>
      </CDataTable>
    </CCardBody>
  </div>
</template>

<script>
export default {
  props: {
    addBtn: [String, Boolean],
    items: {
      type: Array,
      default: () => [],
    },
    fields: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    _fields() {
      const currentFields = [...this.fields];
      if (currentFields.findIndex((field) => field.key === "edit") < 0) {
        currentFields.unshift({
          key: "edit",
          label: "Действия",
        });
      }
      return currentFields;
    },
  },
  methods: {
    deleteItem(index) {
      this.$emit("delete", index);
    },
    changeProp(value, index) {
      this.$emit("changeProp", { value, index });
    },
    saveItem(index) {
      this.$emit("save", index);
    },
    addItem() {
      this.$emit("add");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>