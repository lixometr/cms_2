<template>
  <PageItemsEdit
    v-if="!$store.getters.isLoading"
    :items="items"
    :fields="fields"
    @delete="deleteItem"
    @save="saveItem"
    @add="addItem"
    @changeProp="changeProp"
    addBtn="Добавить язык"
  >
    <template #name="{ item, index }">
      <td>
        <AInput
          :isValid="$v.items.$each[index].name.$invalid ? false : undefined"
          v-model="item.name"
          @input="changeProp($event, index)"
        />
      </td>
    </template>
    <template #iso="{ item, index }">
      <td>
        <AInput
          :isValid="$v.items.$each[index].iso.$invalid ? false : undefined"
          v-model="item.iso"
          @input="changeProp($event, index)"
        />
      </td>
    </template>
    <template #slug="{ item, index }">
      <td>
        <AInput
          :isValid="$v.items.$each[index].slug.$invalid ? false : undefined"
          v-model="item.slug"
          @input="changeProp($event, index)"
        />
      </td>
    </template>
  </PageItemsEdit>
</template>

<script>
import PageItemsEditMixin from "@/components/PageItemsEdit/PageItemsEditMixin";
import PageItemsEdit from "@/components/PageItemsEdit/PageItemsEdit";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  mixins: [PageItemsEditMixin],
  components: {
    PageItemsEdit,
  },
  validations: {
    items: {
      required,
      $each: {
        name: {
          required,
        },
        slug: {
          required,
        },
        iso: {
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
      fetchRoute: "locales",
      editRoute: "localeById",
      createRoute: "locales",
      itemModel: {
        name: "",
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
      ],
    };
  },
  methods: {
    async fetchStoreItems() {
      await this.$store.dispatch("locale/fetch");
    },
    async afterSave() {
      await this.fetchStoreItems();
    },
    async afterDelete() {
      await this.fetchStoreItems();
    },
  },
};
</script>

<style lang="scss" >
</style>