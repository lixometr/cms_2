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
    const promocode = this.$store.getters["promocode/promocode"];
    return {
      promocode,
    };
  },
  methods: {
    async apply() {
      const isSet = await this.$store.dispatch("promocode/set", this.promocode);
      await this.$store.dispatch("cart/fetchItems");
      if (isSet) {
        this.$toast.success("Промокод применен");
      } else {
      }
    },
  },
};
</script>

<style lang="scss" >
</style>