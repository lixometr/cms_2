<template>
  <Label :label="label" :canFull="canFull" :required="required" class="t-input">
    <CInput
      :isValid="isValid"
      :invalidFeedback="error"
      class="mb-0"
      :description="description"
      :value="value"
      v-on="$listeners"
      :prepend="prepend"
      @input="$emit('input', $event)"
      v-bind="$attrs"
    />
  </Label>
</template>

<script>
export default {
  props: {
    canFull: {
      type: Boolean,
      default: true
    },
    prepend: String,
    label: String,
    isValid: {
      type: Boolean,
      default: undefined,
    },
    description: String,
    error: String,
    value: String,
    required: Boolean,
  },
  components: {},

  computed: {
    horizontal() {
      return this.$store.getters.horizontal;
    },
  },
  methods: {
    changeValue(val) {
      this.$emit("input", val);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>