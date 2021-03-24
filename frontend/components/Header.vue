<template>
  <header class="header header__scrollto" id="top">
    <div class="container">
      <div class="header__logo">
        <nuxt-link to="/">
          <AppImage
            class="logo"
            :src="headerLogo"
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
            <a :href="'tel:'+phone">{{ phone }}</a>
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
    item: {},
  }),
  async fetch() {
    await this.fetchHeader();
  },
  computed: {
    values() {
      return this.item.values || {};
    },
    headerLogo() {
      return this.values.logo;
    },
    phone() {
      return this.values.phone;
    },
  },
  methods: {
    async fetchHeader() {
      try {
        const header = await this.$api.$get("widget", { slug: "header" });
        this.item = header;
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