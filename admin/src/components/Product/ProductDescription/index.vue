<template>
  <div>
    <CCard>
      <CCardBody>
        <LocaleSelect
          v-model="activeLocale"
          :clearable="false"
          label="Выберите язык"
        />
      </CCardBody>
    </CCard>
    <div v-for="(item, idx) in items" :key="idx">
      <ProductDescriptionItem
        :value="item"
        @input="onItemChange($event, idx)"
        @delete="onDelete(idx)"
      />
    </div>
    <BtnAdd class="w-100 mt-4" @click="addItem">Добавить блок</BtnAdd>
  </div>
</template>

<script>
import ProductDescriptionItem from "./ProductDescriptionItem";
import LocaleSelect from "@/components/LocaleSelect";
export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    const activeLocale = this.$store.getters["settings/adminLocale"].id;
    return {
      activeLocale,
    };
  },
  computed: {
    items() {
      // [ {desc: [{}, {}]}, {desc: [{}, {}]} ]
      // return: [ {localeId: '', tab: '', content: '',} ]
      const items = [];
      const localeItem = this.value.find(
        (locVal) => locVal.localeId === this.activeLocale
      );
      if (!localeItem) return false;
      const description = localeItem.description;
      return description || [];
    },
  },
  methods: {
    addItem() {
      const value = [...this.value];
      const newValue = value.map((locVal) => {
        if (!locVal.description) {
          locVal = { ...locVal, description: [] };
        }
        if (locVal.localeId === this.activeLocale) {
          const description = [...locVal.description, {}];
          locVal = { ...locVal, description };
        }
        return locVal;
      });
      this.$emit("input", newValue);
    },
    onDelete(idx) {
      const value = [...this.value];
      const newValue = value.map((locVal) => {
        if (locVal.localeId === this.activeLocale) {
          const description = [...locVal.description];
          description.splice(idx, 1)
          locVal = { ...locVal, description };
        }
        return locVal;
      });
      this.$emit("input", newValue);
    },
    onItemChange(newValue, idx) {
      const value = [...this.value];
      const newValues = value.map((locVal) => {
        if (locVal.localeId === this.activeLocale) {
          const description = [...locVal.description];
          description[idx] = newValue;
          locVal = { ...locVal, description };
        }
        return locVal;
      });
      this.$emit("input", newValues);
    },
  },
  components: { ProductDescriptionItem, LocaleSelect },
};
</script>

<style lang="scss" scoped>
</style>