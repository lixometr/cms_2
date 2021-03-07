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
    createBtn="Создать запись"
  >
  </PageItems>
</template>

<script>
import PageItems from "@/components/PageItems/PageItemsMixin";

export default {
  mixins: [PageItems],

  data() {
    return {
      editRouteName: "SectionItem",
      createRouteName: "SectionItemNew",
      fetchRoute: "sectionItemsByIdSearch",
      removeRoute: "sectionPageById",
      fields: [
        {
          key: "name",
          label: "Название",
        },
        {
          key: "slug",
        },

        {
          key: "edit",
          label: "Действия",
        },
      ],
    };
  },

  methods: {
    editItem(id) {
      this.$router.push({
        name: this.editRouteName,
        params: { itemId: id, id: this.$route.params.id },
      });
    },
    async fetchItems() {
      try {
        const data = await this.$api.get(
          this.fetchRoute,
          {
            text: this.searchPhrase,
            id: this.$route.params.id,
          },
          {
            params: {
              page: this.activePage,
            },
          }
        );
        this.setData(data.data);
        await this.afterFetchItems();
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss" >
</style>