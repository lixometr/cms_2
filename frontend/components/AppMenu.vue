<template>
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
  },
};
</script>

<style lang="scss" >
</style>