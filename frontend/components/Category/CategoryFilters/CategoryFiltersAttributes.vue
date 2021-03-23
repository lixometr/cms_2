<template>
  <div>
    <CategoryFiltersAttribute
      :attribute="attribute"
      :value="activeAttributes[attribute.attr.slug]"
      @input="onItemChange($event, attribute)"
      v-for="(attribute, idx) in attributes"
      :key="idx"
    />
  </div>
</template>

<script>
export default {
  props: {},
  computed: {
    activeAttributes() {
      return this.$store.getters["filters/activeAttributes"];
    },
    attributes() {
      return this.$store.getters["filters/attributes"];
    },
  },
  methods: {
    onItemChange(newValues, attribute) {
      this.$store.commit("filters/changeAttr", {
        name: attribute.attr.slug,
        value: newValues,
      });
    },
  },
};
</script>

<style lang="scss" >
</style>