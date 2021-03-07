<template>
  <PageItem @save="save" @delete="onDelete" :isNew="isNew" :item="item">
    <CCard>
      <CCardHeader>Редактировать запись</CCardHeader>
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
        <SectionTagSelect label="Теги" v-model="item.tags" />
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
import EditImage from "@/components/EditImage";
import SectionTagSelect from "@/components/SectionTagSelect";
import PageTemplateSelect from "@/components/PageTemplateSelect";
import PageFields from "@/components/Page/PageFields";
import { required } from "vuelidate/lib/validators";
import LocaleSeo from "@/components/LocaleComponents/LocaleSeo";
import PageItemMixin from "@/components/PageItem/PageItemMixin";
import LocalePageFields from "@/components/LocaleComponents/LocalePageFields";
import StatusSelect from "@/components/StatusSelect"
export default {
  mixins: [PageItemMixin],
  components: {
    EditImage,
    SectionTagSelect,
    PageTemplateSelect,
    PageFields,
    LocaleSeo,
    LocalePageFields,
    StatusSelect
  },

  validations: {
    item: {
      slug: {
        required,
      },
      template: {
        required,
      },
    },
  },
  data() {
    return {
      item: {
        locale: [],
      },
      template: {},
      section: {},
      templateId: "",
      fetchRoute: "sectionPageByIdAdmin",
      editRoute: "sectionPageById",
      createRoute: "sectionPages",
      itemsRouteName: "SectionItems",
      itemRouteName: "SectionItem",
      itemRouteParams: {},
      autoSlug: true,
    };
  },
  computed: {
    itemRouteCreateParams() {
      return { id: this.section.id, itemId: this.item.id };
    },
  },

  methods: {
    async afterFetchItem() {
      const { data: section } = await this.$api.get("sectionByIdAdmin", {
        id: this.$route.params.id,
      });
      this.section = section;
      this.templateId = section.templateId;
      this.$set(this.item, "sectionId", section.id);
      await this.fetchTemplate();
      /**else {
          const { item } = await this.$api.post("sectionPages", null, {
            section: this.$route.params.id,
          });
          this.$router.push({
            name: "SectionItem",
            params: { itemId: item.id, id: this.$route.params.id },
          });
          this.item = item;
        } */
    },
     async fetchItem() {
      try {
        if (!this.isNew) {
          const { data } = await this.$api.get(this.fetchRoute, {
            id: this.$route.params.itemId,
          });
          this.item = Object.assign({}, this.item, data);
          if (this.item.slug) this.noSlug = false;
        }
        await this.afterFetchItem();
      } catch (err) {
        this.$error(err);
      }
    },

    async fetchTemplate() {
      try {
        if (!this.templateId) return;
        const { data } = await this.$api.get("pageTemplateById", {
          id: this.templateId,
        });
        this.template = data;
      } catch (err) {
        this.$error(err);
      }
    },
    validate() {
      this.$v.$touch();
      const items = !this.$v.item.slug.$error;
      return this.$refs.fields.validate() && items;
    },

    async afterDelete() {
      this.$router.push({
        name: "SectionItems",
        params: { id: this.$route.params.id },
      });
    },
  },
  watch: {},
};
</script>

<style lang="scss">
</style>