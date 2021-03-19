<template>
  <main class="main-page">
    <section class="offer">
      <client-only>
        <swiper
          class="offer-swiper-container swiper-container"
          :options="slider1Options"
        >
          <swiper-slide
            class="swiper-slide"
            v-for="(item, idx) in getValue('slaid-shou')"
            :key="idx"
          >
            <div class="qwe">
              <img
                :src="getValue(`slaid-shou[${idx}].izobrazhenie_slaida.url`)"
              />
            </div>

            <div class="container">
              <div class="offer__text">
                <div class="offer__text-title">
                  <h1>{{ getValue(`slaid-shou[${idx}].zagolovok_slaida`) }}</h1>
                </div>
                <div class="offer__text-text">
                  <p>
                    {{ getValue(`slaid-shou[${idx}].podzagolovok_slaida`) }}
                  </p>
                </div>
                <div class="offer__text-button">
                  <nuxt-link
                    :to="getValue(`slaid-shou[${idx}].ssilka_knopki_slaida`)"
                    class="button"
                    >{{
                      getValue(`slaid-shou[${idx}].nazvanie_knopki_slaida`)
                    }}</nuxt-link
                  >
                </div>
              </div>
            </div>
          </swiper-slide>

          <!-- Add Pagination -->
          <div
            class="offer-swiper-pagination swiper-pagination"
            slot="pagination"
          ></div>
        </swiper>
      </client-only>
    </section>
    <!-- Блок поиска -->
    <section class="search-block">
      <div class="container">
        <div class="search-block__select">
          <div class="select">
            <input class="select__input" type="hidden" name="" />
            <div class="select__head">Марка</div>
            <ul class="select__list" style="display: none">
              <li class="select__item">shevrolet</li>
              <li class="select__item">nissan</li>
              <li class="select__item">hyundai</li>
            </ul>
          </div>

          <div class="select">
            <input class="select__input" type="hidden" name="" />
            <div class="select__head">Модель</div>
            <ul class="select__list" style="display: none">
              <li class="select__item">shevrolet</li>
              <li class="select__item">nissan</li>
              <li class="select__item">hyundai</li>
            </ul>
          </div>

          <div class="select">
            <input class="select__input" type="hidden" name="" />
            <div class="select__head">Поколение</div>
            <ul class="select__list" style="display: none">
              <li class="select__item">1 поколения</li>
              <li class="select__item">2 поколения</li>
              <li class="select__item">3 поколения</li>
            </ul>
          </div>
          <div class="offer__text-button">
            <a href="#0" class="button">найти</a>
          </div>
          <!-- <input type="button" value="найти"> -->
        </div>
      </div>
    </section>
    <!-- Конец Блок поиска -->

    <!-- Переход по каталогу -->
    <section class="catalog fadeUp t-default" data-t-show="2">
      <div class="container">
        <div class="catalog__grid">
          <!-- Каталог 1 -->
          <div
            class="catalog__block"
            :class="{ block__row: idx % 6 === 1 }"
            v-for="(item, idx) in getValue(
              'kategorii_tovarov_na_glavnoi_stranitse'
            )"
            :key="idx"
          >
            <nuxt-link
              :to="
                getValue(
                  `kategorii_tovarov_na_glavnoi_stranitse[${idx}].ssilka_na_kategoriyu_tovarov`
                ) || '#'
              "
            >
              <h4 class="catalog__block-name">
                {{
                  getValue(
                    `kategorii_tovarov_na_glavnoi_stranitse[${idx}].nazvanie_kategorii_tovarov`
                  )
                }}
              </h4>
              <img
                class="catalog__block-image"
                :src="
                  getValue(
                    `kategorii_tovarov_na_glavnoi_stranitse[${idx}].izobrazhenie_kategorii_tovarov.url`
                  )
                "
              />
            </nuxt-link>
          </div>
          <!-- Каталог 1 -->

          <!-- <div class="catalog__block block__row">
            <a href="page_marks.html">
              <h4 class="catalog__block-name">Авточехлы</h4>
              <img
                class="catalog__block-image"
                src="source/img/catalog/cat5.png"
              />
            </a>
          </div>

          <div class="catalog__block">
            <a href="page_marks.html">
              <h4 class="catalog__block-name">Пошив на заказ</h4>
              <img
                class="catalog__block-image"
                src="source/img/catalog/cat3.png"
              />
            </a>
          </div>

          <div class="catalog__block">
            <a href="page_marks.html">
              <h4 class="catalog__block-name">Коврики</h4>
              <img
                class="catalog__block-image"
                src="source/img/catalog/cat2.png"
              />
            </a>
          </div>

          <div class="catalog__block">
            <a href="page_marks.html">
              <h4 class="catalog__block-name">Аксессуары</h4>
              <img
                class="catalog__block-image"
                src="source/img/catalog/cat4.png"
              />
            </a>
          </div> -->
        </div>
      </div>
    </section>
    <!-- Конец Переход по каталогу -->

    <!-- Товары дня -->
    <section class="goods-block fadeUp t-default" data-t-show="2">
      <div class="container">
        <!--! Заголовок и описание на сайте повторяются, работает и внутри и отдельно -->
        <div class="title">
          <div class="title-description">
            <span
              >{{
                getValue("vivod_tovarov_na_glavnoi.podzagolovok_vivoda_tovarov")
              }}
            </span>
          </div>
          <div class="title-name">
            <h2>
              {{
                getValue(
                  "vivod_tovarov_na_glavnoi.nazvanie_bloka_vivoda_tovarov"
                )
              }}
            </h2>
          </div>
        </div>
        <!--! Конец - Заголовок и описание на сайте повторяются -->

        <!-- Обертка товаров -->
        <div class="goods-block__container">
          <!--  Товар -->
          <div class="card">
            <div class="card__image">
              <img
                src="source/img/goods/sed1.png"
                alt="АВТОЧЕХОЛ ДЛЯ AUDI 100 45 СЕДАН (1990-1994)"
              />
            </div>
            <div class="card__title">
              <p class="name">АВТОЧЕХОЛ ДЛЯ AUDI 100 45 СЕДАН (1990-1994)</p>
            </div>
            <div class="card__material">
              <span class="material">Материал: Экокожа</span>
            </div>
            <div class="card__price">
              <ul class="card__price">
                <li class="old-price"><span>2 800 ₽</span></li>
                <li class="new-price"><span>2 300 ₽</span></li>
              </ul>
            </div>
            <div class="card__like-button active">
              <img class="svg" src="source/img/like.svg" alt="+1" />
            </div>
            <div class="card__buy-button active">
              <img class="svg" src="source/img/buy.svg" alt="Купить" />
            </div>
            <div class="card__attributes">
              <div class="attribute">
                <p>Хит</p>
              </div>
              <div class="attribute">
                <p>-53%</p>
              </div>
            </div>
            <a class="card__link" href="page_single_product.html"></a>
          </div>
          <!-- Конец - Товар -->

          <!--  Товар -->
          <div class="card">
            <div class="card__image">
              <img
                src="source/img/goods/sed2.png"
                alt="АВТОЧЕХОЛ ДЛЯ AUDI 100 45 СЕДАН (1990-1994)"
              />
            </div>
            <div class="card__title">
              <p class="name">АВТОЧЕХОЛ ДЛЯ AUDI 100 45 СЕДАН (1990-1994)</p>
            </div>
            <div class="card__material">
              <span class="material">Материал: Экокожа</span>
            </div>
            <div class="card__price">
              <ul class="card__price">
                <li class="old-price"><span>2 800 ₽</span></li>
                <li class="new-price"><span>2 300 ₽</span></li>
              </ul>
            </div>
            <div class="card__like-button">
              <img class="svg" src="source/img/like.svg" alt="+1" />
            </div>
            <div class="card__buy-button">
              <img class="svg" src="source/img/buy.svg" alt="Купить" />
            </div>
            <div class="card__attributes">
              <div class="attribute">
                <p>Хит</p>
              </div>
              <div class="attribute">
                <p>-53%</p>
              </div>
            </div>
            <a class="card__link" href="#0"></a>
          </div>
          <!-- Конец - Товар -->

          <!--  Товар -->
          <div class="card">
            <div class="card__image">
              <img
                src="source/img/goods/sed3.png"
                alt="АВТОЧЕХОЛ ДЛЯ AUDI 100 45 СЕДАН (1990-1994)"
              />
            </div>
            <div class="card__title">
              <p class="name">АВТОЧЕХОЛ ДЛЯ AUDI 100 45 СЕДАН (1990-1994)</p>
            </div>
            <div class="card__material">
              <span class="material">Материал: Экокожа</span>
            </div>
            <div class="card__price">
              <ul class="card__price">
                <li class="old-price"><span>2 800 ₽</span></li>
                <li class="new-price"><span>2 300 ₽</span></li>
              </ul>
            </div>
            <div class="card__like-button">
              <img class="svg" src="source/img/like.svg" alt="+1" />
            </div>
            <div class="card__buy-button">
              <img class="svg" src="source/img/buy.svg" alt="Купить" />
            </div>
            <div class="card__attributes">
              <div class="attribute">
                <p>Хит</p>
              </div>
              <div class="attribute">
                <p>-53%</p>
              </div>
            </div>
            <a class="card__link" href="#0"></a>
          </div>
          <!-- Конец - Товар -->

          <!--  Товар -->
          <div class="card">
            <div class="card__image">
              <img
                src="source/img/goods/sed4.png"
                alt="АВТОЧЕХОЛ ДЛЯ AUDI 100 45 СЕДАН (1990-1994)"
              />
            </div>
            <div class="card__title">
              <p class="name">АВТОЧЕХОЛ ДЛЯ AUDI 100 45 СЕДАН (1990-1994)</p>
            </div>
            <div class="card__material">
              <span class="material">Материал: Экокожа</span>
            </div>
            <div class="card__price">
              <ul class="card__price">
                <li class="old-price"><span>2 800 ₽</span></li>
                <li class="new-price"><span>2 300 ₽</span></li>
              </ul>
            </div>
            <div class="card__like-button">
              <img class="svg" src="source/img/like.svg" alt="+1" />
            </div>
            <div class="card__buy-button">
              <img class="svg" src="source/img/buy.svg" alt="Купить" />
            </div>
            <div class="card__attributes">
              <div class="attribute">
                <p>Хит</p>
              </div>
              <div class="attribute">
                <p>-53%</p>
              </div>
            </div>
            <a class="card__link" href="#0"></a>
          </div>
          <!-- Конец - Товар -->

          <!--  Товар -->
          <div class="card">
            <div class="card__image">
              <img
                src="source/img/goods/sed1.png"
                alt="АВТОЧЕХОЛ ДЛЯ AUDI 100 45 СЕДАН (1990-1994)"
              />
            </div>
            <div class="card__title">
              <p class="name">АВТОЧЕХОЛ ДЛЯ AUDI 100 45 СЕДАН (1990-1994)</p>
            </div>
            <div class="card__material">
              <span class="material">Материал: Экокожа</span>
            </div>
            <div class="card__price">
              <ul class="card__price">
                <li class="old-price"><span>2 800 ₽</span></li>
                <li class="new-price"><span>2 300 ₽</span></li>
              </ul>
            </div>
            <div class="card__like-button">
              <img class="svg" src="source/img/like.svg" alt="+1" />
            </div>
            <div class="card__buy-button">
              <img class="svg" src="source/img/buy.svg" alt="Купить" />
            </div>
            <div class="card__attributes">
              <div class="attribute">
                <p>Хит</p>
              </div>
              <div class="attribute">
                <p>-53%</p>
              </div>
            </div>
            <a class="card__link" href="#0"></a>
          </div>
          <!-- Конец - Товар -->

          <!--  Товар -->
          <div class="card">
            <div class="card__image">
              <img
                src="source/img/goods/sed1.png"
                alt="АВТОЧЕХОЛ ДЛЯ AUDI 100 45 СЕДАН (1990-1994)"
              />
            </div>
            <div class="card__title">
              <p class="name">АВТОЧЕХОЛ ДЛЯ AUDI 100 45 СЕДАН (1990-1994)</p>
            </div>
            <div class="card__material">
              <span class="material">Материал: Экокожа</span>
            </div>
            <div class="card__price">
              <ul class="card__price">
                <li class="old-price"><span>2 800 ₽</span></li>
                <li class="new-price"><span>2 300 ₽</span></li>
              </ul>
            </div>
            <div class="card__like-button">
              <img class="svg" src="source/img/like.svg" alt="+1" />
            </div>
            <div class="card__buy-button">
              <img class="svg" src="source/img/buy.svg" alt="Купить" />
            </div>
            <div class="card__attributes">
              <div class="attribute">
                <p>Хит</p>
              </div>
              <div class="attribute">
                <p>-53%</p>
              </div>
            </div>
            <a class="card__link" href="#0"></a>
          </div>
          <!-- Конец - Товар -->

          <!--  Товар -->
          <div class="card">
            <div class="card__image">
              <img
                src="source/img/goods/sed1.png"
                alt="АВТОЧЕХОЛ ДЛЯ AUDI 100 45 СЕДАН (1990-1994)"
              />
            </div>
            <div class="card__title">
              <p class="name">АВТОЧЕХОЛ ДЛЯ AUDI 100 45 СЕДАН (1990-1994)</p>
            </div>
            <div class="card__material">
              <span class="material">Материал: Экокожа</span>
            </div>
            <div class="card__price">
              <ul class="card__price">
                <li class="old-price"><span>2 800 ₽</span></li>
                <li class="new-price"><span>2 300 ₽</span></li>
              </ul>
            </div>
            <div class="card__like-button">
              <img class="svg" src="source/img/like.svg" alt="+1" />
            </div>
            <div class="card__buy-button">
              <img class="svg" src="source/img/buy.svg" alt="Купить" />
            </div>
            <div class="card__attributes">
              <div class="attribute">
                <p>Хит</p>
              </div>
              <div class="attribute">
                <p>-53%</p>
              </div>
            </div>
            <a class="card__link" href="#0"></a>
          </div>
          <!-- Конец - Товар -->

          <!--  Товар -->
          <div class="card">
            <div class="card__image">
              <img
                src="source/img/goods/sed1.png"
                alt="АВТОЧЕХОЛ ДЛЯ AUDI 100 45 СЕДАН (1990-1994)"
              />
            </div>
            <div class="card__title">
              <p class="name">АВТОЧЕХОЛ ДЛЯ AUDI 100 45 СЕДАН (1990-1994)</p>
            </div>
            <div class="card__material">
              <span class="material">Материал: Экокожа</span>
            </div>
            <div class="card__price">
              <ul class="card__price">
                <li class="old-price"><span>2 800 ₽</span></li>
                <li class="new-price"><span>2 300 ₽</span></li>
              </ul>
            </div>
            <div class="card__like-button">
              <img class="svg" src="source/img/like.svg" alt="+1" />
            </div>
            <div class="card__buy-button">
              <img class="svg" src="source/img/buy.svg" alt="Купить" />
            </div>
            <div class="card__attributes">
              <div class="attribute">
                <p>Хит</p>
              </div>
              <div class="attribute">
                <p>-53%</p>
              </div>
            </div>
            <a class="card__link" href="#0"></a>
          </div>
          <!-- Конец - Товар -->
        </div>
        <!-- Конец Обертка товаров -->
      </div>
    </section>
    <!-- Конец Товары дня-->

    <!-- СпецПредложения -->
    <aside class="special-goods fadeUp t-default" data-t-show="2">
      <div class="container">
        <div class="special-goods__column">
          <div class="column">
            <div class="column__inner">
              <h2 class="column-title">
                {{
                  getValue(
                    "blok_perebivki_na_glavnoi.zagolovok_bloka_perebivki"
                  )
                }}
              </h2>

              <p class="column-text">
                {{
                  getValue(
                    "blok_perebivki_na_glavnoi.podzagolovok_bloka_perebivki_tovarov"
                  )
                }}
              </p>
            </div>
            <!-- <input type="button" value="Выбрать" class="button"> -->

            <div class="offer__text-button">
              <nuxt-link
                :to="
                  getValue(
                    'blok_perebivki_na_glavnoi.ssilka_knopki_bloka_perebivki'
                  ) || '#'
                "
                class="button"
                >{{
                  getValue(
                    "blok_perebivki_na_glavnoi.nazvanie_knopki_bloka_perebivki"
                  )
                }}</nuxt-link
              >
            </div>

            <img
              class="special-goods__image preview"
              :src="
                getValue(
                  'blok_perebivki_na_glavnoi.izobrazhenie_bloka_perebivki.url'
                )
              "
              alt=""
            />
          </div>
        </div>

        <div class="special-goods__column">
          <img
            class="special-goods__image special-goods__image"
            :src="
              getValue(
                'blok_perebivki_na_glavnoi.izobrazhenie_na_fone_bloka_perebivki.url'
              )
            "
          />
        </div>
      </div>
    </aside>
    <!--конец  СпецПредложения -->

    <!-- О нас -->
    <section class="about-us fadeUp t-default" data-t-show="3">
      <div class="container">
        <client-only>
          <swiper
            class="about-us__swiper-container swiper-container"
            :options="slider2Options"
          >
            <swiper-slide
              v-for="(item, idx) in getValue(
                'blok_o_kompanii_na_glavnoi.slaid-shou_bloka_o_kompanii_na_glavnoi'
              )"
              :key="idx"
            >
              <img
                :src="
                  getValue(
                    `blok_o_kompanii_na_glavnoi.slaid-shou_bloka_o_kompanii_na_glavnoi[${idx}].zagruzit_izobrazhenie_bloka_slaid-shou_o_kompanii.url`
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
          <div class="title">
            <div class="title-description">
              <span>{{
                getValue(
                  "blok_o_kompanii_na_glavnoi.podzagolovok_bloka_o_kompanii_na_glavnoi"
                )
              }}</span>
            </div>
            <div class="title-name">
              <h2>
                {{
                  getValue(
                    "blok_o_kompanii_na_glavnoi.zagolovok_bloka_o_kompanii_na_glavnoi"
                  )
                }}
              </h2>
            </div>
            <div class="title-text">
              <AText
                :text="
                  getValue(
                    'blok_o_kompanii_na_glavnoi.tekst_bloka_o_kompanii_na_glavnoi'
                  )
                "
              />
            </div>

            <!-- <div class="title-button">
						<input type="button" value="Подробнее" class="button">
					</div> -->

            <div class="offer__text-button">
              <nuxt-link
                :to="
                  getValue(
                    'blok_o_kompanii_na_glavnoi.ssilka_knopki_bloka_o_kompanii_na_glavnoi'
                  )
                "
                class="button"
                >{{
                  getValue(
                    "blok_o_kompanii_na_glavnoi.nazvanie_knopki_bloka_o_kompanii_na_glavnoi"
                  )
                }}</nuxt-link
              >
            </div>
          </div>
          <!-- Конец - Заголовок и описание на сайте повторяются -->
        </div>
      </div>

      <div class="about-us__whitespace"></div>
    </section>
    <!--Конец  О нас -->

    <!-- блока оставить вопрос -->
    <aside class="questions-block fadeUp t-default" data-t-show="3">
      <div class="container">
        <div class="questions-block__bg">
          <div class="questions-block__bg-columns">
            <span class="questions-block__bg-title">{{
              getValue("tochka_zakhvata_na_glavnoi.zagolovok_bloka_t/z")
            }}</span>
          </div>
          <div class="questions-block__bg-columns">
            <p class="questions-block__bg-text">
              {{
                getValue("tochka_zakhvata_na_glavnoi.podzagolovok_bloka_t/z")
              }}
            </p>
          </div>
          <div class="questions-block__bg-columns" id="myBtn2">
            <nuxt-link
              :to="
                getValue('tochka_zakhvata_na_glavnoi.ssilka_knopki_bloka_t/z')
              "
              class="questions-block__bg-button button"
              >{{
                getValue("tochka_zakhvata_na_glavnoi.nazvanie_knopki_bloka_t/z")
              }}</nuxt-link
            >
          </div>
        </div>
      </div>
    </aside>
    <!--конец  блока оставить вопрос -->
  </main>
</template>

<script>
import PageTemplateMixin from "@/mixins/PageTemplateMixin";
export default {
  mixins: [PageTemplateMixin],
  async mounted() {
    this.initJs();
    // this.initSlider1();
    // this.initSlider2();
  },
  computed: {
    slider1Options() {
      return {
        direction: "vertical",
        slidesPerView: 1,
        spaceBetween: 0,
        mousewheel: false,
        pagination: {
          el: ".offer-swiper-pagination",
          clickable: true,

          renderBullet: function (index, className) {
            return (
              '<span class="' + className + '"> 0' + (index + 1) + "</span>"
            );
          },
        },
        autoplay: {
          delay: 8500,
        },
        loop: true,
        updateOnWindowResize: true,
        observer: true,
        observeParents: true,
      };
    },
    slider2Options() {
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

  methods: {
    initSlider1() {
      var swiper = new Swiper(".offer-swiper-container ", {
        direction: "vertical",
        slidesPerView: 1,
        spaceBetween: 0,
        mousewheel: false,
        pagination: {
          el: ".offer-swiper-pagination",
          clickable: true,

          renderBullet: function (index, className) {
            return (
              '<span class="' + className + '"> 0' + (index + 1) + "</span>"
            );
          },
        },
        autoplay: {
          delay: 8500,
        },
        loop: true,
        updateOnWindowResize: true,
        observer: true,
        observeParents: true,
      });
    },
    initSlider2() {
      var swiper = new Swiper(
        ".about-us__swiper-container",
        this.slider2Options
      );
    },
    initJs() {
      // анимация при загрузке стр
      $(document).ready(function () {
        setTimeout(function () {
          show_first();
        }, 500);

        setTimeout(function () {
          show_second();
        }, 1300);

        setTimeout(function () {
          show_third();
        }, 2100);

        setTimeout(function () {
          show_fourth();
        }, 2900);

        setTimeout(function () {
          show_fiveth();
        }, 3900);

        setTimeout(function () {
          show_sixth();
        }, 3700);
      });

      function show_first() {
        $(".main-page .offer-swiper-container").css({
          visibility: "visible",
          opacity: "1",
        });
      }
      function show_second() {
        $(".main-page .header").css({
          visibility: "visible",
          top: "0px",
        });
      }
      function show_third() {
        $(".main-page .offer__text").css({
          visibility: "visible",
          opacity: "1",
        });
      }

      function show_fourth() {
        $(".main-page .offer-swiper-pagination").css({
          visibility: "visible",
          opacity: "1",
        });
      }
      function show_fiveth() {
        $(".search-block").css({
          visibility: "visible",
          opacity: "1",
        });
      }
      function show_sixth() {
        $(".main-page .offer__bookmarks").css({
          visibility: "visible",
          opacity: "1",
        });
      }
    },
  },
};
</script>

<style lang="scss" >
#curved1 {
  word-spacing: 10px;
}
</style>