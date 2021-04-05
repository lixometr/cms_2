<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__rights-reserved">
        {{ copyright }}
      </div>
      <div class="footer__social-links">
        <div
          class="social__links-instagram"
          v-for="(socIcon, idx) in socIcons"
          :key="idx"
        >
          <a :href="socIcon.link" target="_blank"
            ><AppImage :src="socIcon.icon"
          /></a>
        </div>

        <div class="telephone">
          <a :href="'tel:' + phone">{{ phone }}</a>
        </div>
      </div>
      <div class="footer__made-by">
        <span
          >Разработано в
          <a
            href="https://stebnev-studio.ru/"
            title="Разработка и продвижение сайтов"
            target="_blank"
            >Stebnev-Studio</a
          >
        </span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data: () => ({
    item: {},
  }),
  async fetch() {
    await this.fetchFooter();
  },
  computed: {
    socIcons() {
      return this.values.socIcons;
    },
    copyright() {
      return this.values.copyright;
    },
    values() {
      return this.item.values || {};
    },
    logo() {
      return this.values.logo;
    },
    phone() {
      return this.values.phone;
    },
  },
  methods: {
    async fetchFooter() {
      try {
        const footer = await this.$api.$get("widget", { slug: "footer" });
        this.item = footer;
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