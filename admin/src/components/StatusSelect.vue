<template>
  <Label label="Статус">
    <v-select
      :multiple="false"
      v-model="itemModel"
      :options="statuses"
      label="label"
      :reduce="(item) => item.key"
      :searchable="false"
      :clearable="false"
    />
  </Label>
</template>

<script>
export default {
  props: {
    value: String,
  },
  computed: {
    itemModel: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
    statuses() {
      return [
        {
          label: "Опубликован",
          key: "published",
        },
        {
          label: "Черновик",
          key: "draft",
        },
        {
          label: "Не опубликован",
          key: "not-published",
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
</style>