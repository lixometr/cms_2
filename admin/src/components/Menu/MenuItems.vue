<template>
  <div class="menu-items">
    <AppMultiplyer
      itemName="Элемент"
      addText="Добавить пункт"
      :value="value"
      @input="onInput"
    >
      <template v-slot:default="{ item, idx }">
        <MenuItem :value="item" @input="onItemChange($event, idx)" />
      </template>
    </AppMultiplyer>
  </div>
</template>

<script>
import MenuItem from "./MenuItem.vue";
import AppMultiplyer from "@/components/AppMultiplyer";
export default {
  components: { AppMultiplyer, MenuItem },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    onInput(values) {
      this.$emit("input", values);
    },
    onItemChange(newValue, idx) {
      const value = [...this.value];
      value[idx] = newValue;
      this.$emit("input", value);
    },
  },
};
</script>

<style lang="scss" >
</style>