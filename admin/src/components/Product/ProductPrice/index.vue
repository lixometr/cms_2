<template>
  <div>
    <PriceWithSale
      v-if="hasSale"
      v-model="itemModel"
      @removeSale="removeSale"
    />
    <PriceNoSale v-model="itemModel" @addSale="addSale" v-else />
  </div>
</template>

<script>
import PriceWithSale from "./PriceWithSale";
import PriceNoSale from "./PriceNoSale";
export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    let hasSale = this.value.findIndex((curVal) => curVal.sale > 0) > -1;
    return {
      hasSale,
    };
  },
  components: {
    PriceWithSale,
    PriceNoSale,
  },
  computed: {
    itemModel: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  methods: {
    addSale() {
      this.hasSale = true;
      const newValue = this.value.map((curVal) => {
        const newCurVal = { ...curVal };
        newCurVal.oldPrice = newCurVal.price;
        newCurVal.price = undefined;
        newCurVal.sale = undefined;
        return newCurVal;
      });
      this.$emit("input", newValue);
    },
    removeSale() {
      this.hasSale = false;
      const newValue = this.value.map((curVal) => {
        const newCurVal = { ...curVal };
        newCurVal.price = newCurVal.oldPrice;
        newCurVal.oldPrice = undefined;
        return newCurVal;
      });
      this.$emit("input", newValue);
    },
  },
};
</script>

<style>
</style>