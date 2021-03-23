<template>
  <section class="goods-block">
    <div class="container">
      <!-- Обертка товаров -->
      <div class="goods-block__container">
        <CategoryProduct v-for="item in items" :key="item.id" :product="item"/>
      </div>
      <!-- Конец Обертка товаров -->
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