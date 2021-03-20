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
          <li
            class="menu__item"
            :class="{ 'have-sub': item.children.length > 0 }"
            v-for="(item, idx) in items"
            :key="idx"
          >
            <MenuLink class="menu__link" :link="item">{{ item.name }}</MenuLink>

            <ol class="sub-menu" v-if="item.children.length > 0">
              <li
                class="sub-menu__links"
                v-for="(child, index) in item.children"
                :key="index"
              >
                <MenuLink :link="child"></MenuLink>
              </li>
            </ol>
          </li>
        </ul>
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
  data: () => ({
    items: [],
  }),
  async fetch() {
    await this.fetchItems();
  },
  methods: {
    async fetchItems() {
      try {
        const menu = await this.$api.$get("menu", { slug: "header_menu" });
        this.items = menu.items;
      } catch (err) {
        this.$error(err);
      }
    },
    orderPhone() {
      this.$modal.open("contact");
    },
  },
};
</script>

<style lang="scss" >
</style>