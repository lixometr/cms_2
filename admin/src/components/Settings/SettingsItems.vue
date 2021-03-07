<template>
  <CCardBody>
    <div class="mb-3" v-for="(item, idx) in items" :key="idx">
      <label for="#">{{ item.name }}</label>
      <AInput
        v-if="item.type === 'input' || !item.type"
        v-model="values[item.slug]"
        :isValid="$v.values[item.slug].$error ? false : undefined"
      />
      <div v-if="item.type === 'select'">
        <v-select
          label="name"
          :options="item.value"
          v-model="values[item.slug]"
          :reduce="(item) => item.id"
        ></v-select>
      </div>
      <div v-if="item.type === 'checkbox'">
        <CInputCheckbox custom :checked.sync="values[item.slug]" />
      </div>
      <div v-if="item.type === 'custom'">
        <component
          :is="item.component"
          v-bind="item.options"
          v-model="values[item.slug]"
        ></component>
      </div>
    </div>
    <CButton color="success" class="mt-2" @click="save()">
      Сохранить
      <CIcon name="cil-save"></CIcon>
    </CButton>
  </CCardBody>
</template>

<script>
import _ from "lodash";
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Object,
      default: () => ({}),
    },
    validations: {
      type: Object,
      default: () => ({}),
    },
  },
  validations() {
    return this.validations;
  },
  data() {
    return {
      values: _.cloneDeep(this.value),
    };
  },
  computed: {},
  mounted() {
    this.$v.$touch();
  },
  methods: {
    save() {
      this.$v.$touch();
      if (this.$v.$error) return;
      this.$emit("save");
    },
  },
  watch: {
    values: {
      deep: true,
      handler() {
        this.$emit("input", this.values);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
</style>