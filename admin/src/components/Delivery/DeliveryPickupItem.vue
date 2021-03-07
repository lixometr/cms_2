<template>
  <div class="border">
    <div
      class="p-3 cursor-pointer d-flex align-items-center justify-content-between"
      @click="isOpen = !isOpen"
    >
      <span>{{ address }}</span>
      <CButton color="danger" @click="onDelete">
        <CIcon name="cil-trash"></CIcon>
      </CButton>
    </div>
    <CCollapse class="" :show="isOpen">
      <div class="p-3">
        <div class="mt-3">
          <LocaleInput :isValid="$v.item.locale.$each" v-model="item.locale" prop="address" @input="emitData" />
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
import {required} from "vuelidate/lib/validators"
export default {
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isOpen: false,
      item: _.cloneDeep(this.value),
    };
  },
  validations: {
    item: {
      locale: {
        $each: {
          address: {
            required
          }
        }
      }
    }
  },
  mounted() {
    this.$emit('input', {...this.item, isChanged: false});
  },
  computed: {
    address() {
      return (
        this.$getLocaleValue(this.item.locale, "address") || "Введите адрес"
      );
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
      this.$v.$touch()
      if(this.$v.$error) return
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