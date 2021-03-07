<template>
  <CCard>
    <CCardBody>
      <Label class="mb-3" label="Название">{{ item.item.name }}</Label>
      <Label class="mb-3" label="Цена">{{ currency }}{{ price }}</Label>
      <CCard>
        <CCardBody>
          <Label class="mb-3" label="Date" v-if="date">
            <span>{{ $moment(date.date).format("DD.MM.YYYY HH:mm") }}</span>
          </Label>
          <!-- <Label class="mb-3" :label="variation.attr.name" v-if="variation">
            {{ variation.attrValue.name }}
          </Label> -->
          <!-- <div v-for="(option, idx) in options" :key="idx">
            <Label class="mb-3" :label="option.option.name">
              <template v-if="option.option.type === 'range'">
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
                    >({{ currency }}{{ value.price }})</template
                  >{{ option.values.length - 1 > index ? ", " : "" }}
                </span>
              </template>
            </Label>
          </div> -->
        </CCardBody>
      </CCard>
    </CCardBody>
  </CCard>
</template>

<script>
import Product from "@/../../common/models/product";
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
      return this.order.currency.slug;
    },
  },
};
</script>

<style>
</style>