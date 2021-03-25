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
  computed: {
    cnt() {
      const value = parseInt(this.value);
      if (isNaN(value)) return 1;
      return value;
    },
    inputModel: {
      get() {
        return this.value;
      },
      set(val) {
        let newVal = parseInt(val);
        if (isNaN(newVal) || newVal < 0) newVal = 1;
        this.$emit("input", newVal);
      },
    },
  },
  methods: {
    plus() {
      this.$emit("input", this.cnt + 1);
    },
    minus() {
      if(this.cnt - 1 < 1) return
      this.$emit("input", this.cnt - 1);
    },
  },
};
</script>

<style lang="scss" >
</style>