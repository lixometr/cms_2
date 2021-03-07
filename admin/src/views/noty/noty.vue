<template>
  <PageItem @save="save" @delete="onDelete" :isNew="isNew" :item="item">
    <CCard>
      <CCardHeader>Редактировать уведомление</CCardHeader>
      <CCardBody>
        <LocaleInput
          class="mb-5"
          label="Название"
          v-model="item.locale"
          prop="name"
        />
        <LocaleInput
          class="mb-5"
          label="Ссылка"
          v-model="item.locale"
          prop="link"
        />
        <LocaleInput
          class="mb-5"
          label="Текст"
          v-model="item.locale"
          prop="text"
        />
        <LocaleWrapper label="Дата" v-model="item.locale" prop="date">
          <template v-slot:item="{ props, listeners }">
            <Label :label="props.label + ' ' + props.localeSlug">
              <DatePicker
                :value="props.value"
                :show-second="false"
                type="date"
                v-on="listeners"
              ></DatePicker>
            </Label>
          </template>
        </LocaleWrapper>
      </CCardBody>
    </CCard>
  </PageItem>
</template>

<script>
import AInput from "@/components/AInput";
import NInput from "@/components/NInput";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import PageItemMixin from "@/components/PageItem/PageItemMixin";
import LocaleWrapper from "@/components/LocaleWrapper";
export default {
  mixins: [PageItemMixin],
  components: {
    AInput,
    NInput,
    DatePicker,
    LocaleWrapper,
  },

  data() {
    return {
      item: {
        locale: [],
      },
      fetchRoute: "notyByIdAdmin",
      editRoute: "notyById",
      createRoute: "notys",
      itemsRouteName: "Notys",
      itemRouteName: "Noty",
    };
  },
  computed: {},

  methods: {
    async afterFetchItem() {
      if (this.item.locale && this.item.locale.length) {
        const locales = this.item.locale.map((locale) => ({
          ...locale,
          date: new Date(locale.date),
        }));
        this.$set(this.item, "locale", locales);
      }
    },
  },
};
</script>

<style lang="scss">
</style>