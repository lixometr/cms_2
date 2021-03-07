<template>
  <div v-if="!$store.getters.isLoading">
    <CCard>
      <CCardHeader>
        Настройки
      </CCardHeader>
      <CCardBody>
        <SettingsItems
          :items="settings"
          v-model="values"
          @save="save"
          :validations="validations"
        />
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import SettingsItems from "../../components/Settings/SettingsItems.vue";
import EditImage from "@/components/EditImage";
import SettingsItemsMixin from "@/components/Settings/SettingsItemsMixin";
import { required } from "vuelidate/lib/validators";
import LocaleSelect from "@/components/LocaleSelect";
import CurrencySelect from "@/components/CurrencySelect";
import ACheckbox from "@/components/ACheckbox"
export default {
  mixins: [SettingsItemsMixin],
  data() {
    return {
      values: {
        'use-nds': false
      },
      settings: [
        {
          name: "Язык по умолчанию",
          type: "custom",
          slug: "locale-default",
          component: LocaleSelect,
        },
        {
          name: "Валюта по умолчанию",
          type: "custom",
          slug: "currency-default",
          component: CurrencySelect,
        },
        {
          name: "Цены с НДС?",
          type: "custom",
          slug: "use-nds",
          component: ACheckbox,
        },
        // {
        //   name: "Sendpulse Userid?",
        //   slug: "sendpulse-user-id",
        // },

        // {
        //   name: "Каталог",
        //   type: "checkbox",
        //   slug: "showCatalog",
        // },
        // {
        //   name: "Заказы",
        //   type: "checkbox",
        //   slug: "showOrders",
        // },
        // {
        //   name: "Уведомления",
        //   type: "checkbox",
        //   slug: "showNoty",
        // },
        // {
        //   name: "Виджеты",
        //   type: "checkbox",
        //   slug: "showWidgets",
        // },
        // {
        //   name: "Регионы",
        //   type: "checkbox",
        //   slug: "showRegions",
        // },
        // {
        //   name: "Регион по умолчанию",
        //   slug: "region",
        //   type: "select",
        //   value: this.$store.getters["region/regions"],
        // },
        // {
        //   name: "Метка BestSeller",
        //   slug: "best_seller",
        //   type: "custom",
        //   component: "LabelSelect",
        //   options: {
        //     multiple: false,
        //   },
        // },
        // {
        //   name: "Метка Hot Offer",
        //   slug: "hot_offer",
        //   type: "custom",
        //   component: "LabelSelect",
        //   options: {
        //     multiple: false,
        //   },
        // },
      ],

      validations: {
        values: {
          // "locale-default": {
          //   required,
          // },
          // "currency-default": {
          //   required
          // }
        },
      },
    };
  },

  components: {
    EditImage,
    SettingsItems,
  },
};
</script>

<style lang="scss" >
</style>