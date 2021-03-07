<template>
  <div>
    <CurrencyInput label="Цена" class="mb-3" v-model="itemModel" prop="price" />
    <div class="d-flex justify-content-end">
      <BtnAdd  @click="addSale">Добавить сидку</BtnAdd>
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
      this.$emit("addSale");
    },
  },
};
</script>

<style lang="scss" >
</style>