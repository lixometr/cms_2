<template>
  <div class="reviews">
    <div class="reviews-header">
      <div class="reviews-title reviews-title__open">
        <span>Отзывы</span>
        <b class="reviews-count">{{ reviewsCnt }}</b>
      </div>

      <div class="reviews-button">
        <!-- тоже модальное окно, отличия лишь в наличии текстареа -->
        <a id="myBtn" href="#0" class="button" @click.prevent="sendReview">Оставить отзыв</a>
      </div>
    </div>

    <div class="reviews-body">
      <div class="comment" v-for="(item, idx) in reviews" :key="idx">
        <ul class="comment__list">
          <li class="comment__name">
            {{ getValue(item, "familiya_imya_otchestvo") }}
          </li>
          <li class="comment__date">{{ getValue(item, "data_otzyva") }}</li>
        </ul>
        <p class="comment__text" v-html="getValue(item, 'otzyv_klienta')"></p>
      </div>
    </div>
    <ProductMenu />
  </div>
</template>

<script>
export default {
  data: () => ({
    open: true,
    reviews: [],
  }),
  computed: {
    reviewsCnt() {
      return this.reviews.length
    },
    getValue() {
      return (item, field) => {
        return item.values[field];
      };
    },
  },
  async fetch() {
    await this.fetchReviews();
  },
  mounted() {
    // показать и скрыть отзывы
    $(".reviews-title").click(function (event) {
      if ($(".reviews-title").hasClass("reviews-title__open")) {
        $(this)
          .removeClass("reviews-title__open")
          .addClass("reviews-title__close");
        $(".reviews-body").slideUp();
      } else {
        $(this)
          .removeClass("reviews-title__close")
          .addClass("reviews-title__open");
        $(".reviews-body").slideDown();
      }
    });
  },
  methods: {
    sendReview() {
      this.$modal.open("contact");
    },
    shuffle(a) {
      var j, x, i;
      for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
      }
      return a;
    },
    getRandomCnt(max) {
      const min = 1;
      max = Math.min(4, max)
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    async fetchReviews() {
      const { items: reviews } = await this.$api.$get("sectionItems", {
        slug: "reviews",
      });
      const shReviews = this.shuffle(reviews);
      const rand = this.getRandomCnt(shReviews.length);
      this.reviews = shReviews.slice(0, rand);
    },
    toggle() {
      this.open = !this.open;
    },
  },
};
</script>

<style lang="scss" >
</style>