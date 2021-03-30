<template>
  <div class="description__addition">
    <div v-for="(option, idx) in options" :key="idx">
      <div
        class="services"
        v-for="(optionValue, index) in option.values"
        :key="index"
      >
        <input
          type="checkbox"
          hidden
          :value="isActive(option, optionValue)"
          @change="onValueChange($event.target.checked, option, optionValue)"
          :id="'option-value-' + option.id + '-' + optionValue.id"
        />
        <label :for="'option-value-' + option.id + '-' + optionValue.id">
          <span>{{ optionValue.name }}:</span>
          <b>+ {{ optionValue.price }} ₽</b>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    isActive() {
      return (option, optionValue) => {
        const optionInValue = this.value[option.id] || [];
        return optionInValue.includes(optionValue.id);
      };
    },
    options() {
      return this.item.options || [];
    },
  },
  methods: {
    onValueChange(isActive, option, optionValue) {
      let currentValues = this.value[option.id] || [];
      currentValues = [...currentValues];
      if (!isActive) {
        currentValues = currentValues.filter((val) => val !== optionValue.id);
      } else {
        if (!currentValues.includes(optionValue.id)) {
          currentValues.push(optionValue.id);
        }
      }
      const newActiveOptions = { ...this.value, [option.id]: currentValues };
      this.$emit("input", newActiveOptions);
    },
  },
};
</script>

<style lang="scss" >
</style>