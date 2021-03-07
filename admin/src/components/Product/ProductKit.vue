<template>
  <CollapseCard>
    <div slot="header">Продукты в наборе</div>
    <ProductSelect :multiple="true" :value="_value" @input="onInput" />
  </CollapseCard>
</template>

<script>
import ProductSelect from "@/components/ProductSelect";
export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    product: {
      type: Object,
      default: () => ({}),
    },
  },
  computed:{ 
      _value() {
          return this.value.map(item => ({id: item.productId}))
      }
  },
  components: {
    ProductSelect,
  },
  methods: {
    onInput(newValue) {
      const filtered = newValue
        .filter((item) => item.id !== this.product.id)
        .map((item) => ({ productId: item.id }));
      this.$emit("input", filtered);
    },
  },
};
</script>

<style lang="scss" >
</style>