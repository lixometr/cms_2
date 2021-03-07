<template>
  <div>
    <PageField
      v-for="(item, idx) in items"
      :template="item"
      :value="value[item.varName]"
      @input="onFieldChange(item, $event)"
      :key="idx"
      ref="fields"
    />
  </div>
</template>

<script>
import PageField from "./PageField";
export default {
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    PageField,
  },

  methods: {
    getFields() {
      return this.$refs.fields || [];
    },
    validate() {
      const itemsValid = this.getFields().map((component) => {
        return component.validate();
      });
      return !itemsValid.includes(false);
    },
    async onFieldChange(item, newValue) {
      const value = { ...this.value };
      value[item.varName] = newValue;
      this.$emit("input", value);
      await this.$nextTick();
      this.validate();
    },
  },
};
</script>

<style>
</style>