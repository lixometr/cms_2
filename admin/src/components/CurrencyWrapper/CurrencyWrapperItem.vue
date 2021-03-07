<template>
  <div class="currency-wrapper-item">
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
    currency: {
      type: Object,
      default: () => ({}),
    },

    prop: String,
    comp: {
      type: null,
    },
     isValid: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
     isItemValid() {
      if (typeof this.isValid[this.prop] === "object") {
        return this.isValid[this.prop].$error ? false : undefined
      }
      return;
    },
    listeners() {
      return {
        input: (...props) => {
          this.onInput(...props);
        },
      };
    },
    itemProps() {
      return {
        isValid: this.isItemValid,
        value: this.itemValue,
        label: this.label,
        currencySlug: this.currency.slug,
      };
    },
    itemLabel() {
      return `${this.currency.slug} ${this.label}`;
    },
    itemValue() {
      const inValueIdx = this.value.findIndex(
        (val) => val.currencyId === this.currency.id
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