<template>
  <PageItem :item="item" :isNew="isNew" @save="save" @delete="onDelete">
    <CCard>
      <CCardHeader>Редактировать раздел</CCardHeader>
      <CCardBody>
        <LocaleInput
          class="mb-3"
          label="Название"
          v-model="item.locale"
          prop="name"
        />
        <AInput
          class="mb-3"
          label="Slug"
          :isValid="$v.item.slug.$error ? false : undefined"
          v-model="item.slug"
          @input="noSlug = false"
        />
        <PageTemplateSelect
          :class="{ 'vue-select-error': $v.item.templateId.$error }"
          label="Шаблон"
          class="mb-3"
          v-model="templateId"
        />
      </CCardBody>
    </CCard>
    <LocaleSeo v-model="item.locale" :prop="'seo'" />
  </PageItem>
</template>

<script>
import EditImage from "@/components/EditImage";
import PageTemplateSelect from "@/components/PageTemplateSelect";
import PageFields from "@/components/Page/PageFields";
import { required } from "vuelidate/lib/validators";
import PageItemMixin from "@/components/PageItem/PageItemMixin";
import LocaleSeo from "@/components/LocaleComponents/LocaleSeo";
export default {
  components: {
    EditImage,
    PageTemplateSelect,
    PageFields,
    LocaleSeo,
  },
  mixins: [PageItemMixin],
  validations: {
    item: {
      slug: {
        required,
      },
      templateId: {
        required,
      },
    },
  },
  data() {
    return {
      item: {
        locale: [],
        slug: "",
      },
      template: {},
      templateId: "",
      autoSlug: true,
      fetchRoute: "sectionByIdAdmin",
      editRoute: "sectionById",
      createRoute: "sections",
      itemsRouteName: "Sections",
      itemRouteName: "Section",
    };
  },
  computed: {},

  methods: {
    async afterFetchItem() {
      if (this.isNew) return;
      this.templateId = this.item.templateId;
    },

    validate() {
      this.$v.$touch();
      const items = !this.$v.item.slug.$error;
      return items;
    },
  },
  watch: {
    templateId(newVal, prevVal) {
      this.$set(this.item, "templateId", this.templateId);
    },
  },
};
</script>

<style lang="scss">
</style>