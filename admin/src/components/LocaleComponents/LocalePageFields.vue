<template>
  <div>
    <CCard class="mb-0">
      <CCardBody>
        <LocaleSelect v-model="activeLocale" label="Выберите язык" />
      </CCardBody>
    </CCard>
    <LocaleWrapper
      v-bind="$props"
      v-on="$listeners"
      :locales="pageValueLocales"
    >
      <template v-slot:item="{ listeners, props }">
        <CCard>
          <CCardHeader
            ><span class="badge badge-primary">{{ props.localeSlug }}</span>
            Поля
          </CCardHeader>
          <CCardBody>
            <PageFields
              ref="fields"
              :items="fields"
              :value="props.value || {}"
              v-on="listeners"
            />
          </CCardBody>
        </CCard>
      </template>
    </LocaleWrapper>
  </div>
</template>

<script>
import LocaleComponentMixinVue from "./LocaleComponentMixin.vue";
import PageFields from "@/components/Page/PageFields";
import LocaleSelect from "@/components/LocaleSelect"
export default {
  inheritAttrs: false,
  components: { PageFields, LocaleSelect },
  mixins: [LocaleComponentMixinVue, ],
  props: {
    fields: Array,
  },
  data() {
    return {
      activeLocale: this.$store.getters["settings/adminLocale"].id,
    };
  },
  computed: {
    pageValueLocales() {
      const locales = this.$store.getters["locale/locales"];
      const selectedLocale = locales.filter(
        (locale) => locale.id === this.activeLocale
      );
      return selectedLocale;
    },
  },
  methods: {
    validate() {
      return this.$refs.fields.validate();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>