<template>
  <div class="basket__info">
    <div class="basket__total-prace">
      <div class="basket__line">
        <p class="basket-title">
          Товары <span>({{ cnt }})</span>
        </p>
        <p class="basket-price">{{totalPrice}} ₽</p>
      </div>
      <!-- <div class="basket__line">
        <p class="basket-title">Установка</p>
        <p class="basket-price">2 000 ₽</p>
      </div> -->
      <div class="basket__line" v-if="sale > 0">
        <p class="basket-title">Скидка на товары</p>
        <p class="basket-price">{{sale}} ₽</p>
      </div>
      <div class="basket__line">
        <p class="basket-title">Итого</p>
        <p class="basket-price">{{totalPrice}} ₽</p>
      </div>
    </div>
    <div class="">
      <a href="#" class="button button__button-link"
      @click.prevent="makeOrder"
        >ОФОРМИТЬ ЗАКАЗ</a
      >
    </div>
    <CartPromocode />
  </div>
</template>

<script>
export default {
  computed: {
    cnt() {
      return this.$store.getters["cart/cnt"];
    },
    items() {
      return this.$store.getters["cart/items"];
    },
    sale() {
      const totalSale = this.items.reduce((sum, item) => {
        const d = item.oldPrice - item.price;
        if (d > 0) {
          return sum + d;
        }
        return sum
      }, 0);
      return totalSale;
    },
    totalPrice() {
      return this.$store.getters['cart/info'].totalPrice || 0
    }
  },
  methods: {
    makeOrder() {
      this.$router.push(this.$url.checkout())
    }
  }
};
</script>

<style lang="scss" >
</style>