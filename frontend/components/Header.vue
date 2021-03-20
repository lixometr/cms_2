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
       <AppMenu />
      </div>
      <div class="header__tel">
        <ul class="header__tel-links">
          <li class="number">
            <a href="tel:8 (473) 232-37-98">8 (473) 232-37-98</a>
          </li>
          <li class="callback">
            <a href="#0" @click.prevent="orderPhone">Заказать звонок</a>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  
  
  methods: {
   
    orderPhone() {
      this.$modal.open("contact");
    },
  },
};
</script>

<style lang="scss" >
</style>