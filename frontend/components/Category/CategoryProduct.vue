<template>
  <div class="card fadeUp t-default" data-t-show="2">
    <div class="card__image">
      <AppImage :src="defaultImage" />
    </div>
    <div class="card__title">
      <p class="name">{{ name }}</p>
    </div>
    <div class="card__material">
      <span class="material" v-for="attribute in attributes" :key="attribute.id"
        >{{ attribute.attr.name }}:
        <span v-for="(attrValue, idx) in attribute.attrValues" :key="idx">{{
          attrValue.name
        }}</span></span
      >
    </div>
    <div class="card__price">
      <ul class="card__price">
        <li class="old-price" v-if="oldPrice">
          <span>{{ oldPrice }} ₽</span>
        </li>
        <li class="new-price">
          <span>{{ price }} ₽</span>
        </li>
      </ul>
    </div>
    <div class="card__like-button" @click="addToFavourite">
      <img class="svg" src="/source/img/like.svg" alt="+1" />
    </div>
    <div class="card__buy-button" @click="addToCart">
      <img class="svg" src="/source/img/buy.svg" alt="Купить" />
    </div>
    <div class="card__attributes">
      <div class="attribute" v-for="tag in tags" :key="tag.id">
        <p>{{ tag.name }}</p>
      </div>
      <div class="attribute" v-if="hasSale">
        <p>-{{ sale }}%</p>
      </div>
    </div>
    <nuxt-link class="card__link" :to="$url.product(product.slug)"></nuxt-link>
  </div>
</template>

<script>
import ProductMixin from "@/mixins/ProductMixin";
export default {
  mixins: [ProductMixin],
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    addToFavourite() {
      this.$store.dispatch("favourite/add", { cnt: 1, id: this.product.id });
    },
    addToCart() {
      this.$store.dispatch("cart/add", { cnt: 1, id: this.product.id });
    },
  },
};
</script>

<style lang="scss" >
</style>