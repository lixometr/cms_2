<template>
  <div>
    <AppBreadcrumbs :items="[{ title: '404', link: '#' }]" />

    <div class="page-404" v-if="statusCode === 404" key="404">
      <section class="page-404">
        <main class="lighten">
          <div>
            <div>
              <span class="page-404__text"> <p>404</p></span>
            </div>
            <svg viewBox="0 0 200 600">
              <polygon
                points="118.302698 8 59.5369448 66.7657528 186.487016 193.715824 14 366.202839 153.491505 505.694344 68.1413353 591.044514 200 591.044514 200 8"
              ></polygon>
            </svg>
          </div>
          <svg class="crack" viewBox="0 0 200 600">
            <polyline
              points="118.302698 8 59.5369448 66.7657528 186.487016 193.715824 14 366.202839 153.491505 505.694344 68.1413353 591.044514 75.01111 600.1111"
            ></polyline>
          </svg>
          <div>
            <svg viewBox="0 0 200 600">
              <polygon
                points="118.302698 8 59.5369448 66.7657528 186.487016 193.715824 14 366.202839 153.491505 505.694344 68.1413353 591.044514 0 591.044514 0 8"
              ></polygon>
            </svg>
            <div>
              <span>
                <p>
                  Страница не найдена либо удалена.<br />

                  Пожалуйста, перейдите на
                  <nuxt-link to="/" class="link__home">Главную </nuxt-link>страницу
                  сайта .
                </p>
              </span>
            </div>
          </div>
        </main>

        <div class="page404__wrapp">
          <div class="page-404__number">
            <p>404</p>
          </div>
          <div class="page-404__lightning">
            <svg class="test">
              <path
                class="path"
                stroke="#ffa401"
                stroke-width="4"
                d="M 50,10,30,42, 33,45,70,70, 72,69,20,130,22,132,70,170,70,170,20,220,22,219,45,240      
					 "
              />
            </svg>
            <img src="source/img/lightning.png" alt="lightning" />
          </div>
          <div class="page-404__text">
            <p>
              Страница не найдена либо удалена.<br />

              Пожалуйста, перейдите на
              <a href="index.html" class="link__home">Главную </a>страницу сайта
              .
            </p>
          </div>
        </div>
      </section>
    </div>
    <div class="page-500" v-else key="500">Что-то пошло не так</div>
  </div>
</template>

<script>
export default {
  props: {
    error: null,
  },

  mounted() {
    console.log(this.error);
  },
  head() {
    return {};
  },
  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 500;
    },
  },
};
</script>

<style>
</style>