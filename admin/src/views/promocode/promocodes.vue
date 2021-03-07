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
    createBtn="Создать промокод"
  >
  </PageItems>
</template>

<script>
import ItemsPage from "@/components/PageItems/PageItemsMixin";

export default {
  mixins: [ItemsPage],
  data() {
    return {
      fetchRoute: "promocodesSearch",
      removeRoute: "promocodeById",
      createRouteName: "PromocodeNew",
      editRouteName: "Promocode",
      fields: [
        {
          key: "name",
        },

      ],
    };
  },

  methods: {},
};
</script>

<style lang="scss" >
</style>