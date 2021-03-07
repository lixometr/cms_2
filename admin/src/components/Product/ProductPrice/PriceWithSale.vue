<template>
  <div>
    <CurrencyInput
      label="Старая цена"
      class="mb-5"
      v-model="newPriceModel"
      prop="oldPrice"
    />
    <CurrencyInput
      label="Цена со скидкой"
      class="mb-5"
      v-model="newPriceModel"
      prop="price"
    />
    <CurrencyInput
      label="Скидка"
      class="mb-3"
      v-model="saleModel"
      prop="sale"
      append="%"
    />
    <div class="d-flex justify-content-end">
      <CButton color="danger" @click="removeSale">Удалить сидку</CButton>
    </div>
  </div>
</template>

<script>
import CurrencyInput from "@/components/CurrencyComponents/CurrencyInput";

export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    CurrencyInput,
  },
  computed: {
    newPriceModel: {
      get() {
        return this.value;
      },
      set(value) {
        const newValue = value.map((curVal) => {
          const newCurVal = { ...curVal };
          const newSale = Math.round(
            (newCurVal.price / newCurVal.oldPrice) * 100
          );
          newCurVal.sale = newSale;
          return newCurVal;
        });
        this.$emit("input", newValue);
      },
    },
    saleModel: {
      get() {
        return this.value;
      },
      set(value) {
        const newValue = value.map((curVal) => {
          const newCurVal = { ...curVal };
          const sale = curVal.sale / 100;
          const d = curVal.oldPrice * sale;
          const newPrice = newCurVal.oldPrice - d;
          newCurVal.price = newPrice;
          return newCurVal;
        });
        this.$emit("input", newValue);
      },
    },
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
    removeSale() {
      this.$emit("removeSale");
    },
  },
};
</script>

<style lang="scss" >
</style>