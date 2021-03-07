<template>
  <PageItem @save="save" @delete="onDelete" :isNew="isNew" :item="item">
    <CCard>
      <CCardHeader>Редактировать шаблон</CCardHeader>
      <CCardBody>
        <LocaleInput
          class="mb-3"
          label="Название"
          v-model="item.locale"
          prop="name"
        />
        <AInput class="mb-3" label="Slug" v-model="item.slug" />
        <PageTemplateFields ref="fields" v-model="item.fields" />
      </CCardBody>
    </CCard>
  </PageItem>
</template>

<script>
import AInput from "@/components/AInput";
import PageTemplateFields from "@/components/PageTemplate/PageTemplateFields";
import PageItemMixin from "@/components/PageItem/PageItemMixin";
export default {
  components: {
    AInput,
    PageTemplateFields,
  },
  mixins: [PageItemMixin],

  data() {
    return {
      item: {
        locale: [],
        fields: []
      },
      autoSlug: true,
      fetchRoute: "pageTemplateByIdAdmin",
      editRoute: "pageTemplateById",
      createRoute: "pageTemplates",
      itemsRouteName: "PageTemplates",
      itemRouteName: "PageTemplate",
    };
  },
  computed: {},
  
  methods: {
    validate() {
      return this.$refs.fields.validate();
    },
   
  },
};
</script>

<style lang="scss">
</style>