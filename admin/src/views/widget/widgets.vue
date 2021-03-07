<template>
  <div v-if="!$store.getters.isLoading">
    <CDataTable :items="widgets" :fields="fields" border outlined striped>
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
import ItemsPage from "@/components/PageItems/PageItemsMixin";

export default {
  data() {
    return {
      widgets: [
        {
          slug: "header",
          label: "Шапка",
          routeName: "WidgetHeader",
        },

        {
          slug: "footer",
          label: "Футер",
          routeName: "WidgetFooter",
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
  mixins: [ItemsPage],

  methods: {
    async fetchItems() {
      return;
    
    },
  },
  watch: {},
};
</script>

<style lang="scss" >
</style>