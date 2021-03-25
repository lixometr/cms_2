<template>
  <div class="additional">
    <MenuLink
      :link="link"
      class="additional-link"
      v-for="(link, idx) in links"
      :key="idx"
    />
  </div>
</template>

<script>
export default {
  data: () => ({
    links: [],
  }),
  async fetch() {
    await this.fetchServices();
  },
  methods: {
    async fetchServices() {
      try {
        const serviceMenu = await this.$api.$get("menu", {
          slug: "product_menu",
        });
        this.links = serviceMenu.items || [];
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss" >
</style>