<template>
  <div>
    <AppBreadcrumbs :items="breadcrumbs" />
    <section class="tabs__head">
      <div class="container">
        <div class="tabs__button">
          <MenuLink
            class="tablinks button"
             :class="{ active: $route.params.slug === service.slug }"
            v-for="(service, idx) in services"
            :key="idx"
            :link="service"
          >
          </MenuLink>
          <!-- <div
            class="tablinks button"
            :class="{ active: $route.params.slug === service.slug }"
            v-for="(service, idx) in services"
            :key="idx"
            @click="goToService(service.slug)"
          >
            {{ service.name }}
          </div> -->
        </div>
      </div>
    </section>

    <section class="about-us">
      <div class="container">
        <client-only>
          <swiper class="about-us__swiper-container" :options="slider1Options">
            <swiper-slide
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
            </swiper-slide>
            <!-- Add Pagination -->
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </client-only>

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
        <span>{{
          getValue("nashi_raboti.podzagolovok_bloka_nashi_raboti")
        }}</span>
      </div>
      <div class="title-name">
        <h2>{{ getValue("nashi_raboti.zagolovok_bloka_nashi_raboti") }}</h2>
      </div>
      <div class="container">
        <client-only>
          <swiper
            class="our-work__swiper-container2 swiper-container"
            :options="slider2Options"
          >
            <swiper-slide
              class="swiper-slide"
              v-for="(item, idx) in getValue('nashi_raboti.izobrazhenie_rabot')"
              :key="idx"
            >
              <a :href="'#img' + idx">
                <img
                  :src="getValue(`nashi_raboti.izobrazhenie_rabot[${idx}].url`)"
                  alt=""
                />
              </a>
            </swiper-slide>

            <!-- <a href="#close" class="lightbox" id="img1">
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
          </a> -->

            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </client-only>

        <a
          href="#close"
          class="lightbox"
          :id="'img' + idx"
          v-for="(item, idx) in getValue('nashi_raboti.izobrazhenie_rabot')"
          :key="idx"
        >
          <img
            :src="getValue(`nashi_raboti.izobrazhenie_rabot[${idx}].url`)"
            alt=""
          />
        </a>
      </div>
    </section>

    <section class="block-help fadeUp t-default" data-t-show="2">
      <div class="container">
        <div class="block-help__bg">
          <div class="row">
            <div class="block-help__row">
              <span class="block-help__row-title">
                {{
                  getValue(
                    "blok_tochki_zakhvata_na_stranitse_usluga.zagolovok_bloka_t/z"
                  )
                }}
              </span>

              <span class="block-help__row-text">
                {{
                  getValue(
                    "blok_tochki_zakhvata_na_stranitse_usluga.podzagolovok_bloka_t/z"
                  )
                }}
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
                <a href="#">
                  {{
                    getValue(
                      "blok_tochki_zakhvata_na_stranitse_usluga.nazvanie_knopki"
                    )
                  }}</a
                >
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
  data: () => ({
    services: [],
  }),
  async fetch() {
    await this.fetchServices();
  },
  computed: {
    breadcrumbs() {
      return [
        
        {
          title: this.value.name,
        },
      ];
    },
    slider2Options() {
      return {
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
      };
    },
    slider1Options() {
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
  },
  mounted() {},
  methods: {
    async fetchServices() {
      try {
        const serviceMenu = await this.$api.$get("menu", { slug: "service_menu" });
        this.services = serviceMenu.items || [];
      } catch (err) {
        this.$error(err);
      }
    },
    goToService(slug) {
      this.$router.push(this.$url.page(slug));
    },
  },
};
</script>

<style lang="scss" >
.our-work__swiper-container2 {
  img {
    object-fit: cover;
  }
}
</style>