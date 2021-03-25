<template>
  <div>
    <SliderPrice v-model="sliderModel" :min="min" :max="max" />
  </div>
</template>

<script>
export default {
  computed: {
    sliderModel: {
      get() {
        const activePrice = this.$store.getters["filters/activePrice"];
        if (activePrice.length < 1) {
          return this.$store.getters["filters/price"];
        }
        return activePrice;
      },
      set(newVal) {
        this.$store.commit("filters/setPrice", newVal);
      },
    },
    min() {
      return this.$store.getters["filters/price"][0];
    },
    max() {
      return this.$store.getters["filters/price"][1];
    },
  },
};
</script>

<style lang="scss" >
</style>