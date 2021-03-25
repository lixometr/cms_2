<template>
  <section class="search-block">
    <div class="container">
      <div class="search-block__select">
        <CategoryPriceFilter class="search-block__price" v-if="showPriceFilters"/>
        <CategoryFiltersSubCategories :item="item" v-model="categories" />
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
import FiltersMixin from "@/mixins/FiltersMixin";
export default {
  mixins: [FiltersMixin],
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  
  },
  data() {
    return {
      categories: [],
    };
  },
  computed: {
    showPriceFilters() {
      return this.item.showFilterPrice
    }
  },
  methods: {
    async search() {
      let category = null;
      if (this.categories.length) {
        const lastCategoryId = this.categories[this.categories.length - 1];
        category = await this.$api.$get("categoryById", {
          id: lastCategoryId,
        });
      }
      let query = { page: 1, ...this.getFiltersQuery() };

      if (category) {
        this.$router.push({
          path: this.$url.category(category.fullSlug),
          query,
        });
      } else {
        this.$router.push({
          query,
        });
      }
    },
    reset() {
      this.clearFilters()
    },
  },
};
</script>

<style lang="scss" >
.search-block {
  &__select {
    display: flex;
    flex-wrap: wrap;
  }
  &__price {
    width: 100%;
  }
  &__item {
    width: 250px;
    height: 50px;
    margin-left: auto;
  }
  .select-filter {
    margin-right: 20px;
  }
}
</style>