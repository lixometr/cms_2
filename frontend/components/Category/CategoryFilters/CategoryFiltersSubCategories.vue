<template>
  <div class="category-filters__sub-categories">
    <AppSelect
      class="select-filter"
      :placeholder="'Выберите категорию'"
      :options="val.child"
      :value="val.value"
      :disabled="val.disabled"
      @input="onItemChange($event, idx)"
      v-for="(val, idx) in subCategories"
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
    fetchedChildren: [],
  }),
  async fetch() {
    await this.fetchItems();
  },
  computed: {
    toFetchChildren() {
      return [this.item.id, ...this.value];
    },
    subCategories() {
      let values = this.children.map((child, idx) => ({
        value: this.value[idx],
        child,
        disabled: false,
      }));

      if (values.length < 2) {
        if (
          this.fetchedChildren[this.toFetchChildren.length - 1] &&
          this.children[this.toFetchChildren.length - 1]
        ) {
          values.push({ disabled: true });
          values.push({ disabled: true });
        }
      }
      return [...values];
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

        const resolvers = this.toFetchChildren.map(async (id, idx) => {
          const child = await fetchChildren(id);
          this.$set(this.fetchedChildren, idx, true);
          return child;
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
      values = values.filter((_, index) => index <= idx);
      this.children = this.children.filter((_, index) => index <= idx);
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