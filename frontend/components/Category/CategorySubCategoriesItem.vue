<template>
  <div class="brands-item fadeUp t-default" data-t-show="2">
    <div class="brands-item-img">
      <AppImage :src="image" />
    </div>
    <div class="brands-item-title">
      <span>{{ name }}</span>
    </div>

    <nuxt-link :to="$url.category(slug)" class="brands-item-link"></nuxt-link>
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
    name() {
      return this.item.name;
    },
    image() {
      return this.item.image;
    },
    slug() {
      return this.item.slug;
    },
  },
};
</script>

<style lang="scss" >
</style>