<template>
  <div class="description__counter">
    <div class="number">
      <span class="minus" @click="minus">
        <img src="/source/img/minus.svg" />
      </span>
      <input type="number" value="1" v-model="inputModel" />
      <span class="plus" @click="plus">
        <img src="/source/img/plus.svg" />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: Number,
  },
  data() {
    return {
      cnt: this.value || 1,
    };
  },
  computed: {
    numCnt() {
      const cnt = parseInt(this.cnt);
      if (isNaN(cnt)) return 1;
      return cnt;
    },
    inputModel: {
      get() {
        return this.cnt;
      },
      set(val) {
        console.log("w");
        let newVal = parseInt(val);
        if (isNaN(newVal) || newVal < 0) newVal = 1;
        this.cnt = newVal;
      },
    },
  },
  methods: {
    plus() {
      this.cnt++
    },
    minus() {
      if (this.cnt - 1 < 1) return;
      this.cnt--
    },
  },
  watch: {
    cnt() {
      this.$emit("input", this.cnt);
    },
  },
};
</script>

<style lang="scss" >
.description__counter {
  input[type="number"] {
    -moz-appearance: textfield;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
}
</style>