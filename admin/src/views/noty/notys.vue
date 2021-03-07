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
    createBtn="Создать уведомление"
  >
    <template #date="{ item }">
      <td>
        {{ $moment(item.date).format("DD.MM.YYYY") }}
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
      fetchRoute: "notysSearch",
      removeRoute: "notyById",
      createRouteName: "NotyNew",
      editRouteName: "Noty",
      fields: [
        {
          key: "date",
          label: "Дата",
        },
        {
          key: "name",
          label: "Название",
        },
        {
          key: "edit",
          label: "Действия",
        },
      ],
    };
  },

  methods: {},
};
</script>

<style lang="scss" >
</style>