<template>
  <div class="slider-price">
    <div class="slider-price__inputs">
      <input type="text" placeholder="0" v-model="from" />
      <input type="text" placeholder="9999" v-model="to" />
    </div>
    <vue-slider v-model="price" />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      price: [0, 10],
    };
  },
  computed: {
    from: {
      get() {
        return this.price[0];
      },
      set(val) {
        if (val > this.to) return;
        this.$set(this.price, 0, val);
      },
    },
    to: {
      get() {
        return this.price[1];
      },
      set(val) {
        if (val < this.from) return;
        this.$set(this.price, 1, val);
      },
    },
  },
};
</script>
<style lang="scss">
.slider-price {
  &__inputs {
    display: flex;
  }
  input {
    width: 48%;
    border: 1px solid #ebebeb;
    text-align: center;
    border-radius: 5px;
    margin-bottom: 10px;
    flex: 1;
  }

  .vue-slider {
    height: 2px !important;
  }

  .vue-slider-dot-handle {
    cursor: pointer;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #eb9700;
    box-shadow: 0px 3px 4px rgba(44, 36, 25, 0.2);
    border: 1px solid rgba(0, 0, 0, 0.3);
  }

  .vue-slider-rail {
    border-radius: 15px;
    background-color: #ebebeb;
  }

  .vue-slider-dot-tooltip-inner {
    background-color: #2c2419;
    border-color: #2c2419;
  }
  .vue-slider-process {
    background: #ffa401;
    opacity: 0.7;
  }
}
</style>


