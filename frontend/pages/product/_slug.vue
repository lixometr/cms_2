<template>
  <main class="page__single-product">
    <AppBreadcrumbs :items="breadcrumbs" />
    <div class="container">
      <section class="single-product">
        <!-- 1ый блок -->

        <div class="single-product__preview">
          <!-- title -->
          <h2 class="single-product__preview-title">
            {{ name }}
          </h2>
          <!-- end title -->

          <!-- Big img -->
          <div class="single-product__preview-image">
            <span class="zoom" id="ex1">
              <AppImage :src="defaultImage" width="70%" height="70%" />
            </span>

            <div class="single-product__preview-image-zoom">
              <AppImage :src="defaultImage" />
            </div>
          </div>
          <!-- end Big img -->
        </div>

        <!-- 1ый блок -->

        <!-- 2ой блок -->
        <div class="single-product__description">
          <ProductVariations
            :item="product"
            v-if="type === 'variation'"
            v-model="activeVariation"
          />
          <ProductOptions :item="product" v-model="activeOptions" />
          <ProductPrice :item="product" />

          <ProductCnt v-model="cnt" />
          <div class="description__buttons">
            <a href="#0" class="button" @click.prevent="addToCart"
              >ДОБАВИТ В КОРЗИНУ</a
            >
            <a href="#0" class="button silver" @click="oneClickBuy"
              >КУПИТЬ В ОДИН КЛИК</a
            >
            <a href="#like" class="svg-silver" @click="addToFavourite"
              ><img class="svg" src="/source/img/like_offer.svg" alt=""
            /></a>
          </div>

          <ProductDescription :item="product" />
          <ProductAttributes :item="product" />
        </div>
        <!-- 2ой блок -->
      </section>
    </div>
    <ProductFooter :item="product" />
  </main>
</template>

<script>
import ProductMixin from "@/mixins/ProductMixin";
import Vue from "vue";
export default {
  mixins: [ProductMixin],
  data() {
    return {
      cnt: 1,
      activeOptions: {},
    };
  },
  async asyncData({ error, $api, params, $url }) {
    try {
      const item = await $api.$get("product", { slug: params.slug });
      if (!item) throw { statusCode: 404 };
      const mainCategory = item.category[0];
      let breadcrumbsItems = [];
      if (mainCategory) {
        const { items } = await $api.$get("categoryBreadcrumbs", {
          id: mainCategory.id,
        });
        breadcrumbsItems = items.map((item) => ({
          title: item.name,
          link: $url.category(item.fullSlug),
        }));
      }
      let activeVariation = null;
      if (item.type === "variation") {
        activeVariation = item.variations[0] && item.variations[0].id;
      }
      const product = await $api.$post(
        "productInfo",
        { id: item.id },
        {
          activeVariation,
          activeOptions: {},
          cnt: 1,
        }
      );

      return {
        activeVariation,
        product,
        item,
        breadcrumbsItems,
      };
    } catch (err) {
      error(err);
    }
  },
  async mounted() {
    await Vue.loadScript("/source/js/jquery.zoom.min.js");
    // $(".single-product__preview-image-zoom").click(function (event) {
    $("#ex1").zoom();
    // });

    $("#ex2").zoom({ on: "grab" });
    $("#ex3").zoom({ on: "click" });
    $("#ex4").zoom({ on: "toggle" });
  },
  computed: {
    name() {
      return this.product.name;
    },
    breadcrumbs() {
      const breadcrumbs = [...this.breadcrumbsItems];
      breadcrumbs.push({
        title: this.product.name,
        link: "#",
      });
      return breadcrumbs;
    },
  },
  methods: {
    oneClickBuy() {
      this.addToCart();
      this.$router.push(this.$url.checkout());
    },
    addToCart() {
      this.$store.dispatch("cart/add", {
        id: this.product.id,
        cnt: this.cnt,
        activeVariation: this.activeVariation,
        activeOptions: this.activeOptions,
      });
    },
    addToFavourite() {
      this.$store.dispatch("favourite/add", {
        id: this.product.id,
        cnt: this.cnt,
        activeVariation: this.activeVariation,
        activeOptions: this.activeOptions,
      });
    },
    async fetchProductInfo() {
      try {
        this.product = await this.$api.$post(
          "productInfo",
          { id: this.item.id },
          {
            activeVariation: this.activeVariation,
            activeOptions: this.activeOptions,
            cnt: this.cnt,
          }
        );
      } catch (err) {
        this.$error(err);
      }
    },
  },
  watch: {
    activeVariation() {
      this.fetchProductInfo();
    },
    activeOptions: {
      deep: true,
      handler() {
        this.fetchProductInfo();
      },
    },
  },
};
</script>

<style lang="scss" >
</style>