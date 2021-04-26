<template>
  <section class="basket">
    <h2>
      В корзине <span class="basket__cout">{{ cnt }}</span> {{itemSclon}}
    </h2>
    <div class="container">
      <!-- блок с продуктами -->
      <div class="basket__products">
        <ProductCard
          cardType="cart"
          v-for="(item, idx) in items"
          :product="item"
          :key="idx"
          :idx="idx"
        />
      </div>
      <!-- конец блок с продуктами -->

      <!-- Блок с информацией о цене и заказе -->
      <CartInfo />
      <!-- Конец  Блок с информацией о цене и заказе-->
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ $api, error, store, redirect }) {
    try {
      if (store.getters["cart/items"].length < 1) redirect("/");
    } catch (err) {
      error(err);
    }
  },
  computed: {
    items() {
      return this.$store.getters["cart/items"];
    },
    cnt() {
      return this.items.length;
    },
    itemSclon() {
      function useWordSclon(words) {
        const exec = (number) => {
          return words[
            number % 100 > 4 && number % 100 < 20
              ? 2
              : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? number % 10 : 5]
          ];
        };
        return { exec };
      }
      const {exec} = useWordSclon(["товар", "товара", "товаров"]);
	  return exec(this.cnt)
    },
  },
};
</script>

<style lang="scss" >
</style>