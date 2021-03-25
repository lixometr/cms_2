<template>
  <div class="reviews">
    <div class="reviews-header">
      <div
        class="reviews-title reviews-title__open"
      >
        <span>Отзывы</span>
        <b class="reviews-count">2</b>
      </div>

      <div class="reviews-button">
        <!-- тоже модальное окно, отличия лишь в наличии текстареа -->
        <a id="myBtn" href="#0" class="button">Оставить отзыв</a>
      </div>
    </div>

    <div class="reviews-body" >
      <div class="comment">
        <ul class="comment__list">
          <li class="comment__name">ВАСИЛИЙ ИВАНОВ</li>
          <li class="comment__date">19 ЯНВАРЯ 2020</li>
        </ul>
        <p class="comment__text">
          H7 Headline Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру
          сгенерировать несколько абзацев более менее осмысленного текста рыбы
          на русском языке, а начинающему оратору отточить навык публичных
          выступлений.
        </p>
      </div>

      <div class="comment">
        <ul class="comment__list">
          <li class="comment__name">ВАСИЛИЙ ИВАНОВ</li>
          <li class="comment__date">19 ЯНВАРЯ 2020</li>
        </ul>
        <p class="comment__text">
          H7 Headline Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру
          сгенерировать несколько абзацев более менее осмысленного текста рыбы
          на русском языке, а начинающему оратору отточить навык публичных
          выступлений.
        </p>
      </div>
    </div>
    <ProductMenu />
  </div>
</template>

<script>
export default {
  data: () => ({
    open: true,
  }),
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
    toggle() {
      this.open = !this.open;
    },
  },
};
</script>

<style lang="scss" >
</style>