<template>
  <div>
    <CurrencyWrapper v-bind="$props" v-on="$listeners">
      <template v-slot:item="{ listeners, props }">
        <Label :label="props.label">
          <NInput
            :prepend="props.currencySlug"
            class="mb-0"
            v-on="listeners"
            v-bind="{ ...props, ...$attrs, label: null }"
          />
        </Label>
      </template>
    </CurrencyWrapper>
  </div>
</template>

<script>
import CurrencyWrapper from "@/components/CurrencyWrapper";
import CurrencyComponentMixin from "./CurrencyComponentMixin.vue";
export default {
  components: {
    CurrencyWrapper,
  },
  inheritAttrs: false,
  mixins: [CurrencyComponentMixin],
};
</script>

<style lang="scss" >
</style>