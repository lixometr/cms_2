<template>
  <div>
    <SearchSelect
      :label="label"
      :value="value"
      @input="$emit('input', $event)"
      :multiple="multiple"
      :findItem="findItem"
      :searchItem="searchItem"
    >
    </SearchSelect>
  </div>
</template>

<script>
import SearchSelect from "@/components/SearchSelect";
export default {
  props: {
    value: [String, Array, Number],
    label: String,
    multiple: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    SearchSelect,
  },
  methods: {
    async findItem(id) {
      const { data: item } = await this.$api.get("pageById", { id });
      return item;
    },
    async searchItem(text, options) {
      try {
        const { data: items } = await this.$api.get(
          "pagesSearch",
          { text },
          { params: options }
        );
        return items;
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss">
</style>