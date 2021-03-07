<template>
  <div >
    <PageItems
      @create="createItem"
      @remove="removeItem"
      @edit="editItem"
      :searchPhrase.sync="searchPhrase"
      :activePage.sync="activePage"
      :totalPages="totalPages"
      :fields="fields"
      :items="items"
      createBtn="Создать категорию"
    >
      <template v-slot:image="{ item }">
        <td>
          <CImg :src="item.image && item.image.url" width="150px" />
        </td>
      </template>
    </PageItems>
  </div>
</template>

<script>
import ItemsPageMixin from "@/components/PageItems/PageItemsMixin";
export default {
  mixins: [ItemsPageMixin],
  data() {
    return {
      fetchRoute: "categoriesSearch",
      removeRoute: "categoryById",
      editRouteName: 'Category',
      createRouteName: 'CategoryNew',
      fields: [
        {
          key: "name",
        },
        {
          key: "slug",
        },

        {
          key: "image",
        },
        {
          key: "edit",
          label: "Действия",
        },
      ],
    };
  },

};
</script>

<style lang="scss" >
</style>