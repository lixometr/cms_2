<template>
  <CCard>
    <CCardBody>
      <Label class="mb-3" label="Название">{{ item.product.name }}</Label>
      <Label class="mb-3" label="Цена">{{ item.product.price }} {{ currency }}</Label>
      <CCard>
        <CCardBody>
         
          <!-- <Label class="mb-3" :label="variation.attr.name" v-if="variation">
            {{ variation.attrValue.name }}
          </Label> -->
          <div v-for="(option, idx) in options" :key="idx">
            <Label class="mb-3" :label="option.name">
              <template v-if="option.type === 'range'">
                <span
                  class="cart-itm-bot__itm__val"
                  v-for="(value, index) in option.values"
                  :key="index"
                  >{{ value
                  }}{{ option.values.length - 1 > index ? " - " : "" }}
                </span>
              </template>
              <template v-else>
                <span
                  class="cart-itm-bot__itm__val"
                  v-for="(value, index) in option.values"
                  :key="index"
                  >{{ value.name }}
                  <template v-if="value.price"
                    >({{ value.price }} {{ currency }})</template
                  >{{ option.values.length - 1 > index ? ", " : "" }}
                </span>
              </template>
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
    currency() {
      return this.order.currency.sign;
    },
    options() {
      return this.item.product.options
    }
  },
};
</script>

<style>
</style>