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
    :showSearch="false"
    :createBtn="false"
  >
    <template #image="{ item }">
      <td>
        <CImg :src="item.image.url" width="150px" />
      </td>
    </template>
    <template #is_confirmed="{ item }">
      <td>
        {{ item.is_confirmed ? "да" : "нет" }}
      </td>
    </template>
  </PageItems>
</template>

<script>
import ItemsPage from "@/components/PageItems/PageItemsMixin";

export default {
  mixins: [ItemsPage],
  data() {
    return {
      useSearch: false,
      fetchRoute: "users",
      removeRoute: "userById",
      fields: [
        {
          key: "email",
        },
        {
          key: "first_name",
          label: "Имя",
        },

        {
          key: "last_name",
          label: "Фамилия",
        },
        {
          key: "is_confirmed",
          label: "Подтвержден",
        },
       
      ],
    };
  },

  methods: {},
};
</script>

<style lang="scss" >
</style>