<template>
  <div v-if="items.length > 0">
    <span class="description__title">Характеристики:</span>
    <ul class="description__list">
      <li
        class="description__list-item"
        v-for="(item, idx) in items"
        :key="idx"
      >
        {{ item.attr.name }} :
        <span v-for="(attrValue, index) in item.attrValues" :key="index">{{
          attrValue.name
        }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    items() {
      return this.item.attributes || [];
    },
  },
};
</script>

<style lang="scss" >
</style>