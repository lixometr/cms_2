<template>
  <img :src="path" alt="" />
</template>

<script>
export default {
  props: {
    src: {
      type: [Object, String],
      default: () => ({}),
    },
    holder: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    path() {
      if (typeof this.src === "string") {
        return this.src;
      }
      let url = this.src && this.src.url
      if(!url && this.holder) {
        url = this.$store.getters['defaultImage']
      }
      return url;
    },
  },
};
</script>

<style lang="scss" >
</style>