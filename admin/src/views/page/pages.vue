<template>
  <PageItems
    v-if="!$store.getters.isLoading"
    @create="createItem"
    @remove="removeItem"
    @edit="editItem"
    :searchPhrase.sync="searchPhrase"
    :activePage.sync="activePage"
    :totalPages="totalPages"
    :fields="fields"
    :items="items"
    :createBtn="'Создать страницу'"
  >
  </PageItems>
</template>

<script>
import ItemsPage from "@/components/PageItems/PageItemsMixin";

export default {
  mixins: [ItemsPage],

  data() {
    return {
      fetchRoute: "pagesSearch",
      removeRoute: "pageById",
      createRouteName: "PageNew",
      editRouteName: "Page",
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