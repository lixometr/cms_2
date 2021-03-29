<template>
  <div class="checkout__shipping">
    <span class="checkout__title">Доставка:</span>
    <span class="checkout__number">
      <input
        type="radio"
        id="checkout__shipping-check1"
        name="prim"
        value="pickup"
        v-model="type"
      />
      <label for="checkout__shipping-check1">Самовывоз</label>
      <AppSelect
        placeholder="Выберите адрес"
        :options="pickupItems"
        v-if="type === 'pickup'"
        v-model="address"
      />
      <!-- : г. Воронеж, ул. Короленко 5 -->
      <input
        type="radio"
        id="checkout__shipping-check2"
        name="prim"
        value="courier"
        v-model="type"
      />
      <label for="checkout__shipping-check2">Доставка курьером</label>
      <AppSelect
        placeholder="Выберите адрес"
        :options="courierItems"
        v-if="type === 'courier'"
        v-model="address"
      />

      <!-- <input type="radio" id="checkout__shipping-check3" name="prim" />
      <label for="checkout__shipping-check3">Доставка службой IML</label> -->
    </span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    types: {},
  }),
  async fetch() {
    await this.fetchItems();
  },
  computed: {
    type: {
      get() {
        return this.value.type;
      },
      set(type) {
        this.$emit("input", { ...this.value, type });
      },
    },
    address: {
      get() {
        return this.value.id
      },
      set(id) {
        this.$emit("input", { ...this.value, id });
      },
    },
    courierItems() {
      return this.types.courier.items.map((item) => ({
        name: item.address,
        value: item.id,
      }));
    },
    pickupItems() {
      return this.types.pickup.items.map((item) => ({
        name: item.address,
        value: item.id,
      }));
    },
  },
  methods: {
    async fetchItems() {
      try {
        const types = await this.$api.$get("deliveryAvailable");
        this.types = types;
      } catch (err) {
        this.$error(err);
      }
    },
    emitData() {
      this.$emit("input", {
        id: this.address,
        type: this.type,
      });
    },
  },
  watch: {
  },
};
</script>

<style lang="scss" >
.checkout__shipping {
  .select__head {
    color: #000;
  }
}
</style>