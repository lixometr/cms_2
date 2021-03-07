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
    createBtn="Создать атрибут"
  >
  
  </PageItems>
</template>

<script>
import ItemsPage from "@/components/PageItems/PageItemsMixin";
export default {
  data() {
    return {
      fetchRoute: "attributesSearch",
      removeRoute: "attributeById",
      createRouteName: 'AttributeNew',
      editRouteName: "Attribute",
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
  mixins: [ItemsPage],

  methods: {},
};
</script>

<style lang="scss" >
</style>