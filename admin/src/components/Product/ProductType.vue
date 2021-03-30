<template>
  <Label label="Тип товара">
    <v-select
      :multiple="false"
      v-model="itemModel"
      :options="types"
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
    types() {
      return [
        {
          key: "simple",
          label: "Простой",
        },
        {
          key: "variation",
          label: "Вариативный",
        },
        {
          key: "kit",
          label: "Сгруппированный",
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
</style>