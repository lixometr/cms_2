<template>
  <div class="basket__promocode">
    <input
      type="text"
      placeholder="Промокод на скидку"
      v-model="promocode"
      @keypress.enter="apply"
    />
    <div class="button" @click.prevent="apply">
      <a href="#">Применить</a>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    promocode: "",
  }),
  methods: {
    async apply() {
      await this.$store.dispatch("promocode/set", this.promocode);
    },
  },
};
</script>

<style lang="scss" >
</style>