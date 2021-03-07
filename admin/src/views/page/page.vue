<template>
  <PageItem @save="save" @delete="onDelete" :isNew="isNew" :item="item">
    <CCard>
      <CCardHeader>Редактировать страницу</CCardHeader>
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
        <StatusSelect class="mb-3" v-model="item.status"/>
        <PageTemplateSelect
          :class="{ 'vue-select-error': $v.item.templateId.$error }"
          label="Шаблон"
          class="mb-3"
          v-model="templateId"
        />
      </CCardBody>
    </CCard>
    <LocalePageFields
      v-model="item.locale"
      prop="values"
      :fields="template.fields"
      ref="fields"
    />
    <LocaleSeo v-model="item.locale" :prop="'seo'" />
  </PageItem>
</template>

<script>
import StatusSelect from '../../components/StatusSelect.vue'
import EditImage from "@/components/EditImage";
import PageTemplateSelect from "@/components/PageTemplateSelect";
import PageFields from "@/components/Page/PageFields";
import { required } from "vuelidate/lib/validators";
import LocaleSeo from "@/components/LocaleComponents/LocaleSeo";
import PageItemMixin from "@/components/PageItem/PageItemMixin";
import LocaleSelect from "@/components/LocaleSelect";
import LocalePageFields from "@/components/LocaleComponents/LocalePageFields";
export default {
  name: "Page",
  mixins: [PageItemMixin],
  components: {
    EditImage,
    PageTemplateSelect,
    PageFields,
    LocaleSeo,
    LocaleSelect,
    LocalePageFields, StatusSelect
  },

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
        fields: [],
      },
      template: {},
      templateId: "",
      autoSlug: true,
      fetchRoute: "pageByIdAdmin",
      editRoute: "pageById",
      createRoute: "pages",
      itemsRouteName: "Pages",
      itemRouteName: "Page",
    };
  },
  computed: {},

  methods: {
    async afterFetchItem() {
      this.templateId = this.item.templateId;
      await this.fetchTemplate();
    },
    async fetchTemplate() {
      try {
        if (!this.templateId) return;
        const { data: item } = await this.$api.get("pageTemplateById", {
          id: this.templateId,
        });
        this.template = item;
      } catch (err) {
        this.$error(err);
      }
    },
    validate() {
      this.$v.$touch();
      const items = !this.$v.item.slug.$error;
      return this.$refs.fields.validate() && items;
    },
  },
  watch: {
    templateId(newVal, prevVal) {
      this.$set(this.item, "templateId", this.templateId);
      if (newVal !== prevVal && !this.$store.getters.isLoading) {
        this.$set(this.item, "values", {});
        this.fetchTemplate();
      }
    },
  },
};
</script>

<style lang="scss">
</style>