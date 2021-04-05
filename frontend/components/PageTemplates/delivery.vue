<template>
  <main class="page__single-product">
    <AppBreadcrumbs :items="breadcrumbs" />
    <section class="pay-delivery">
      <h2>{{ getValue("tekstovii_blok.zagolovok_bloka") }}</h2>
      <div class="container">
        <div class="paymant">
          <AText :text="getValue('tekstovii_blok.tekst_ob_oplate')" />
          <AppImage :src="getValue('tekstovii_blok.sposobi_oplati')" />

          <div class="paymant__card">
            <img :src="getValue('tekstovii_blok.sposobi_oplati')" alt="" />
          </div>
        </div>
        <div class="delivery">
          <AText :text="getValue('tekstovii_blok.tekst_o_dostavke')" />
        </div>
      </div>
    </section>

    <!-- блока оставить вопрос -->
    <aside class="questions-block fadeUp t-default" data-t-show="2">
      <div class="container">
        <div class="questions-block__bg">
          <div class="questions-block__bg-columns">
            <span class="questions-block__bg-title">{{
              getValue("tochka_zakhvata.zagolovok_bloka_t/z")
            }}</span>
          </div>
          <div class="questions-block__bg-columns">
            <p class="questions-block__bg-text">
              {{ getValue("tochka_zakhvata.tekst_bloka_t/z") }}
            </p>
          </div>
          <div class="questions-block__bg-columns">
            <div class="button" @click.prevent="openModal">
              <a href="#">{{
                getValue("tochka_zakhvata.nazvanie_knopki_bloka_t/z")
              }}</a>
            </div>
          </div>
        </div>
      </div>
    </aside>
  </main>
</template>

<script>
import PageTemplateMixin from "@/mixins/PageTemplateMixin";

export default {
  mixins: [PageTemplateMixin],
  computed: {
    breadcrumbs() {
      return [
        {
          title: this.value.name,
          link: "#",
        },
      ];
    },
  },
  methods: {
    openModal() {
      this.$modal.open('contact')
    }
  }
};
</script>

<style lang="scss">
</style>