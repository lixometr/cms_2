<template>
  <section class="breadcrumb">
    <div class="container">
      <ul class="breadcrumb-list">
        <li
          class="breadcrumb-list__item"
          v-for="(item, idx) in items"
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
};
</script>

<style lang="scss" >
</style>