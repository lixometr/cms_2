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

    
    <div class="product-attribute__values">
      <Label label="Значение атрибута">
        <AttributeValueSelect
          :value="item.attrValueId"
          @input="changeAttrValue"
          :attributeId="item.attrId"
          :multiple="false"
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
   
    changeAttrId(attrId) {
      const newItem = { ...this.item, attrId, attrValueId: undefined };

      this.$emit("input", newItem);
    },
    changeAttrValue(attrValueId) {
      const newItem = { ...this.item, attrValueId };
      this.$emit("input", newItem);
    },
  },
};
</script>

<style>
</style>