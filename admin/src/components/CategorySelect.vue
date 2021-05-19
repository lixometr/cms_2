<template>
  <SearchSelect
    :value="value"
    :label="label"
    @input="$emit('input', $event)"
    :multiple="multiple"
    :findItem="findItem"
    :searchItem="searchItem"
    :required="required"
  >
    <template v-slot:selected-option="option">
      <div class="selected d-center">
        <span v-for="parent in option.parents" :key="parent.id"
          >{{ parent.name }} -></span
        >
        {{ option.name }}
      </div>
    </template>
    <template v-slot:option="option">
      <span v-for="parent in option.parents" :key="parent.id"
        >{{ parent.name }} -></span
      >
      <span class="d-center"> {{ option.name }}</span>
    </template>
  </SearchSelect>
</template>

<script>
import SearchSelect from "@/components/SearchSelect";
export default {
  props: {
    // [ 'cat_id' ]
    value: [String, Array, Number],
    multiple: {
      type: Boolean,
      default: true,
    },
    label: String,
    required: Boolean,
  },
  components: {
    SearchSelect,
  },
  data() {
    return {};
  },

  methods: {
    async findItem(id) {
      const { data: category } = await this.$api.get("categoryById", { id });
      // const { data } = await this.$api.get("categoryParents", {
      //   id: id,
      // });
      // const parents = data.items;
      const parents = []
      return { ...category, parents };
    },
    async searchItem(text, options) {
      // if(!text) return
      const { data: categories } = await this.$api.get(
        "categoriesSearch",
        { text },
        { params: { perPage: 10, page: options.page} }
      );
      let resolvers = categories.items.map(async (item) => {
        const { data } = await this.$api.get("categoryParents", {
          id: item.id,
        });
        const parents = data.items;

        return { ...item, parents };
      });
      const items = await Promise.all(resolvers);
      categories.items = items;
      return categories;
    },
  },
};
</script>

<style lang="scss">
</style>