<template>
  <nav class="mobile-menu">
    <input type="checkbox" id="checkbox" class="mobile-menu__checkbox" />

    <label class="mobile-menu__items">
      <div class="logo">
        <nuxt-link to="/">
          <img src="/source/img/logo.svg" />
        </nuxt-link>
      </div>
      <div class="phone">
        <a href="tel:8 (473) 232-37-98">
          <img src="/source/img/telephone.png" />
        </a>
      </div>
      <div class="offer__buy">
        <a href="page_basket.html" class="offer__buy-button">
          <img class="svg" src="/source/img/m_buy.svg" alt="Купить" />
          <div class="offer__buy-count">3</div>
        </a>
      </div>

      <div class="offer__like">
        <a href="page_like.html" class="offer__like-button">
          <img class="svg" src="/source/img/m_like.svg" alt="+1" />
          <div class="offer__like-count">0</div>
        </a>
      </div>
    </label>

    <label for="checkbox" class="mobile-menu__btn">
      <div class="mobile-menu__icon"></div>
    </label>

    <div class="mobile-menu__container">
      <AppMenu />
    </div>
  </nav>
</template>

<script>
export default {
  mounted() {
    // Для моб меню
    $(".have-sub").click(function (event) {
      if ($(".have-sub").children(".sub-menu").hasClass("active")) {
        $(this).children(".sub-menu").removeClass("active");
      } else {
        $(this).children(".sub-menu").addClass("active");
      }
    });
  },
};
</script>

<style lang="scss" >
</style>