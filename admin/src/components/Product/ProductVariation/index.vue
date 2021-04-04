<template>
  <div class="product-variation">
    <CCard>
      <CCardHeader
        @click="collapse = !collapse"
        class="cursor-pointer d-flex align-items-center justify-content-between"
      >
        <span>Вариация {{ idx }} </span>
        <CButton color="danger" @click="remove()">
          <CIcon name="cil-trash"></CIcon>
        </CButton>
      </CCardHeader>
      <CCollapse :show="collapse">
        <CCardBody>
          <CCard>
            <CCardBody>
              <ProductVariationAttributes v-model="item.attributes" />
            </CCardBody>
          </CCard>
          <CCard>
            <CCardBody>
              <LocaleInput
                class="mb-5"
                v-model="item.locale"
                prop="name"
                label="Название"
              />
              <AInput label="Артикул" v-model="item.sku" />
            </CCardBody>
          </CCard>
          <CollapseCard :open="true">
            <div slot="header">Цена вариации</div>
            <ProductPrice v-model="item.prices" />
            <ProductCntSale v-model="item.cntSale"/>
          </CollapseCard>
          <CollapseCard :open="true">
            <div slot="header">Описание вариации</div>
            <ProductDescription v-model="item.locale" />
          </CollapseCard>

          <CollapseCard>
            <div slot="header">Изображения</div>
            <EditImage
              class="mb-4"
              label="Главное изображение"
              v-model="item.defaultImage"
            />
            <p class="mb-2 pt-1">Дополнительные изображения</p>

            <ProductImages v-model="item.images" />
          </CollapseCard>
        </CCardBody>
      </CCollapse>
    </CCard>
  </div>
</template>

<script>
import AttributeSelect from "@/components/AttributeSelect";
import AttributeValueSelect from "@/components/AttributeValueSelect";
import ProductPrice from "@/components/Product/ProductPrice";
import ProductImages from "@/components/Product/ProductImages";
import ProductOptions from "@/components/Product/ProductOptions";
import NInput from "@/components/NInput";
import _ from "lodash";
import ProductVariationAttributes from "./ProductVariationAttributes";
import EditImage from "@/components/EditImage";
import ProductDescription from "@/components/Product/ProductDescription";
import ProductCntSale from "@/components/Product/ProductCntSale";
export default {
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
    idx: Number,
  },
  data() {
    return {
      item: _.cloneDeep(this.value),
      collapse: false,
    };
  },
  components: {
    ProductCntSale,
    ProductImages,
    AttributeSelect,
    AttributeValueSelect,
    ProductPrice,
    ProductOptions,
    NInput,
    ProductVariationAttributes,
    EditImage,
    ProductDescription,
  },
  methods: {
    remove() {
      this.$emit("delete");
    },
  },
  watch: {
    // value: {
    //   deep: true,
    //   handler() {
    //     this.item = _.cloneDeep(this.value);
    //   },
    // },
    item: {
      deep: true,
      handler() {
        this.$emit("input", this.item);
      },
    },
  },
};
</script>

<style>
</style>