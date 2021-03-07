<template>
  <PageItem :item="item" :isNew="isNew" @save="save" @delete="onDelete">
    <CCard>
      <CCardHeader>Редактировать категорию</CCardHeader>
      <CCardBody>
        <LocaleInput
          :isValid="$v.item.locale.$each"
          prop="name"
          v-model="item.locale"
          label="Название"
        />
        <AInput
          :isValid="$v.item.slug.$error ? false : undefined"
          label="Slug"
          v-model="item.slug"
          @input="noSlug = false"
        />
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Родитель</CCardHeader>
      <CCardBody>
        <CategorySelect
          label="Родитель"
          v-model="itemParent"
          :multiple="false"
        />
      </CCardBody>
    </CCard>
    <CollapseCard>
      <div slot="header">Тексты</div>
      <LocaleInput
        class="mb-5"
        :prop="'title'"
        v-model="item.locale"
        label="Заголовок"
      />

      <LocaleTextArea
        class="mb-5"
        label="Текст сверху"
        v-model="item.locale"
        prop="textTop"
      />
      <LocaleTextArea
        class="mb-5"
        label="Текст снизу"
        v-model="item.locale"
        prop="textBottom"
      />
    </CollapseCard>
    <CCard>
      <CCardHeader>Изображения</CCardHeader>
      <CCardBody>
        <EditImage class="" label="Иконка" v-model="item.image" />
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Метка soon</CCardHeader>
      <CCardBody>
        <ACheckbox
          class="mb-5"
          label="Вывдить метку?"
          v-model="item.soon.show"
        />
        <Label label="Цвет метки 1">
          <AppColorPicker class="mb-5" v-model="item.soon.color1" />
        </Label>
        <Label label="Цвет метки 2">
          <AppColorPicker v-model="item.soon.color2" />
        </Label>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>Фильтр</CCardHeader>
      <CCardBody>
        <ACheckbox
          class="mb-3"
          label="Показывать фильтр цены"
          v-model="item.showFilterPrice"
        />
        <AttributeSelect
          label="Атрибуты для фильтра"
          v-model="item.availableFilterAttributes"
          :multiple="true"
        />
      </CCardBody>
    </CCard>

    <LocaleSeo v-model="item.locale" :prop="'seo'" />
  </PageItem>
</template>

<script>
import AInput from "@/components/AInput";
import NInput from "@/components/NInput";
import ImageUpload from "@/components/ImageUpload";
import CategorySelect from "@/components/CategorySelect";
import EditImage from "@/components/EditImage";
import AppColorPicker from "@/components/AppColorPicker";
import LocaleInput from "@/components/LocaleComponents/LocaleInput";
import LocaleSeo from "@/components/LocaleComponents/LocaleSeo";
import PageItemMixin from "@/components/PageItem/PageItemMixin";
import { required } from "vuelidate/lib/validators";
import AttributeSelect from "@/components/AttributeSelect";
import LocaleTextArea from "@/components/LocaleComponents/LocaleTextArea";
export default {
  components: {
    AInput,
    NInput,
    ImageUpload,
    CategorySelect,
    EditImage,
    AppColorPicker,
    LocaleInput,
    LocaleSeo,
    AttributeSelect,
    LocaleTextArea,
  },
  mixins: [PageItemMixin],
  validations: {
    item: {
      slug: {
        required,
      },
      locale: {
        $each: {
          name: {
            required,
          },
        },
      },
    },
  },
  data() {
    return {
      item: {
        slug: "",
        soon: {},
        locale: [],
      },
      parentId: undefined,
      fetchRoute: "categoryByIdAdmin",
      editRoute: "categoryById",
      createRoute: "categories",
      itemsRouteName: "Categories",
      itemRouteName: "Category",
    };
  },
  computed: {
    availabelAttributesModel: {
      get() {
        return (
          this.item.availableFilterAttributes &&
          this.item.availableFilterAttributes.map((idVal) => idVal.id)
        );
      },
      set(values) {
        const newValues = values.map((id) => ({ id }));
        this.$set(this.item, "availableFilterAttributes", newValues);
      },
    },
    itemParent: {
      get() {
        return (this.item.parent && this.item.parent.id) || this.item.parentId;
      },
      set(val) {
        this.$set(this.item, "parent", { id: val });
      },
    },
  },
};
</script>

<style lang="scss">
</style>