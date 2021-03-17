<template>
    <header class="header header__scrollto" id="top">
      <div class="container">
        <div class="header__logo">
          <nuxt-link to="/">
            <img
              class="logo"
              src="/source/img/logo.svg"
              alt="Авточехлы и Аксессуары"
            />
          </nuxt-link>
        </div>
        <div class="header__menu">
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
              <a class="menu__link" href="page_delivery.html"
                >Доставка и оплата</a
              >
            </li>
            <li class="menu__item">
              <a class="menu__link" href="page_about_us.html">О нас</a>
            </li>
            <li class="menu__item">
              <a class="menu__link" href="page_contact.html">Контакты</a>
            </li>
          </ul>
        </div>
        <div class="header__tel">
          <ul class="header__tel-links">
            <li class="number">
              <a href="tel:8 (473) 232-37-98">8 (473) 232-37-98</a>
            </li>
            <li class="callback" id="myBtn">
              <a href="#0">Заказать звонок</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
</template>

<script>
export default {};
</script>

<style lang="scss" >
</style>