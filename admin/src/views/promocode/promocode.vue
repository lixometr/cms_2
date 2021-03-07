<template>
  <PageItem :item="item" @save="save" @delete="onDelete" :isNew="isNew">
    <CCard>
      <CCardHeader>Тексты</CCardHeader>
      <CCardBody>
        <LocaleInput
          class="mb-3"
          label="Купон"
          v-model="item.locale"
          :isValid="$v.item.locale.$each"
          prop="name"
        />
        <Label class="mb-3" label="Тип скидки">
          <v-select
            :multiple="false"
            v-model="item.saleType"
            :options="saleTypeOptions"
            label="label"
            :reduce="(opt) => opt.key"
          />
        </Label>
        <div>
          <!-- <Label :label="valueLabel"></Label> -->
          <CurrencyInput
            class="mb-3"
            :label="valueLabel"
            v-model="item.value"
            prop="sale"
            :isValid="$v.item.value.$each"
            :append="item.saleType === 'percent' ? '%' : ''"
          />
        </div>
        <Label label="Кол-во использований (-1 бесконечно">
          <NInput class="mb-3" v-model="item.useCount" />
        </Label>

        <Label label="Кол-во использований на аккаунт (-1 бесконечно)">
          <NInput class="mb-3" v-model="item.useUserCount" />
        </Label>

        <Label label="Дата окончания купона">
          <DatePicker
            v-model="endDateModel"
            :show-second="false"
            type="datetime"
          ></DatePicker>
        </Label>
      </CCardBody>
    </CCard>
  </PageItem>
</template>

<script>
import AInput from "@/components/AInput";
import NInput from "@/components/NInput";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import CurrencyInput from "@/components/CurrencyComponents/CurrencyInput";
import PageItemMixin from "@/components/PageItem/PageItemMixin";
import { required } from "vuelidate/lib/validators";
export default {
  name: "Promocode",

  mixins: [PageItemMixin],

  data() {
    const saleType = "percent";
    return {
      item: {
        locale: [],
        value: [],
        saleType,
        useCount: -1,
        useUserCount: -1,
        end_date: undefined,
      },
      fetchRoute: "promocodeByIdAdmin",
      editRoute: "promocodeById",
      createRoute: "promocodes",
      itemsRouteName: "Promocodes",
      itemRouteName: "Promocode",
    };
  },
  validations: {
    item: {
      locale: {
        $each: {
          name: {
            required,
          },
        },
      },
      value: {
        $each: {
          sale: {
            required,
          },
        },
      },
    },
  },
  components: {
    AInput,
    NInput,
    DatePicker,
    CurrencyInput,
  },
  computed: {
    endDateModel: {
      get() {
        return this.item.endDate && new Date(this.item.endDate);
      },
      set(val) {
        this.$set(this.item, "endDate", val);
      },
    },
    valueLabel() {
      const values = {
        percent: "Скидка в %",
        fixed: "Скидка",
      };
      return values[this.item.saleType];
    },
    saleTypeOptions() {
      return [
        {
          key: "percent",
          label: "Процент скидки",
        },
        {
          key: "fixed",
          label: "Фиксированая скидка на сумму в корзине",
        },
      ];
    },
  },

  methods: {},
};
</script>

<style lang="scss">
</style>