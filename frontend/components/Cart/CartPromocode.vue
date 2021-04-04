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
  data() {
    const promocode = this.$store.getters['promocode/promocode']
    return {
      promocode
    }
  },
  methods: {
    async apply() {
      await this.$store.dispatch("promocode/set", this.promocode);
      await this.$store.dispatch('cart/fetchItems')
    },
  },
};
</script>

<style lang="scss" >
</style>