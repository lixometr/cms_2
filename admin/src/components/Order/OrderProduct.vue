<template>
  <CCard>
    <CCardBody>
      <Label class="mb-3" label="Название">{{ itemName }}</Label>
      <Label class="mb-3" label="Цена"
        >{{ item.product.totalPrice }} {{ currency }}</Label
      >
      <CCard v-if="filteredOptions.length">
        <CCardBody>
          <!-- <Label class="mb-3" :label="variation.attr.name" v-if="variation">
            {{ variation.attrValue.name }}
          </Label> -->
          <div v-for="(option, idx) in filteredOptions" :key="idx">
            <Label class="mb-3" :label="option.name">
              <span
                class="cart-itm-bot__itm__val"
                v-for="(value, index) in option.values"
                :key="index"
                >{{ value.name }}
                <template v-if="value.price"
                  >({{ value.price }} {{ currency }})</template
                >{{ option.values.length - 1 > index ? ", " : "" }}
              </span>
            </Label>
          </div>
        </CCardBody>
      </CCard>
    </CCardBody>
  </CCard>
</template>

<script>
import _ from "lodash";
export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    order: { type: Object, default: () => ({}) },
  },
  computed: {
    itemName() {
      let name = this.item.product.name;
      if (this.item.product.type === "variation" && this.item.activeVariation && this.item.product.variations) {
        const activeVariation = this.item.product.variations.find(
          (variation) => variation.id === this.item.activeVariation
        );
        if (activeVariation) {
          name = activeVariation.name;
        }
      }
      return name;
    },
    currency() {
      return this.order.currency.sign;
    },
    activeOptions() {
      return this.item.activeOptions;
    },
    filteredOptions() {
      return this.options.filter((option) => {
        const activeOptionValues = this.activeOptions[option.id];
        if (!activeOptionValues || !activeOptionValues.length) return false;
        option.values = option.values.filter((optValue) => {
          return activeOptionValues.includes(optValue.id);
        });
        return true;
      });
    },
    options() {
      return this.item.product.options;
    },
  },
};
</script>

<style>
</style>