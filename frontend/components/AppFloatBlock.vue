<template>
  <!-- Плавающая корзина + подняться наверх + избранное -->
  <div class="offer__bookmarks">
    <div class="offer__buy">
      <a href="page_basket.html" class="offer__buy-button">
        <img class="svg" src="source/img/buy.svg" alt="Купить" />
        <div class="offer__buy-count">3</div>
      </a>
    </div>

    <div class="offer__like">
      <a href="page_like.html" class="offer__like-button">
        <img class="svg" src="source/img/like_offer.svg" alt="+1" />
        <div class="offer__like-count">0</div>
      </a>
    </div>

    <!-- to the top -->
    <div class="to-top to-top__scrollto" id="top">
      <a class="to-top__link" href="#top" id="to-top__link-id"
        ><img src="source/img/to_the_top.svg"
      /></a>
    </div>
  </div>
  <!-- end to the top -->
  <!-- Плавающая корзина + подняться наверх + избранное -->
</template>

<script>
export default {};
</script>

<style lang="scss" >
</style>