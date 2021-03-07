<template>
  <div v-if="!$store.getters.isLoading">
    <CDataTable :items="deliverys" :fields="fields" border outlined striped>
      <template #edit="{ item }">
        <td>
          <div class="d-flex">
            <CButton
              color="warning"
              @click="$router.push({ name: item.routeName })"
            >
              <CIcon name="cil-pencil"></CIcon>
            </CButton>
          </div>
        </td>
      </template>
    </CDataTable>
  </div>
</template>

<script>

export default {
  data() {
    return {
      deliverys: [
        {
          slug: "cash",
          label: "Наличными",
          routeName: "PaymentCash",
        },

        {
          slug: "invoice",
          label: "Безналичными (выставить счет)",
          routeName: "PaymentInvoice",
        },
      ],
      fields: [
        {
          key: "label",
          label: "Название",
        },

        {
          key: "edit",
          label: "Действия",
        },
      ],
    };
  },

  methods: {
  
  },
  watch: {},
};
</script>

<style lang="scss" >
</style>