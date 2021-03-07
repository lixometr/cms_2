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
    createBtn="Создать товар"
  >
    <template #defaultImage="{ item }">
      <td>
        <CImg :src="item.defaultImage && item.defaultImage.url" width="80px" />
      </td>
    </template>

    <template #category="{ item }">
      <td>
        <span class="d-block" v-for="cat in item.category" :key="cat.id">{{
          cat.name
        }}</span>
      </td>
    </template>
    <template #createdAt="{ item }">
      <td>{{ item.createdAt | moment("DD.MM.YYYY HH:MM") }}</td>
    </template>
  </PageItems>
</template>

<script>
import ItemsPage from "@/components/PageItems/PageItemsMixin";

export default {
  mixins: [ItemsPage],
  data() {
    return {
      fetchRoute: "productsSearch",
      removeRoute: "productById",
      createRouteName: "ProductNew",
      editRouteName: "Product",
      fields: [
        {
          key: "defaultImage",
          label: "Изображение",
        },
        {
          key: "name",
          label: "Название",
        },
        {
          key: "slug",
        },

        {
          key: "price",
          label: "Цена ",
        },
        {
          key: "category",
          label: "Категории",
        },

        {
          key: "createdAt",
          label: "Создан",
        },
      ],
    };
  },
  components: {},

  computed: {},

  watch: {},
};
</script>

<style lang="scss" >
</style>