<template>
  <div>
    <AppSelect
      :placeholder="item.name"
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
  methods: {
    async fetchItems() {
      try {
        const fetchChildren = async (id) => {
          const { items } = await this.$api.$get("categoryChildren", {
            id,
          });
          return items;
        };
        const toFetchChildren = [this.item.id, ...this.value];
        const resolvers = toFetchChildren.map(async (id) => {
          return await fetchChildren(id);
        });
        const children = await Promise.all(resolvers);
        
        this.children = children;
      } catch (err) {
        this.$error(err);
      }
    },
    onItemChange(newValue, idx) {
      const values = [...this.value];
      values[idx] = newValue;
      this.$emit("input", values);
    },
  },
};
</script>

<style lang="scss" >
</style>