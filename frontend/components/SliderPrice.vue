<template>
  <div class="price-slider">
    <input type="text" placeholder="0" />
    <input type="text" placeholder="9999" />
    <vue-slider v-model="price" />
  </div>
</template>

<style lang="scss">

</style>


<script>
export default {
  data() {
    return {
      price: [0, 10],
    };
  },
};
</script>