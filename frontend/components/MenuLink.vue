<template>
  <component
    :is="type === 'model' ? 'nuxt-link' : 'a'"
    v-on="$listeners"
    v-bind="_attrs"
    ><slot>{{ link.name }}</slot></component
  >
</template>

<script>
export default {
  props: {
    link: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    _attrs() {
      const attrs = { ...this.$attrs };
      if (this.type === "model") {
        attrs.to = this.linkUrl;
      } else {
        attrs.href = this.linkUrl;
      }
      return attrs
    },
    type() {
      return this.link.type;
    },
    linkUrl() {
      if (this.type === "model") {
        const urlPath = this.$url[this.link.model];
        let link = "";
        if (urlPath) {
          link = this.$url[this.link.model](this.link.slug);
        } else {
          link = this.link.slug;
        }
        return link || '#';
      } else {
        return this.link.slug || '#';
      }
    },
  },
};
</script>

<style lang="scss" >
</style>