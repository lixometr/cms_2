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
      <td>{{ item.totalPrice }}{{ item.currency.sign }}</td>
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
      editRouteName: "Order",
      createRouteName: "OrderNew",
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
        payed: "Оплачен",
        complete: "Завершен",
        waiting: "В ожидании",
        error: "Ошибка",
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