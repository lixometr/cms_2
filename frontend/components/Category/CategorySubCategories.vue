<template>
  <section class="brands">
    <div class="container">
      <CategorySubCategoriesItem v-for="item in items" :key="item.id" :item="item"/>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    items: {
      type: Array,
      default: () => ([])
    }
  }
};
</script>

<style lang="scss" >
</style>