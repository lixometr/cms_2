<template>
  <div>
    <SliderPrice class="search-block__price" v-model="sliderModel"/>
  </div>
</template>

<script>
export default {
  computed: {
    sliderModel: {
      get() {
        return this.$store.getters["filters/price"];
      },
      set(newVal) {
          this.$store.commit('filters/setPrice', newVal)
      }
    },
  },
};
</script>

<style lang="scss" >
</style>