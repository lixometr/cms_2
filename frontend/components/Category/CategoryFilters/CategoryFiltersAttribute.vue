<template>
  <AppSelect
    class="select-filter"
    :placeholder="name"
    :options="options"
    v-model="selectModel"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    attribute: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    name() {
      return this.attribute.attr.name;
    },
    attrValues() {
      return this.attribute.attrValues;
    },
    selectModel: {
      get() {
        return this.value[0];
      },
      set(val) {
        this.$emit("input", [val]);
      },
    },
    options() {
      return this.attrValues.map((val) => ({
        name: val.name,
        value: val.slug,
      }));
    },
  },
  methods: {
    onItemChange() {},
  },
};
</script>

<style lang="scss" >
</style>