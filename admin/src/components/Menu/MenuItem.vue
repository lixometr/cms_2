<template>
  <div class="menu-item">
    <LocaleInput
      label="Название"
      v-model="values.locale"
      prop="name"
      @input="emitData"
    />

    <Label label="Тип ссылки" class="mb-3">
      <v-select
        placeholder="Выберите тип ссылки"
        v-model="values.type"
        label="label"
        :reduce="(item) => item.value"
        :options="types"
        @input="resetValue"
      />
    </Label>
    <div v-if="values.type === 'model'">
      <Label label="Обьект ссылки" class="mb-3">
        <v-select
          placeholder="Выберите обьект ссылки"
          v-model="values.model"
          label="label"
          :reduce="(item) => item.value"
          :options="models"
          @input="resetValue"
        />
      </Label>
      <ProductSelect
        label="Товар"
        v-if="values.model === 'product'"
        v-model="values.value"
        @input="emitData"
        :multiple="false"
      />
      <CategorySelect
        label="Категория"
        :multiple="false"
        v-if="values.model === 'category'"
        v-model="values.value"
        @input="emitData"
      />
      <PageSelect
        label="Страница"
        :multiple="false"
        v-if="values.model === 'page'"
        v-model="values.value"
        @input="emitData"
      />
    </div>
    <div v-else>
      <AInput label="Ссылка" v-model="values.value" @input="emitData" />
    </div>
    <div class="mt-5">
      <Label class="mb-3" label="Подпункты">
        <AppMultiplyer
          itemName="Подпункт"
          addText="Добавить подпункт"
          v-model="values.children"
          @input="emitData"
        >
          <template v-slot:default="{ item, idx }">
            <MenuItem :value="item" @input="onChildChange($event, idx)" />
          </template>
        </AppMultiplyer>
      </Label>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import ProductSelect from "@/components/ProductSelect";
import CategorySelect from "@/components/CategorySelect";
import PageSelect from "@/components/PageSelect";
import AppMultiplyer from "@/components/AppMultiplyer";

export default {
  components: {
    AppMultiplyer,
    ProductSelect,
    CategorySelect,
    PageSelect,
    MenuItem: () => import("./MenuItem"),
  },
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      values: _.cloneDeep(this.value),
    };
  },
  computed: {
    types() {
      return [
        {
          label: "Ссылка на обьект",
          value: "model",
        },
        {
          label: "Произвольная ссылка",
          value: "custom",
        },
      ];
    },
    models() {
      return [
        {
          label: "Товар",
          value: "product",
        },
        {
          label: "Категория",
          value: "category",
        },
        {
          label: "Страница",
          value: "page",
        },
        {
          label: "Раздел",
          value: "section",
        },
        {
          label: "Запись раздела",
          value: "sectionPage",
        },
      ];
    },
  },
  methods: {
    onChildChange(values, idx) {
      this.$set(this.values.children, idx, values);
      this.emitData();
    },
    resetValue() {
      this.$set(this.values, "value", undefined);
      this.emitData();
    },
    emitData() {
      this.$set(
        this.values,
        "value",
        this.values.value && this.values.value.toString()
      );
      this.$emit("input", this.values);
    },
  },
  watch: {
    value: {
      deep: true,
      handler() {
        this.values = _.cloneDeep(this.value);
      },
    },
  },
};
</script>

<style lang="scss" >
</style>