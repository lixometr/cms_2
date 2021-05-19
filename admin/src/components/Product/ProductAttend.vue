<template>
  <div>
    <ProductSelect :value="selectValue" @input="onChange" :multiple="true" />
  </div>
</template>

<script>
import ProductSelect from "@/components/ProductSelect";
export default {
  components: { ProductSelect },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    id: [Number, String],
  },
  created() {
    // this.fetchAttendProducts();
  },
  data: () => ({}),
  computed: {
    selectValue() {
      return this.value.map((val) => ({ id: val.productId }));
    },
  },
  methods: {
    async fetchAttendProducts() {
      try {
        if (typeof this.id !== "number") return;
        const { data } = await this.$api.get("productSimilarItems", {
          id: this.id,
        });
        const items = data.items;
        const newValues = items.map((item) => ({ productId: item.id }));
        this.$emit("input", newValues);
      } catch (err) {
        this.$error(err);
      }
    },
    onChange(newValue) {
      const items = newValue.map((item) => ({ productId: item.id }));
      this.$emit("input", items);
    },
  },
  watch: {
    value() {},
  },
};
</script>

<style lang="scss" >
</style>