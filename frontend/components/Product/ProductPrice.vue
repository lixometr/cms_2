<template>
  <div class="description__price">
    <ul class="card__price">
      <li class="old-price" v-if="item.oldPrice">
        <span>{{ item.oldPrice }} ₽</span>
      </li>
      <li class="new-price">
        <span>{{ item.totalPrice }} ₽</span>
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
};
</script>

<style lang="scss" >
</style>