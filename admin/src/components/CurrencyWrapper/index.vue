<template>
  <div class="currency-wrapper">
    <div
      class="currency-wrapper__item mb-3"
      v-for="(currency, idx) in currencies"
      :key="currency.id"
    >
      <CurrencyWrapperItem
        :value="value"
        :currency="currency"
        @input="onInputChange($event, currency)"
        :prop="prop"
        :label="label"
        :isValid="isValid[idx]"

      >
        <template v-slot:default="params">
          <slot name="item" v-bind="params"/>
        </template>
      </CurrencyWrapperItem>
    </div>
  </div>
</template>

<script>
import CurrencyWrapperItem from "./CurrencyWrapperItem.vue";
/* currencies: [
    
    { currencyId: 1, name: 'some', other: 'some' } 
    { currencyId: 2, name: 'some 2', other: 'some' } 

] */
export default {
  components: { CurrencyWrapperItem },
  props: {
    label: String,
    value: {
      type: Array,
      default: () => [],
    },
    prop: String,
    itemProps: {
      type: Object,
      default: () => ({})
    },
    isValid: {
      type: [Array, Object],
      default: () => [],
    },
   
   
  },
   mounted() {
    const values = [...this.value];
    this.currencies.map((currency) => {
      const inValueIdx = values.findIndex(
        (val) => val.currencyId === currency.id
      );
      if (inValueIdx < 0) {
        values.push({
          currencyId: currency.id,
        });
      } else {

      }
    });
    this.$emit("input", values);
  },
  computed: {
    currencies() {
      return this.$store.getters["currency/currencies"];
    },
  },
  methods: {
    onInputChange(newValue, currency) {
      let value = [...this.value];
      const inValueIdx = value.findIndex((val) => val.currencyId === currency.id);

      if (inValueIdx < 0) {
        value.push({
          currencyId: currency.id,
          [this.prop]: newValue,
        });
      } else {
        value[inValueIdx] = Object.assign({}, value[inValueIdx], {
          [this.prop]: newValue,
        });
      }
      this.$emit("input", value);
    },
  },
};
</script>

<style lang="scss" scoped>
.currency-wrapper {
}
</style>