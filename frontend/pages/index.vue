<template>
  <PageTemplateDefiner :value="page" :template="template" />
</template>

<script>
import PageMixin from "@/mixins/PageMixin.js";
export default {
  head() {
    return {
      title: this.page.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.page.description,
        },
        { name: "keywords", content: this.page.keywords },
      ],
    };
  },
  mixins: [PageMixin({ slug: "home" })],
  // async asyncData({ $api, error }) {
  //   try {
  //     const mainPageSetting = $api.$get("setting", "main-page");
  //     if (!mainPageSetting) throw { statusCode: 404 };
  //     const mainPageId = mainPageSetting.value;
  //     if (typeof mainPageId !== "number" && !mainPageId) throw { statusCode: 404 };
  //     const page = await $api.$get("pageById", mainPageId);
  //     return {
  //       page,
  //       template: page.template,
  //     };
  //   } catch (err) {
  //     error(err);
  //   }
  // },
};
</script>

<style lang="scss" >
</style>