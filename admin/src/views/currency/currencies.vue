<template>
  <PageItemsEdit
    v-if="!$store.getters.isLoading"
    :items="items"
    :fields="fields"
    @delete="deleteItem"
    @save="saveItem"
    @add="addItem"
    @changeProp="changeProp"
    addBtn="Добавить валюту"
  >
    <template #name="{ item, index }">
      <td>
        <LocaleInput
          label="Название"
          v-model="item.locale"
          prop="name"
          @input="changeProp($event, index)"
        />
      </td>
    </template>
    <template #iso="{ item, index }">
      <td>
        <AInput
          :isValid="$v.items.$each[index].iso.$error ? false : undefined"
          v-model="item.iso"
          @input="changeProp($event, index)"
        />
      </td>
    </template>
    <template #slug="{ item, index }">
      <td>
        <AInput
          :isValid="$v.items.$each[index].slug.$error ? false : undefined"
          v-model="item.slug"
          @input="changeProp($event, index)"
        />
      </td>
    </template>
    <template #sign="{ item, index }">
      <td>
        <AInput v-model="item.sign" @input="changeProp($event, index)" />
      </td>
    </template>
  </PageItemsEdit>
</template>

<script>
import PageItemsEditMixin from "@/components/PageItemsEdit/PageItemsEditMixin";
import PageItemsEdit from "@/components/PageItemsEdit/PageItemsEdit";
import LocaleInput from "@/components/LocaleComponents/LocaleInput";
import { required } from "vuelidate/lib/validators";
export default {
  mixins: [PageItemsEditMixin],
  components: {
    PageItemsEdit,
    LocaleInput,
  },
  validations: {
    items: {
      $each: {
        iso: {
          required,
        },
        slug: {
          required,
        },
      },
    },
  },
  mounted() {
    this.$v.$touch();
  },

  data() {
    return {
      fetchRoute: "currenciesAdmin",
      editRoute: "currencyById",
      createRoute: "currencies",
      itemModel: {
        locale: [],
        slug: "",
      },
      fields: [
        {
          key: "name",
          label: "Название",
        },
        {
          key: "slug",
        },
        {
          key: "iso",
        },
        {
          key: "sign",
          label: "Знак",
        },
      ],
    };
  },
  methods: {
    async fetchStoreItems() {
      await this.$store.dispatch("currency/fetch");
    },
    async afterSave() {
      await this.fetchStoreItems();
    },
    async afterDelete() {
      await this.fetchStoreItems();
    },
  }
};
</script>

<style lang="scss" >
</style>