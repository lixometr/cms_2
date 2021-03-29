<template>
  <div class="checkout__payment">
    <span class="checkout__title">Оплата:</span>
    <span class="checkout__number">
      <p v-if="types.cash">
        <input type="radio" id="checkout__number-check1" name="prim2" value="cash" v-model="type"/>
        <label for="checkout__number-check1">Наличными при получении</label>
      </p>

      <!-- <p>
        <input type="radio" id="checkout__number-check2" name="prim2" />
        <label for="checkout__number-check2"
          >Банковской картой при получении</label
        >
      </p>

      <p>
        <input type="radio" id="checkout__number-check3" name="prim2" />
        <label for="checkout__number-check3">Онлайн платежом</label>
      </p> -->
      <p v-if="types.invoice">
        <input type="radio" id="checkout__number-check4" name="prim2" value="invoice" v-model="type"/>
        <label for="checkout__number-check4">Безналичный расчет</label>
      </p>
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
        this.$emit("input", { type });
      },
    },
  },
  methods: {
    async fetchItems() {
      try {
        const types = await this.$api.$get("paymentAvailable");
        this.types = types;
      } catch (err) {
        this.$error(err);
      }
    },
    emitData() {
      this.$emit("input", {
        type: this.type,
      });
    },
  },
  watch: {},
};
</script>
<style lang="scss" >
</style>