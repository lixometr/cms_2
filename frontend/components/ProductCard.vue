<template>
  <div class="basket__products-one">
    <nuxt-link :to="$url.product(product.slug) || '#'" class="card__image">
      <AppImage :src="defaultImage" alt="" />
    </nuxt-link>
    <div class="card__title">
      <p class="name">{{ name }}</p>
      <span class="material" v-for="attribute in attributes" :key="attribute.id"
        >{{ attribute.attr.name }}:
        <span v-for="(attrValue, idx) in attribute.attrValues" :key="idx">{{
          attrValue.name
        }}</span></span
      >
    </div>
    <!-- <div class="card__material">
						
					</div> -->
    <ProductCnt class="basket__couter" v-model="cnt"> </ProductCnt>
    <div class="card__price">
      <ul class="card__price">
        <li class="old-price" v-if="product.oldPrice">
          <span>{{ product.oldPrice }} ₽</span>
        </li>
        <li class="new-price">
          <span>{{ product.price }} ₽</span>
        </li>
      </ul>
    </div>
    <div
      class="card__like-button"
      @click="addToFavourite"
      v-if="cardType === 'cart'"
    >
      <img class="svg" src="source/img/like.svg" alt="+1" />
    </div>
    <div class="card__like-button" @click="addToCart" v-else>
      <img class="svg" src="source/img/buy.svg" alt="+1" />
    </div>
    <div class="card__delete-button" @click="removeItem">
      <img class="svg" src="source/img/delete.svg" alt="+1" />
    </div>
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
    cardType: String,
    idx: Number,
  },
  computed: {
    cnt: {
      get() {
        return this.product.cnt;
      },
      set(val) {
        if (this.cardType === "cart") {
          this.$store.dispatch("cart/update", { idx: this.idx, cnt: val });
        } else {
          this.$store.dispatch("favourite/update", { idx: this.idx, cnt: val });
        }
      },
    },
  },
  methods: {
    addToFavourite() {
      const cartItem = this.$store.getters["cart/getItem"](this.idx);
      this.$store.dispatch("favourite/add", {
        ...cartItem,
      });
      console.log("add", cartItem);
    },
    addToCart() {
      const favouriteItem = this.$store.getters["favourite/cookieItems"][
        this.idx
      ];
      this.$store.dispatch("cart/add", { ...favouriteItem });
    },
    removeItem() {
      if (this.cardType === "cart") {
        this.removeFromCart();
      } else {
        this.removeFromFavourite();
      }
    },
    removeFromCart() {
      this.$store.dispatch("cart/removeByIdx", { idx: this.idx });
    },
    removeFromFavourite() {
      this.$store.dispatch("favourite/removeByIdx", { idx: this.idx });
    },
  },
};
</script>

<style lang="scss" >
</style>