<template>
  <nav class="mobile-menu">
    <input type="checkbox" id="checkbox" class="mobile-menu__checkbox" />

    <label class="mobile-menu__items">
      <div class="logo">
        <nuxt-link to="/">
          <AppImage
            class="logo"
            :src="headerLogo"
            alt="Авточехлы и Аксессуары"
          />
        </nuxt-link>
      </div>
      <div class="phone">
        <a :href="'tel:' + phone">
          <img src="/source/img/telephone.png" />
        </a>
      </div>
      <div class="offer__buy">
        <nuxt-link :to="$url.cart()" class="offer__buy-button">
          <img class="svg" src="/source/img/m_buy.svg" alt="Купить" />
          <div class="offer__buy-count">{{ cartCnt }}</div>
        </nuxt-link>
      </div>

      <div class="offer__like">
        <nuxt-link :to="$url.favourite()" class="offer__like-button">
          <img class="svg" src="/source/img/m_like.svg" alt="+1" />
          <div class="offer__like-count">{{ favouriteCnt }}</div>
        </nuxt-link>
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
  data: () => ({
    item: {},
  }),
  async fetch() {
    await this.fetchHeader();
  },
  computed: {
    cartCnt() {
      return this.$store.getters["cart/cnt"];
    },
    favouriteCnt() {
      return this.$store.getters["favourite/cnt"];
    },
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
  methods: {
    async fetchHeader() {
      try {
        const header = await this.$api.$get("widget", { slug: "header" });
        this.item = header;
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss" >
</style>