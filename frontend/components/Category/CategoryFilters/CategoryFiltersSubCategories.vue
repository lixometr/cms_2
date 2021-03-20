<template>
  <div class="category-filters__sub-categories">
    <AppSelect
      :placeholder="'Выберите категорию'"
      :options="child"
      :value="value[idx]"
      @input="onItemChange($event, idx)"
      v-for="(child, idx) in children"
      :key="idx"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    children: [],
  }),
  async fetch() {
    await this.fetchItems();
  },
  computed: {
    toFetchChildren() {
      return [this.item.id, ...this.value];
    },
  },
  methods: {
    async fetchItems() {
      try {
        const fetchChildren = async (id) => {
          const { items } = await this.$api.$get("categoryChildren", {
            id,
          });
          return items.map((item) => ({
            name: item.name,
            value: item.id.toString(),
          }));
        };

        const resolvers = this.toFetchChildren.map(async (id) => {
          return await fetchChildren(id);
        });
        let children = await Promise.all(resolvers);
        children = children.filter((child) => child.length > 0);
        this.children = children;
      } catch (err) {
        this.$error(err);
      }
    },
    onItemChange(newValue, idx) {
      let values = [...this.value];
      values[idx] = newValue;
      values = values.filter((_, index)  => index <= idx)
      this.children = this.children.filter((_, index)  => index <= idx)
      this.$emit("input", values);
    },
  },
  watch: {
    value: {
      deep: true,
      handler(newVal, oldVal) {
        if (this.value.length >= this.children.length) {
          this.fetchItems();
        }
      },
    },
  },
};
</script>

<style lang="scss" >
.category-filters__sub-categories {
  display: flex;
  flex-wrap: wrap;
}
</style>