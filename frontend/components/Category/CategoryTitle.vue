<template>
  <section class="category__offer">
    <!--! Заголовок и описание на сайте повторяются -->
    <div class="title">
      <div class="title-description">
        <span>Выберите марку автомобиля</span>
      </div>
      <div class="title-name">
        <h2>{{item.name}}</h2>
      </div>
    </div>
    <!--! Конец - Заголовок и описание на сайте повторяются -->
  </section>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
};
</script>

<style lang="scss" >
</style>