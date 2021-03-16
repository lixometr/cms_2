<template>
  <div>
    <CCard :class="{ 'no-border-bottom': !isOpen }">
      <CCardHeader class="cursor-pointer" @click="toggle"
        >{{ label }} ({{ template.varName }})
      </CCardHeader>
      <CCollapse class="" :show="isOpen">
        <CCardBody class="pt-4 pr-4">
          <PageField
            :template="templateItem"
            :value="objValue[templateItem.varName]"
            @input="onFieldChange(templateItem.varName, $event)"
            v-for="(templateItem, idx) in fields"
            :key="idx"
            ref="fields"
          />
        </CCardBody>
      </CCollapse>
    </CCard>
  </div>
</template>



<script>
// value: [ {varName1: '', varName2: '} ]
// template: {settings: {fields: [ {name: '', varName1: '', type: ''}, {varName2: ''} ]  }
import Mixin from "./PageFieldMixin";
import AppMultiplyer from "@/components/AppMultiplyer";
export default {
  mixins: [Mixin],
  components: {
    AppMultiplyer,
    PageField: () => import("./PageField"),
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    fields() {
      return this.settings.fields || [];
    },
  },

  methods: {
    getFields() {
      return this.$refs.fields;
    },
    validate() {
      const itemsValid = this.getFields().map((component) => {
        return component.validate();
      });
      return !itemsValid.includes(false);
    },
    toggle() {
      this.isOpen = !this.isOpen;
    },
    onInput(value) {
      this.emitData(value);
    },
    onFieldChange(varName, newValue) {
      const value = { ...this.objValue };
      value[varName] = newValue;
      this.$emit("input", value);
    },
  },
};
</script>

<style lang="scss">
.no-border-bottom {
  border-bottom: none !important;
}
</style>