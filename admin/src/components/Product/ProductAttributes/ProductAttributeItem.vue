<template>
  <div class="product-attribute p-3 border">
    <div class="d-flex mb-3 justify-content-end">
      <CButton color="danger" @click="removeAttr()">
        <CIcon name="cil-trash"></CIcon>
      </CButton>
    </div>
    <Label label="Атрибут" class="mb-3">
      <AttributeSelect
        :value="item.attrId"
        :multiple="false"
        @input="changeAttrId($event)"
      />
    </Label>

    <ACheckbox
      class="mb-3"
      label="Показывать на странице товара"
      :value="item.showInProduct"
      @input="changeShow($event)"
    />
    <div class="product-attribute__values">
      <Label label="Значения атрибута">
        <AttributeValueSelect
          :value="item.attrValues"
          @input="changeAttrValue"
          :attributeId="item.attrId"
        />
      </Label>
    </div>
  </div>
</template>

<script>
import AttributeSelect from "@/components/AttributeSelect";
import AttributeValueSelect from "@/components/AttributeValueSelect";

export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    AttributeSelect,
    AttributeValueSelect,
  },
  computed: {},
  methods: {
    removeAttr() {
      this.$emit("delete");
    },
    changeShow(showInProduct) {
      const newItem = { ...this.item, showInProduct };
      this.$emit("input", newItem);
    },
    changeAttrId(attrId) {
      const newItem = { ...this.item, attrId, attrValues: [] };

      this.$emit("input", newItem);
    },
    changeAttrValue(attrValues) {
      const newItem = { ...this.item, attrValues };
      this.$emit("input", newItem);
    },
  },
};
</script>

<style>
</style>