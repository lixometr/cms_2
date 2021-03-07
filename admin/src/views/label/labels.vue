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
    createBtn="Создать метку"
  >
  </PageItems>
    
</template>

<script>
import ItemsPage from "@/components/PageItems/PageItemsMixin";

export default {
  data() {
    return {
      fetchRoute: "labelsSearch",
      removeRoute: "labelById",
      createRouteName: "LabelNew",
      editRouteName: "Label",
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
  watch: {},
};
</script>

<style lang="scss" >
</style>