<template>
  <Label :label="label" :canFull="true" :required="required">
    <v-select
      :class="inputClass"
      :multiple="multiple"
      :value="selectValues"
      @input="onChange"
      @open="onOpen"
      :options="options"
      @search="onSearch"
      :filterable="false"
      :label="keyField"
    >
      <template slot="no-options">Напишите чтобы начать поиск</template>
      <template v-slot:option="option">
        <slot name="option" v-bind="option">
          <div class="d-center">{{ option.name }}</div>
        </slot>
      </template>
      <template v-slot:selected-option="option">
        <slot name="selected-option" v-bind="option">
          <div class="selected d-center">{{ option.name }}</div>
        </slot>
      </template>
      <template #list-footer>
        <div class="d-flex pt-3" v-if="itemsInfo.totalPages > 1">
          <CButton class="flex-1" color="secondary" @click="prevPage"
            >Назад</CButton
          >
          <CButton class="flex-1" color="secondary" @click="nextPage"
            >Вперед</CButton
          >
        </div>
        <slot name="list-footer"></slot>
      </template>
    </v-select>
  </Label>
</template>

<script>
export default {
  props: {
    // [ 'id' ]
    value: [String, Array, Number],
    multiple: {
      type: Boolean,
      default: true,
    },
    findItem: Function,
    searchItem: Function,
    label: String,
    keyField: {
      type: String,
      default: "id",
    },
    inputClass: [String, Array, Object],
    required: Boolean,
  },

  data() {
    return {
      options: [],
      selectValues: [],
      itemsInfo: {},
      page: 1,
    };
  },
  created() {
    this.loadItems();
  },
  computed: {
    horizontal() {
      return this.$store.getters.horizontal;
    },
  },
  methods: {
    prevPage() {
      if (this.page <= 1) {
        this.page = 1;
        return;
      }
      this.page--;
      this.onOpen();
    },
    nextPage() {
      if (this.page >= this.itemsInfo.totalPages) {
        this.page = this.itemsInfo.totalPages;
        return;
      }
      this.page++;
      this.onOpen();
    },
    async onSearch(text, loading) {
      try {
        loading(true);
        const data = await this.searchItem(text, { perPage: -1 });
        this.options = data.items;
        this.itemsInfo = data.info || {};
        this.page = this.itemsInfo.nowPage;
      } catch (err) {
        console.log(err);
      } finally {
        loading(false);
      }
    },

    async onOpen() {
      try {
        const data = await this.searchItem("", { perPage: -1 });
        this.itemsInfo = data.info || {};
        this.options = data.items;
      } catch (err) {
        console.log(err);
      }
    },
    onChange(value) {
      let values;
      if (!value) return this.$emit("input", null);
      if (this.multiple) {
        values = value.map((val) => ({[this.keyField]: val[this.keyField]}));
        values = values.filter(
          (value, index) => values.findIndex((val) => val[this.keyField] === value[this.keyField]) === index
        );
      } else {
        values = value[this.keyField];
      }
      this.$emit("input", values);
    },
    async loadItems() {
      if (!this.value) {
        this.selectValues = this.value;
        return;
      }
      try {
        if (this.multiple) {
          try {
            const resolvers = this.value.map((val) => this.findItem(val[this.keyField]));

            const items = await Promise.all(resolvers);
            this.selectValues = items;
          } catch (err) {
            console.log(err);
          }
        } else {
          try {
            const item = await this.findItem(this.value);
            this.selectValues = item;
          } catch (err) {
            console.log(err);
          }
        }
      } catch (err) {
        this.$error(err);
      }
    },
  },
  watch: {
    async value(val) {
      await this.loadItems();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>