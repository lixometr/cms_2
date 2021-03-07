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
    :showSearch="false"
    :createBtn="false"

  >
    <template #first_name="{ item }">
      <td>
        {{ item.info.first_name }}
      </td>
    </template>
    <template #email="{ item }">
      <td>
        {{ item.info.email }}
      </td>
    </template>
    <template #totalPrice="{ item }">
      <!-- <td>{{ item.region.currency }}{{ item.totalPrice }}</td> -->
    </template>
    <template #status="{ item }">
      <td>
        {{ itemStatus(item.status) }}
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
      fetchRoute: "orders",
      removeRoute: "orderById",
      searchPhrase: "",
      useSearch: false,
      fields: [
        
        {
          key: "orderId",
          label: "Id заказа",
        },

        {
          key: "status",
          label: "Статус заказа",
        },
        {
          key: "totalPrice",
          label: "Цена",
        },

        
      ],
    };
  },
  computed: {
    itemStatus() {
      const statuses = {
        1: "Завершен",
        2: "В процессе",
        0: "Отменен",
        3: "Новый заказ",
      };
      return (status) => {
        return statuses[status];
      };
    },
  },

  methods: {},
};
</script>

<style lang="scss" >
</style>