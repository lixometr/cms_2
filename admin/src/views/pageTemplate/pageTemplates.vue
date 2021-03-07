<template>
  <PageItems
    @create="createItem"
    @remove="removeItem"
    @edit="editItem"
    :searchPhrase.sync="searchPhrase"
    :activePage.sync="activePage"
    :totalPages="totalPages"
    :fields="fields"
    :items="items"
    createBtn="Создать шаблон"
  >
  </PageItems>
</template>

<script>
import PageItems from "@/components/PageItems/PageItemsMixin";

export default {
  mixins: [PageItems],

  data() {
    return {
      fetchRoute: "pageTemplatesSearch",
      removeRoute: "pageTemplateById",
      createRouteName: "PageTemplateNew",
      editRouteName: "PageTemplate",
      fields: [
        {
          key: "name",
          label: "Название",
        },
      ],
    };
  },

  methods: {},
};
</script>

<style lang="scss" >
</style>