<template>
  <div>
    <AInput
      label="Вариант"
      :isValid="$v.item.value.$error ? false : undefined"
      v-model="item.value"
      @input="onChangeValue"
    />
    <AInput
      class="mt-3"
      :isValid="$v.item.varName.$error ? false : undefined"
      label="Значение в коде"
      v-model="item.varName"
      @input="onChangeVarName"
    />
  </div>
</template>

<script>
import cyrillicToTranslit from "cyrillic-to-translit-js";
import { required } from "vuelidate/lib/validators";
import _ from "lodash";
export default {
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  validations: {
    item: {
      value: {
        required,
      },
      varName: {
        required,
      },
    },
  },
  created() {},
  data() {
    return {
      item: _.cloneDeep(this.value),
      hasVarName: !!this.value.varName,
    };
  },
  methods: {
    onChangeValue() {
      if (!this.hasVarName) {
        const name = this.item.value || "";
        let sValue = cyrillicToTranslit().transform(name.toLowerCase(), "_");
        sValue = sValue.replace(/\/-\./g, "_");
        this.$set(this.item, "varName", sValue);
      }

      this.emitData();
    },
    onChangeVarName() {
      this.hasVarName = true;
      this.emitData();
    },
    emitData() {
      this.$emit("input", this.item);
    },
    validate() {
      this.$v.$touch();
      return !this.$v.item.value.$error && !this.$v.item.varName.$error;
    },
  },
  watch: {
    value: {
      deep: true,
      handler() {
        this.item = _.cloneDeep(this.value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
</style>