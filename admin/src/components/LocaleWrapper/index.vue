<template>
  <div class="locale-wrapper">
    <div
      class="locale-wrapper__item mb-3"
      v-for="(locale, idx) in _locales"
      :key="locale.id"
    >
      <LocaleWrapperItem
        :value="value"
        :locale="locale"
        @input="onInputChange($event, locale)"
        :prop="prop"
        :label="label"
        :isValid="isValid[idx]"
      >
        <template v-slot:default="params">
          <slot name="item" v-bind="params" />
        </template>
      </LocaleWrapperItem>
    </div>
  </div>
</template>

<script>
import LocaleWrapperItem from "./LocaleWrapperItem.vue";
/* locales: [
    
    { localeId: 1, name: 'some', other: 'some' } 
    { localeId: 2, name: 'some 2', other: 'some' } 

] */
export default {
  components: { LocaleWrapperItem },
  props: {
    label: String,
    value: {
      type: Array,
      default: () => [],
    },
    locales: {
      type: Array,
    },
    prop: String,
    isValid: {
      type: [Array, Object],
      default: () => [],
    },
    // validations: Array
  },
  mounted() {
    const values = [...this.value];
    this._locales.map((locale) => {
      const inValueIdx = values.findIndex(
        (val) => val.localeId === locale.id
      );
      if (inValueIdx < 0) {
        values.push({
          localeId: locale.id,
        });
      } else {

      }
    });
    this.$emit("input", values);
  },
  computed: {
    _locales() {
      return this.locales || this.$store.getters["locale/locales"];
    },
  },
  methods: {
    onInputChange(newValue, locale) {
      let value = [...this.value];
      const inValueIdx = value.findIndex((val) => val.localeId === locale.id);

      if (inValueIdx < 0) {
        value.push({
          localeId: locale.id,
          [this.prop]: newValue,
        });
      } else {
        value[inValueIdx] = Object.assign({}, value[inValueIdx], {
          [this.prop]: newValue,
        });
      }
      this.$emit("input", value);
    },
  },
};
</script>

<style lang="scss" scoped>
.locale-wrapper {
}
</style>