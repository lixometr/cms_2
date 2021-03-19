<template>
  <!-- Плавающая корзина + подняться наверх + избранное -->
  <div class="offer__bookmarks">
    <div class="offer__buy">
      <nuxt-link :to="$url.cart()" class="offer__buy-button">
        <img class="svg" src="/source/img/buy.svg" alt="Купить" />
        <div class="offer__buy-count">{{cartCnt}}</div>
      </nuxt-link>
    </div>

    <div class="offer__like">
      <a href="page_like.html" class="offer__like-button">
        <img class="svg" src="/source/img/like_offer.svg" alt="+1" />
        <div class="offer__like-count">0</div>
      </a>
    </div>

    <!-- to the top -->
    <div class="to-top to-top__scrollto" id="top">
      <a class="to-top__link" href="#top" id="to-top__link-id"
        ><img src="/source/img/to_the_top.svg"
      /></a>
    </div>
  </div>
  <!-- end to the top -->
  <!-- Плавающая корзина + подняться наверх + избранное -->
</template>

<script>
export default {
  computed: {
    cartCnt() {
      return this.$store.getters['cart/cnt']
    },
    favouriteCnt() {
      // return this.$store.getters['favourite/cnt']
    }
  }
};
</script>

<style lang="scss" >
</style>