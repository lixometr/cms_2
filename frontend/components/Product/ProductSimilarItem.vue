<template>
  <div class="recomended-card">
    <div class="recomended-card__image">
      <AppImage :src="defaultImage" alt="" />
    </div>

    <div class="recomended-card__title">
      <span class="title">{{name}}</span>
    </div>

    <div class="recomended-card__price">
      <ul class="card__price">
        <li class="old-price" v-if="oldPrice"><span>{{oldPrice}} ₽</span></li>
        <li class="new-price"><span>{{price}} ₽</span></li>
      </ul>
    </div>

    <div class="recomended-card__buy-btn">
      <div class="card__buy-button" @click="addToCart">
        <img class="svg" src="/source/img/buy.svg" alt="Купить" />
      </div>
    </div>

    <nuxt-link :to="$url.product(product.slug)" class="recomended-card__link"></nuxt-link>
  </div>
</template>

<script>
import ProductMixin from "@/mixins/ProductMixin"
export default {
    mixins: [ProductMixin],
    props: {
        product: {
            type: Object,
            default: () => ({})
        }
    },
    methods: {
        addToCart() {
            this.$store.dispatch('cart/add', {
                id: this.product.id,
                cnt: 1
            })
        }
    }
};
</script>

<style lang="scss" >
</style>