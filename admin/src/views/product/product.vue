<template>
  <PageItem @save="save" @delete="onDelete" :isNew="isNew" :item="item">
    <CCard>
      <CCardBody>
        <LocaleInput
          class="mb-3"
          label="Название"
          v-model="item.locale"
          prop="name"
          :isValid="$v.item.locale.$each"
        />
        <AInput class="mb-3" label="Артикул" v-model="item.sku" />
        <ProductType v-model="item.type" class="mb-3" @input="changeType" />
        <CategorySelect
          class="mb-3"
          label="Категории"
          v-model="item.category"
          :multiple="true"
        />
        <LabelSelect
          class="mb-3"
          label="Метки"
          :multiple="true"
          v-model="item.tags"
        />
        <AInput
          class="mb-2"
          label="Slug"
          v-model="item.slug"
          :isValid="$v.item.slug.$error ? false : undefined"
          @input="noSlug = false"
        />
        <Label class="mb-3" label="Ссылка:">
          <a target="_blank" :href="itemUrl">{{ itemUrl }}</a>
        </Label>
        <ProductStatus v-model="item.status" class="mb-3" />

        <Label
          class="mb-5"
          label="Приоритет вывода (чем больше, тем товар первее)"
        >
          <NInput class="mb-0" v-model="item.sortOrder" />
        </Label>
      </CCardBody>
    </CCard>
    <ProductVariations
      v-if="item.type === 'variation'"
      class="mt-3"
      v-model="item.variations"
    />
    <ProductKit
      v-if="item.type === 'kit'"
      class="mb-3"
      :product="item"
      v-model="item.kitProducts"
    />
    <CollapseCard :open="false" v-if="item.type === 'simple'">
      <div slot="header">Цена</div>
      <div>
        <ProductPrice v-model="item.prices" />
      </div>
    </CollapseCard>
    <CollapseCard :open="false">
      <div slot="header">Опции</div>
      <div>
        <ProductOptions v-model="item.options" />
      </div>
    </CollapseCard>
    <CollapseCard :open="false">
      <div slot="header">Фото галерея</div>
      <div>
        <EditImage
          class="mb-3"
          label="Главное изображение"
          v-model="item.defaultImage"
        />
        <p class="mb-2 pt-1">Дополнительные изображения</p>

        <ProductImages label="Галерея" v-model="item.images" />
      </div>
    </CollapseCard>

    <CollapseCard :open="false">
      <div slot="header">Описание товара</div>
      <ProductDescription v-model="item.locale" prop="description" />
    </CollapseCard>
    <CollapseCard :open="false">
      <div slot="header">Атрибуты</div>
      <div>
        <ProductAttributes v-model="item.attributes" />
      </div>
    </CollapseCard>

    <LocaleSeo v-model="item.locale" :prop="'seo'" />
  </PageItem>
</template>

<script>
import CategorySelect from "@/components/CategorySelect";
import LabelSelect from "@/components/LabelSelect";
import EditImage from "@/components/EditImage";
import ProductImages from "@/components/Product/ProductImages";
import ProductAttributes from "@/components/Product/ProductAttributes";
import ProductPrice from "@/components/Product/ProductPrice";
import ProductVariations from "@/components/Product/ProductVariations";
import ProductDate from "@/components/Product/ProductDate";
import ProductOptions from "@/components/Product/ProductOptions";
import PageItemMixin from "@/components/PageItem/PageItemMixin";
import LocaleSeo from "@/components/LocaleComponents/LocaleSeo";
import ProductType from "@/components/Product/ProductType";
import ProductStatus from "@/components/Product/ProductStatus";
import { required } from "vuelidate/lib/validators";
import ProductDescription from "@/components/Product/ProductDescription";
import ProductKit from "@/components/Product/ProductKit";
export default {
  name: "Product",
  mixins: [PageItemMixin],
  components: {
    LabelSelect,
    ProductVariations,
    CategorySelect,
    EditImage,
    ProductImages,
    ProductAttributes,
    ProductPrice,
    ProductDate,
    ProductOptions,
    LocaleSeo,
    ProductType,
    ProductStatus,
    ProductDescription,
    ProductKit,
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
      slug: {
        required,
      },
    },
  },
  mounted() {
    // this.$v.$touch();
  },
  data() {
    return {
      item: {
        locale: [],
        prices: [],
        type: "simple",
        status: "published",
        sortOrder: 0,
      },
      autoSlug: true,
      fetchRoute: "productByIdAdmin",
      editRoute: "productById",
      createRoute: "products",
      itemsRouteName: "Products",
      itemRouteName: "Product",
    };
  },
  computed: {
    itemUrl() {
      return (
        this.$store.getters.frontUrl + "/product/" + (this.item.slug || "")
      );
    },
  },

  methods: {
    changeType(type) {
      if (type === "simple") {
        this.$set(this.item, "variations", []);
      } else if (type === "variation") {
        this.$set(this.item, "prices", []);
      } else if (type === "kit") {
        this.$set(this.item, "variations", []);
      }
    },
  },
};
</script>

<style lang="scss">
</style>