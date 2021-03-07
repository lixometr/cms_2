<template>
  <div>
    <LocaleWrapper v-bind="$props" v-on="$listeners">
      <template v-slot:item="{ listeners, props }">
        <Label label=" ">
          <template #label>
            <span class="badge badge-primary">{{ props.localeSlug }}</span>
            {{ props.label }}
          </template>

          <template>
            <ATextArea
              v-on="listeners"
              v-bind="{ ...props, label: undefined }"
              :canFull="true"
            />
          </template>
        </Label>
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