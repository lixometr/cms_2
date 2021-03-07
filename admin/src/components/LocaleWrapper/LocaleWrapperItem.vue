<template>
  <div class="locale-wrapper-item">
    <slot :props="itemProps" :listeners="listeners" />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    label: String,
    value: {
      type: Array,
      default: () => [],
    },
    locale: {
      type: Object,
      default: () => ({}),
    },
    isValid: {
      type: Object,
      default: () => ({}),
    },
    prop: String,
    comp: {
      type: null,
    },
    // validations: {
    //   type: Array,
    //   default: () => ([]),
    // },
  },
  computed: {
    itemHasErrors() {
      // this.validations.findIndex(localeItem)
    },
    listeners() {
      return {
        input: (...props) => {
          this.onInput(...props);
        },
      };
    },
    isItemValid() {
      if (typeof this.isValid[this.prop] === "object") {
        return this.isValid[this.prop].$error ? false : undefined
      }
      return;
    },
    itemProps() {
      return {
        isValid: this.isItemValid,
        value: this.itemValue,
        label: this.label,
        localeSlug: this.locale.slug,
      };
    },
    itemLabel() {
      return `${this.locale.slug} ${this.label}`;
    },
    itemValue() {
      const inValueIdx = this.value.findIndex(
        (val) => val.localeId === this.locale.id
      );
      if (inValueIdx < 0) return;
      return this.value[inValueIdx][this.prop];
    },
  },
  methods: {
    onInput(e) {
      this.$emit("input", e);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>