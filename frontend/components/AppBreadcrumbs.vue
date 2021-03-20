<template>
  <section class="breadcrumb">
    <div class="container">
      <ul class="breadcrumb-list">
        <li
          class="breadcrumb-list__item"
          v-for="(item, idx) in breadcrumbs"
          :key="idx"
        >
          <nuxt-link class="breadcrumb-list__link" :to="item.link || '#'">{{
            item.title
          }}</nuxt-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    breadcrumbs() {
      const items = [...this.items];
      items.unshift({ link: "/", title: "Главная" });
      return items;
    },
  },
};
</script>

<style lang="scss" >
</style>