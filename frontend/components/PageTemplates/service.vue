<template>
  <div>
    <AppBreadcrumbs :items="breadcrumbs" />
    <section class="tabs__head">
      <div class="container">
        <div class="tabs__button">
          <div class="tablinks button">Пошив на заказ</div>
          <div class="tablinks button active">Установка</div>
          <div class="tablinks button">ПОДШИВ</div>
        </div>
      </div>
    </section>

    <section class="about-us">
      <div class="container">
        <div class="about-us__swiper-container swiper-container">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(item, idx) in getValue('usluga.slaid-shou_bloka_uslugi')"
              :key="idx"
            >
              <img
                :src="
                  getValue(
                    `usluga.slaid-shou_bloka_uslugi[${idx}].izobrazhenie.url`
                  )
                "
                alt="image"
              />
            </div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>

        <div class="about-us__text">
          <!-- Заголовок и описание на сайте повторяются -->
          <div class="title without-button">
            <div class="title-description">
              <span>{{ getValue("usluga.podzagolovok_bloka") }}</span>
            </div>
            <div class="title-name">
              <h2>{{ getValue("usluga.zagolovok_bloka") }}</h2>
            </div>
            <div class="title-text">
              <AText :text="getValue('usluga.tekst_bloka')" />
            </div>

            <div class="title-button">
              <nuxt-link
                :to="getValue('usluga.ssilka_knopki') || '#'"
                class="button"
                >{{ getValue("usluga.nazvanie_knopki") }}</nuxt-link
              >
            </div>
          </div>
          <!-- Конец - Заголовок и описание на сайте повторяются -->
        </div>
      </div>

      <div class="about-us__whitespace"></div>
    </section>

    <section class="our-work">
      <div class="title-description">
        <span>ФОТО пошива на заказ</span>
      </div>
      <div class="title-name">
        <h2>Наши работы</h2>
      </div>
      <div class="container">
        <div class="our-work__swiper-container2 swiper-container">
          <div class="swiper-wrapper thumb">
            <div class="swiper-slide">
              <a href="#img1">
                <img src="source/img/our_work/our1.jpg" alt="" />
              </a>
            </div>
            <div class="swiper-slide">
              <a href="#img2">
                <img src="source/img/our_work/our2.jpg" alt="" />
              </a>
            </div>
            <div class="swiper-slide">
              <a href="#img3">
                <img src="source/img/our_work/our3.jpg" alt="" />
              </a>
            </div>
            <div class="swiper-slide">
              <a href="#img4">
                <img src="source/img/our_work/our4.jpg" alt="" />
              </a>
            </div>
            <div class="swiper-slide">
              <a href="#img5">
                <img src="source/img/our_work/our5.jpg" alt="" />
              </a>
            </div>
            <div class="swiper-slide">
              <a href="#img6">
                <img src="source/img/our_work/our8.jpg" alt="" />
              </a>
            </div>
          </div>
          <a href="#close" class="lightbox" id="img1">
            <img src="source/img/our_work/our1.jpg" />
          </a>

          <a href="#close" class="lightbox" id="img2">
            <img src="source/img/our_work/our2.jpg" />
          </a>
          <a href="#close" class="lightbox" id="img3">
            <img src="source/img/our_work/our3.jpg" />
          </a>
          <a href="#close" class="lightbox" id="img4">
            <img src="source/img/our_work/our4.jpg" />
          </a>
          <a href="#close" class="lightbox" id="img5">
            <img src="source/img/our_work/our5.jpg" />
          </a>
          <a href="#close" class="lightbox" id="img6">
            <img src="source/img/our_work/our8.jpg" />
          </a>

          <div class="swiper-pagination"></div>
        </div>
      </div>
    </section>

    <section class="block-help fadeUp t-default" data-t-show="2">
      <div class="container">
        <div class="block-help__bg">
          <div class="row">
            <div class="block-help__row">
              <span class="block-help__row-title"> Нужна помощь? </span>

              <span class="block-help__row-text">
                Заполните форму и наши специалисты с удовольствием помогут Вам в
                ближайшее время.
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
                <a href="#">Отправить</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--  Конец Блок Нужна помощь -->
  </div>
</template>

<script>
import PageTemplateMixin from "@/mixins/PageTemplateMixin";

export default {
  mixins: [PageTemplateMixin],
  computed: {
    breadcrumbs() {
      return [
        {
          title: "Главная",
          link: "/",
        },
        {
          title: this.value.name,
        },
      ];
    },
  },
  mounted() {
    this.initSlider();
  },
  methods: {
    initSlider() {
      var swiper = new Swiper(".our-work__swiper-container2", {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        updateOnWindowResize: true,
        observer: true,
        observeParents: true,
        // init: false,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 30,
          },
        },
      });
      console.log("wtf?", swiper);
    },
  },
};
</script>

<style lang="scss" >
</style>