<template>
  <main class="page__about-us">
    <!-- О нас -->
    <AppBreadcrumbs :items="breadcrumbs" />
    <section class="about-us">
      <div class="container">
        <client-only>
        <swiper
          class="about-us__swiper-container swiper-container"
          :options="sliderOptions"
        >
          <swiper-slide
            class="swiper-slide"
            v-for="(item, idx) in getValue(
              'o_kompanii.slaid-shou_bloka_o_kompanii'
            )"
            :key="idx"
          >
            <img
              :src="
                getValue(
                  `o_kompanii.slaid-shou_bloka_o_kompanii[${idx}].izobrazhenie_slaida.url`
                )
              "
              alt=""
            />
          </swiper-slide>
          <!-- Add Pagination -->
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        </client-only>


        <div class="about-us__text">
          <!-- Заголовок и описание на сайте повторяются -->
          <div class="title without-button">
            <div class="title-description">
              <span>{{
                getValue("o_kompanii.zagolovok_bloka_o_kompanii")
              }}</span>
            </div>
            <div class="title-name">
              <h2>
                {{ getValue("o_kompanii.podzagolovok_bloka_o_kompanii") }}
              </h2>
            </div>
            <div class="title-text">
              <AText :text="getValue('o_kompanii.tekst_o_kompanii')" />
            </div>
          </div>
          <!-- Конец - Заголовок и описание на сайте повторяются -->
        </div>
      </div>

      <div class="about-us__whitespace"></div>
    </section>
    <!--  Конец  О нас -->

    <!--  Плюсы компании -->
    <section class="company__advantag fadeUp t-default" data-t-show="2">
      <div class="container">
        <!--   Заголовок и описание на сайте повторяются -->
        <div class="title">
          <div class="title-description">
            <span>{{
              getValue("plyusi_kompanii.zagolovok_bloka_plyusi")
            }}</span>
          </div>
          <div class="title-name">
            <h2>{{ getValue("plyusi_kompanii.zagolovok_bloka_plyusi") }}</h2>
          </div>
        </div>
        <!--  Конец - Заголовок и описание на сайте повторяются -->

        <!--  Плюсы компании -->
        <div class="company__advantag-block">
          <div
            class="company__advantag-item"
            v-for="(item, idx) in getValue('plyusi_kompanii.plyusi_kompanii')"
            :key="idx"
          >
            <div class="company__advantag-block-icon">
              <img
                :src="
                  getValue(
                    `plyusi_kompanii.plyusi_kompanii[${idx}].ikonka_plyusa.url`
                  )
                "
              />
            </div>
            <div class="company__advantag-block-text">
              {{
                getValue(`plyusi_kompanii.plyusi_kompanii[${idx}].tekst_plyusa`)
              }}
            </div>
          </div>
        </div>
        <!--  Конец Плюсы компании -->
      </div>
    </section>
    <!--  Плюсы компании -->

    <!--   Заголовок и описание на сайте повторяются -->
    <div class="title fadeUp t-default" data-t-show="2">
      <div class="title-description">
        <span>Есть всё необходимое</span>
      </div>
      <div class="title-name">
        <h2>Категории товара</h2>
      </div>
    </div>
    <!--  Конец - Заголовок и описание на сайте повторяются -->

    <!--  Переход по каталогу -->
    <section class="catalog fadeUp t-default" data-t-show="2">
      <div class="container">
        <div class="catalog__grid">
          <!-- Каталог 1 -->
          <div class="catalog__block">
            <a href="#0">
              <h4 class="catalog__block-name">Накидки</h4>
              <img
                class="catalog__block-image"
                src="/source/img/catalog/cat1.png"
              />
            </a>
          </div>
          <!-- Каталог 1 -->

          <!-- Каталог 1 -->
          <div class="catalog__block block__row">
            <a href="#0">
              <h4 class="catalog__block-name">Авточехлы</h4>
              <img
                class="catalog__block-image"
                src="/source/img/catalog/cat5.png"
              />
            </a>
          </div>
          <!-- Каталог 1 -->

          <!-- Каталог 1 -->
          <div class="catalog__block">
            <a href="#0">
              <h4 class="catalog__block-name">Пошив на заказ</h4>
              <img
                class="catalog__block-image"
                src="/source/img/catalog/cat3.png"
              />
            </a>
          </div>
          <!-- Каталог 1 -->

          <!-- Каталог 1 -->
          <div class="catalog__block">
            <a href="#0">
              <h4 class="catalog__block-name">Коврики</h4>
              <img
                class="catalog__block-image"
                src="/source/img/catalog/cat2.png"
              />
            </a>
          </div>
          <!-- Каталог 1 -->

          <!-- Каталог 1 -->
          <div class="catalog__block">
            <a href="#0">
              <h4 class="catalog__block-name">Аксессуары</h4>
              <img
                class="catalog__block-image"
                src="/source/img/catalog/cat4.png"
              />
            </a>
          </div>

          <!-- Каталог 1 -->
        </div>
      </div>
    </section>
    <!--  Конец Переход по каталогу -->

    <!--   Блок Нужна помощь -->
    <section class="block-help fadeUp t-default" data-t-show="2">
      <div class="container">
        <div class="block-help__bg">
          <div class="row">
            <div class="block-help__row">
              <span class="block-help__row-title">
                {{ getValue("tochka_zakhvata.zagolovok_t/z") }}
              </span>

              <span class="block-help__row-text">
                {{ getValue("tochka_zakhvata.tekst_t/z") }}
              </span>
            </div>

            <div class="block-help__row">
              <input
                class="block-help__row-input"
                type="text"
                placeholder="Имя*"
              />
              <input
                class="block-help__row-input"
                type="text"
                placeholder="Телефон *"
              />
              <input
                class="block-help__row-input"
                type="text"
                placeholder="Email *"
              />

              <div class="agree">
                <input id="contact__formch" type="checkbox" checked hidden />
                <label for="contact__formch"
                  ><span>
                    Я согласен(на) на обработку персональных данных</span
                  ></label
                >
              </div>

              <div class="button">
                <a href="#">{{
                  getValue("tochka_zakhvata.tekst_knopki_t/z")
                }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--  Конец Блок Нужна помощь -->
  </main>
</template>

<script>
import PageTemplateMixin from "@/mixins/PageTemplateMixin";

export default {
  mixins: [PageTemplateMixin],
  mounted() {},
  computed: {
    sliderOptions() {
      return {
        direction: "vertical",
        slidesPerView: 1,
        mousewheel: true,
        dynamicBullets: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          renderBullet: function (index, className) {
            return (
              '<span class="' + className + '"> 0' + (index + 1) + "</span>"
            );
          },
        },
        autoplay: {
          delay: 5500,
          disableOnInteraction: false,
        },
        loop: true,
        updateOnWindowResize: true,
        observer: true,
        observeParents: true,
      };
    },
    breadcrumbs() {
      return [
       
        {
          title: this.value.name,
        },
      ];
    },
  },
};
</script>

<style lang="scss" >
</style>