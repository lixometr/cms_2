<template>
  <CCard>
    <CCardBody>
      <div class="d-flex justify-content-end mb-3">
        <CButton color="danger" class="delete" @click="onDelete">
          <CIcon name="cil-trash"></CIcon>
        </CButton>
      </div>
      <AInput v-model="tabModel" label="Название вкладки" class="mb-3" />
      <ATextArea v-model="contentModel" label="Текст" />
    </CCardBody>
  </CCard>
</template>

<script>
import LocaleTextArea from "@/components/LocaleComponents/LocaleTextArea";
export default {
  components: {
    LocaleTextArea,
  },
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    tabModel: {
      get() {
        return this.value.tab;
      },
      set(tab) {
        this.$emit("input", { ...this.value, tab });
      },
    },
    contentModel: {
      get() {
        return this.value.content;
      },
      set(content) {
        this.$emit("input", { ...this.value, content });
      },
    },
  },
  methods: {
    onDelete() {
      this.$emit("delete");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>