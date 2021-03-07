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
    createBtn="Создать раздел"
  >
  </PageItems>
</template>

<script>
import ItemsPage from "@/components/PageItems/PageItemsMixin";

export default {
  mixins: [ItemsPage],

  data() {
    return {
      fetchRoute: "sectionsSearch",
      removeRoute: "sectionById",
      createRouteName: "SectionNew",
      editRouteName: "Section",
      fields: [
        {
          key: "name",
          label: "Название",
        },
        {
          key: "slug",
        },
      ],
    };
  },

  methods: {},
};
</script>

<style lang="scss" >
</style>