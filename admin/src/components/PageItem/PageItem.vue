<template>
  <div class="page-item" v-if="!$store.getters.isLoading">
    <CCard v-if="showInfo && !isNew">
      <CCardHeader>Информация</CCardHeader>
      <CCardBody>
        <div v-if="!isNew">
          Создан:
          <b>{{ item.createdAt | moment("DD.MM.YYYY hh:mm") }}</b>
        </div>
      </CCardBody>
    </CCard>
    <slot />
    <div>
      <BtnSave @click="save">Сохранить</BtnSave>
      <CButton color="danger" @click="onDelete">Удалить</CButton>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showInfo: {
      type: Boolean,
      default: true,
    },
    item: {
      type: Object,
      default: () => ({}),
    },
    isNew: Boolean,
  },
  methods: {
    save() {
      this.$emit("save");
    },
    onDelete() {
      this.$emit("delete");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>