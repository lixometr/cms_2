<template>
  <div class="p-3 border-primary mb-3">
    <div class="d-flex justify-content-end mb-2">
      <CButton color="danger" @click="remove()">
        <CIcon name="cil-trash"></CIcon>
      </CButton>
    </div>
    <LocaleInput
      label="Значение опции"
      class="mb-5"
      :value="value.locale"
      prop="name"
      @input="changeName"
    />
   
    <CurrencyInput label="Стоимость" :value="value.prices" @input="changePrice" prop="price" />
    <ProductOptionRange :value="value.settings" @input="changeSettings" v-if="type === 'range'"/>
    <ProductOptionLine :value="value.settings" @input="changeSettings" v-if="type === 'line'"/>
  </div>
</template>

<script>
import ProductOptionRange from "@/components/Product/ProductOptions/ProductOptionRange";
import ProductOptionLine from "@/components/Product/ProductOptions/ProductOptionLine";
import CurrencyInput from "@/components/CurrencyComponents/CurrencyInput"
export default {
  props: {
    value: Object,
    type: String
  },
  components: {
    ProductOptionRange,
    ProductOptionLine,
    CurrencyInput
  },
  methods: {
    remove() {
      this.$emit("delete");
    },
    changeName(locale) {
      const newValue = Object.assign({}, this.value, { locale });
      this.$emit("input", newValue);
    },
    changePrice(prices) {
      const newValue = Object.assign({}, this.value, { prices });
      this.$emit("input", newValue);
    },
    changeSettings(settings) {
      const newValue = Object.assign({}, this.value, { settings });
      this.$emit("input", newValue);
    },
    
  },
};
</script>

<style>
</style>