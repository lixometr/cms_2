<template>
  <div>
    <Label label="Скидка от количества" class="mb-2"/>
    <Label label="Кол-во от" class="border-bottom pb-3 mb-3">
      <CRow alignVertical="center">
        <NInput class="mb-0 mr-3" v-model="toAdd" @keypress.enter="addItem" />
        <BtnAdd @click="addItem">Добавить </BtnAdd></CRow
      >
    </Label>
    <div class="mt-3" v-for="(value, idx) in values" :key="idx">
      <Label :label="'Скидка от ' + value.cnt + ''">
        <CRow alignVertical="center">
          <NInput class="mb-0 mr-2" v-model="value.sale" @input="emitData" />
          <CButton color="danger" @click="removeItem(value.cnt)"
            ><CIcon name="cil-trash"
          /></CButton>
        </CRow>
      </Label>
    </div>
  </div>
</template>

<script>
import EditComponent from "@/components/Edit/EditComponent.vue";
import BtnAdd from "../BtnAdd.vue";
import NInput from "@/components/NInput";
export default {
  components: { EditComponent, BtnAdd, NInput },
  props: {
    value: Array,
    default: () => [],
  },
  data() {
    return {
      values: this.value || [],
      toAdd: 0,
    };
  },
  computed: {
    fromArr() {
      return Object.keys(this.values);
    },
  },
  methods: {
    emitData() {
      this.$emit("input", this.values);
    },
    addItem() {
      if (this.values.findIndex((item) => item.cnt === this.toAdd) > -1) return;
      this.values.push({ cnt: this.toAdd, sale: 0 });
    },
    removeItem(cnt) {
      this.values = this.values.filter((item) => item.cnt !== cnt);
    },
  },
  watch: {
    value() {},
  },
};
</script>

<style lang="scss" >
</style>