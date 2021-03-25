<template>
  <section class="basket">
    <h2>В избранном <span class="basket__cout">{{cnt}}</span> товара</h2>
    <div class="container">
      <!-- блок с продуктами -->
      <div class="basket__products">
        
       <ProductCard type="favourite" v-for="(item, idx) in items" :key="idx" :idx="idx" :product="item"/>
      </div>
      <!-- конец блок с продуктами -->

      <!-- Блок с информацией о цене и заказе -->
     
      <!-- Конец  Блок с информацией о цене и заказе-->
    </div>
  </section>
</template>

<script>
export default {
    computed: {
        items() {
            return this.$store.getters['favourite/items']
        },
        cnt() {
            return this.$store.getters['favourite/cnt']
        }
    }
};
</script>

<style lang="scss">

</style>