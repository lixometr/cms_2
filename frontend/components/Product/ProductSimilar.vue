<template>
  <div>
    <h3 class="single-product__preview-recomended-title" v-if="items.length > 0">
      С этим товаром покупают
    </h3>
    <div class="cards__row">
      <!-- Swiper -->
      <client-only>
        <swiper
          :options="sliderOpts"
          class="recommended swiper-container"
          v-if="items.length > 0"
        >
          <swiper-slide
            class="swiper-slide"
            v-for="(item, idx) in items"
            :key="idx"
          >
            <ProductSimilarItem :product="item" />
          </swiper-slide>
          <!-- Add Pagination -->
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </client-only>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    items: [],
  }),
  async fetch() {
    await this.fetchItems();
  },
  methods: {
    async fetchItems() {
      try {
        const { items } = await this.$api.$get("productSimilarItems", {
          id: this.item.id,
        });
        this.items = items || [];
      } catch (err) {
        this.$error(err);
      }
    },
  },
  computed: {
    sliderOpts() {
      return {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
          el: ".swiper-pagination",
          dynamicBullets: true,
          clickable: true,
        },
        autoplay: {
          delay: 8500,
        },
        breakpoints: {
          550: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1380: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        },
        loop: true,
        updateOnWindowResize: true,
        observer: true,
        // observeParents: true,
      };
    },
  },
};
</script>

<style lang="scss" >
</style>