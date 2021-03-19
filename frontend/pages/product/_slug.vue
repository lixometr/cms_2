<template>
  <main class="page__single-product">
    <AppBreadcrumbs :items="breadcrumbs" />
    <div class="container">
      <section class="single-product">
        <!-- 1ый блок -->

        <div class="single-product__preview">
          <!-- title -->
          <h2 class="single-product__preview-title">
            Чехлы из алькантары на Ауди А6 (С4) седан (1994-1997)
          </h2>
          <!-- end title -->

          <!-- Big img -->
          <div class="single-product__preview-image">
            <span class="zoom" id="ex1">
              <img
                src="/source/img/single_product/big_img01.png"
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
          <ProductVariations />
          <ProductOptions />
          <ProductPrice />

          <ProductCnt />
          <div class="description__buttons">
            <a href="#0" class="button">ДОБАВИТ В КОРЗИНУ</a>
            <a href="#0" class="button silver">КУПИТЬ В ОДИН КЛИК</a>
            <a href="#like" class="svg-silver"
              ><img class="svg" src="/source/img/like_offer.svg" alt=""
            /></a>
          </div>

          <div class="description fadeUp t-default" data-t-show="2">
            <span class="description__title">Безопасная оплата:</span>
            <p class="description__text">
              Наличными при получении, банковской картой при получении,
              бесконтактным платежом, безналичным способом.
            </p>

            <span class="description__title">ОПИСАНИЕ:</span>
            <p class="description__text">
              Чехлы изготовлены из матовой экокожи Аригон с полиуретановым
              покрытием на хлопковой основе. Прочный, легкий, экологически
              чистый материал не вызывающий аллергической реакции. Тыльные и
              боковые части чехлов сделаны из гладкой экокожи, а центральная
              часть из перфорированной экокожи, алькантары или велюра. Чехлы
              изготовлены со всеми технологическими отверстиями и не нарушают
              заводскую функциональность салона.
            </p>

            <span class="description__title">Страна производства:</span>
            <p class="description__text">Россия</p>

            <span class="description__title">Характеристики:</span>
            <ul class="description__list">
              <li class="description__list-item">
                Толщина экокожи : 1.15 – 1.2 мм.
              </li>
              <li class="description__list-item">
                Толщина алькантары : 1.00 – 1.05 мм.
              </li>
              <li class="description__list-item">
                Удельный вес экокожи \ алькантары: 550 г / п.м. \ 350г /м2.
              </li>
              <li class="description__list-item">
                Цикл истирания: свыше 40000 раз.
              </li>
            </ul>

            <span class="description__title">Комплект чехлов состоит:</span>
            <p class="description__text">
              Спинки передние-2, сидения передние-2, спинка задняя-1, сидение
              заднее-1, подлокотник-передний-1, подлокотник задний-1,
              подголовники-4.
            </p>
          </div>
        </div>
        <!-- 2ой блок -->
      </section>
    </div>
  </main>
</template>

<script>
export default {
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
        breadcrumbs = items.map(item => ({name: item.name, link: $url.category(item.fullSlug)}));
      }
      breadcrumbs.unshift({
        title: "Главная",
        link: "/",
      });
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
};
</script>

<style lang="scss" >
</style>