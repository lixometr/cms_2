<template>
  <div class="border">
    <div
      class="p-3 cursor-pointer d-flex align-items-center"
      @click="isOpen = !isOpen"
    >
      <div class="col-md-4">{{ address }}</div>
      <div class="col-md-4">{{ time }}</div>
      <div class="col-md-4 d-flex justify-content-end">
        <CButton color="danger" @click="onDelete">
          <CIcon name="cil-trash"></CIcon>
        </CButton>
      </div>
    </div>
    <CCollapse class="" :show="isOpen">
      <div class="p-3">
        <div class="mt-3">
          <LocaleInput
            class="mb-5"
            label="Район"
            v-model="item.locale"
            prop="address"
            :isValid="$v.item.locale.$each"
            @input="emitData"
          />
          <LocaleInput
            class="mb-5"
            v-model="item.locale"
            label="Время доставки"
            prop="deliveryTime"
            :isValid="$v.item.locale.$each"
            @input="emitData"
          />
          <CurrencyInput
            v-model="item.prices"
            prop="price"
            label="Цена"
            :isValid="$v.item.prices.$each"
            @input="emitData"
          />
          <BtnSave class="mt-5" @click="save" v-if="item.isChanged"
            >Сохранить</BtnSave
          >
        </div>
      </div>
    </CCollapse>
  </div>
</template>

<script>
import _ from "lodash";
import CurrencyInput from "@/components/CurrencyComponents/CurrencyInput";
import { required } from "vuelidate/lib/validators";
export default {
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  validations: {
    item: {
      locale: {
        $each: {
          address: {
            required,
          },
          deliveryTime: {
            required,
          },
        },
      },
      prices: {
        $each: {
          price: {
            required,
          },
        },
      },
    },
  },
  components: {
    CurrencyInput,
  },
  data() {
    return {
      isOpen: false,
      item: _.cloneDeep(this.value),
    };
  },
  mounted() {
    this.$emit("input", { ...this.item, isChanged: false });
  },
  computed: {
    address() {
      return (
        this.$getLocaleValue(this.item.locale, "address") || "Введите адрес"
      );
    },
    time() {
      return this.$getLocaleValue(this.item.locale, "deliveryTime") || "";
    },

    isNew() {
      return this.item.id === undefined;
    },
  },
  methods: {
    emitData() {
      this.$emit("input", {
        ...this.item,
        isChanged: true,
      });
    },
    save() {
      this.$v.$touch();
      if (this.$v.$error) return;
      this.$emit("save", this.item);
    },
    onDelete() {
      this.$emit("delete", this.item.id);
    },
  },
  watch: {
    value() {
      this.item = _.cloneDeep(this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>