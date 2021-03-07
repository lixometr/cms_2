<template>
  <div>
    <LocaleWrapper v-bind="$props" v-on="$listeners">
      <template v-slot:item="{ listeners, props }">
        <SeoEdit
          :label="props.label"
          :prefix="props.localeSlug"
          v-on="listeners"
          v-bind="props"
        />
      </template>
    </LocaleWrapper>
  </div>
</template>

<script>
import LocaleComponentMixinVue from "./LocaleComponentMixin.vue";
export default {
  inheritAttrs: false,
  components: {},
  props: {
    label: {
      type: String,
      default: "Seo блок",
    },
  },
  mixins: [LocaleComponentMixinVue],
};
</script>

<style lang="scss" >
</style>