<template>
  <div>
    <AppBreadcrumbs :items="breadcrumbs" />
    <section class="contact">
      <div class="container">
        <div class="contact__info">
          <h2>{{ getValue("zagolovok_bloka_kontakti") }}</h2>
          <ul>
            <li>{{ getValue("adres") }}</li>

            <li>
              <a
                :href="getValue(`telefoni.${idx}.nomer_telefona`)"
                v-for="(item, idx) in getValue('telefoni')"
                :key="idx"
                >{{ getValue(`telefoni.${idx}.nomer_telefona`) }} <br
              /></a>
            </li>

            <li>
              <a :href="'mailto:' + getValue('e-mail')">{{
                getValue("e-mail")
              }}</a>
            </li>

            <li v-for="(item, idx) in getValue('rezhim_raboti')" :key="idx">
              <span>{{ getValue(`rezhim_raboti[${idx}].zagolovok`) }}</span>
              <br />
              <AText :text="getValue(`rezhim_raboti[${idx}].rezhim_raboti`)" />
            </li>
          </ul>
        </div>
       <FormContact />
        <div class="contact__map">
          <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A2aa2dcf03fe85bf2151d72f6d1a0d86002301689c4f70c8ebae268725eaeb116&amp;source=constructor"
            width="868"
            height="774"
            frameborder="0"
          ></iframe>
        </div>
      </div>
    </section>
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
};
</script>

<style lang="scss" >
</style>