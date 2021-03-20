<template>
  <section class="search-block">
    <div class="container">
      <div class="search-block__select">
        <CategoryFiltersSubCategories :item="item" v-model="categories" />
        <SliderPrice class="search-block__price" />
        <CategoryFiltersAttributes />
        <div class="select search-block__item">
          <a href="#0" class="button" @click.prevent="search">Найти</a>
          <a href="#0" class="reset__button" @click.prevent="reset">Сбросить</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    children: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      categories: [],
    };
  },
  methods: {
    async search() {
      const lastCategoryId = this.categories[this.categories.length - 1];
      const category = await this.$api.$get("categoryById", {
        id: lastCategoryId,
      });
      if (category) {
        this.$router.push(this.$url.category(category.fullSlug));
      }
    },
    reset() {
      // this.$router.push()
    },
  },
};
</script>

<style lang="scss" >
.search-block {
  &__item {
    width: 250px;
    height: 50px;
  }
}
</style>