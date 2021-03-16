<template>
  <nav class="mobile-menu">
    <input type="checkbox" id="checkbox" class="mobile-menu__checkbox" />

    <label class="mobile-menu__items">
      <div class="logo">
        <a href="index.html">
          <img src="source/img/logo.svg" />
        </a>
      </div>
      <div class="phone">
        <a href="tel:8 (473) 232-37-98">
          <img src="source/img/telephone.png" />
        </a>
      </div>
      <div class="offer__buy">
        <a href="page_basket.html" class="offer__buy-button">
          <img class="svg" src="source/img/m_buy.svg" alt="Купить" />
          <div class="offer__buy-count">3</div>
        </a>
      </div>

      <div class="offer__like">
        <a href="page_like.html" class="offer__like-button">
          <img class="svg" src="source/img/m_like.svg" alt="+1" />
          <div class="offer__like-count">0</div>
        </a>
      </div>
    </label>

    <label for="checkbox" class="mobile-menu__btn">
      <div class="mobile-menu__icon"></div>
    </label>

    <div class="mobile-menu__container">
      <ul class="menu">
        <li class="menu__item have-sub">
          <a class="menu__link">Каталог</a>

          <ol class="sub-menu">
            <li class="sub-menu__links"><a href="#0">Чехлы</a></li>
            <li class="sub-menu__links"><a href="#0">Накидки</a></li>
            <li class="sub-menu__links"><a href="#0">Коврики</a></li>
            <li class="sub-menu__links"><a href="#0">Аксессуары</a></li>
          </ol>
        </li>
        <li class="menu__item have-sub">
          <a class="menu__link">Услуги</a>

          <ol class="sub-menu">
            <li class="sub-menu__links">
              <a href="page_service_hemming.html">На заказ</a>
            </li>
            <li class="sub-menu__links">
              <a href="page_services_instal.html">Установка</a>
            </li>
            <li class="sub-menu__links">
              <a href="page_services.html">Пошив</a>
            </li>
          </ol>
        </li>
        <li class="menu__item">
          <a class="menu__link" href="page_delivery.html">Доставка и оплата</a>
        </li>
        <li class="menu__item">
          <a class="menu__link" href="page_about_us.html">О нас</a>
        </li>
        <li class="menu__item">
          <a class="menu__link" href="page_contact.html">Контакты</a>
        </li>
      </ul>
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