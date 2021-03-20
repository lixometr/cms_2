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
              <AppImage
                :src="mainImage"
                width="70%"
                height="70%"
              />
            </span>

            <div class="single-product__preview-image-zoom">
              <img src="/source/img/zoom.svg" alt="" />
            </div>
          </div>
          <!-- end Big img -->
        </div>

        <!-- 1ый блок -->

        <!-- 2ой блок -->
        <div class="single-product__description">
          <ProductVariations :item="product" />
          <ProductOptions :items="product" />
          <ProductPrice :items="product" />

          <ProductCnt v-model="cnt" />
          <div class="description__buttons">
            <a href="#0" class="button" @click.prevent="addToCart"
              >ДОБАВИТ В КОРЗИНУ</a
            >
            <a href="#0" class="button silver" @click="oneClickBuy"
              >КУПИТЬ В ОДИН КЛИК</a
            >
            <a href="#like" class="svg-silver"
              ><img class="svg" src="/source/img/like_offer.svg" alt=""
            /></a>
          </div>

          <ProductDescription :item="product" />
        </div>
        <!-- 2ой блок -->
      </section>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      cnt: 1,
      variation: null,
      activeOptions: {},
    };
  },
  async asyncData({ error, $api, params, $url }) {
    try {
      const product = await $api.$get("product", { slug: params.slug });
      if (!product) throw { statusCode: 404 };
      const mainCategory = product.category[0];
      let breadcrumbs = [];
      if (mainCategory) {
        const { items } = await $api.$get("categoryBreadcrumbs", {
          id: mainCategory.id,
        });
        console.log(items);
        breadcrumbs = items.map((item) => ({
          name: item.name,
          link: $url.category(item.fullSlug),
        }));
      }
     
      breadcrumbs.push({
        title: product.name,
        link: "#",
      });
      return {
        product,
        breadcrumbs,
      };
    } catch (err) {
      console.log(err);
      error(err);
    }
  },
  computed: {
    mainImage() {
      return this.product.defaultImage
    },
    name() {
      return this.product.name;
    },
  },
  methods: {
    oneClickBuy() {},
    addToCart() {
      this.$store.dispatch("cart/add", {
        id: this.product.id,
        cnt: this.cnt,
        variation: this.variation,
        options: this.activeOptions,
      });
    },
  },
};
</script>

<style lang="scss" >
</style>