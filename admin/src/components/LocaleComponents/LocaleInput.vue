<template>
  <div>
    <LocaleWrapper v-bind="$props" v-on="$listeners">
      <template v-slot:item="{ listeners, props }">
        <AInput :prepend="props.localeSlug" v-on="listeners" v-bind="props" />
      </template>
    </LocaleWrapper>
  </div>
</template>

<script>
import LocaleComponentMixinVue from "./LocaleComponentMixin.vue";
export default {
  inheritAttrs: false,
  components: {},
  mixins: [LocaleComponentMixinVue],
};
</script>

<style lang="scss" >
</style>