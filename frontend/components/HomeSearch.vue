<template>
  <section class="search-block home-search-block">
    <div class="container">
      <div class="search-block__select">
        <CategoryFiltersSubCategories
          class="search-block__filters"
          :item="category"
          v-model="categories"
          v-if="!isLoading"
        />
        <div class="offer__text-button">
          <a href="#0" class="button" @click="search">найти</a>
        </div>
        <!-- <input type="button" value="найти"> -->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    isLoading: true,
    category: {},
    categories: [],
  }),
  async fetch() {
    await this.fetchCategory();
  },
  methods: {
    async fetchCategory() {
      this.isLoading = true;
      try {
        const category = await this.$api.$get("category", {
          slug: "avtochekhli",
        });
        this.category = category;
      } catch (err) {
        this.$error(err);
      } finally {
        this.isLoading = false;
      }
    },
    async search() {
      let category = null;
      if (this.categories.length) {
        const lastCategoryId = this.categories[this.categories.length - 1];
        category = await this.$api.$get("categoryById", {
          id: lastCategoryId,
        });
      }

      if (category) {
        this.$router.push({
          path: this.$url.category(category.fullSlug),
        });
      }
    },
  },
};
</script>

<style lang="scss" >
.home-search-block {
  .search-block__select {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    grid-template-columns: initial;
    grid-column-gap: initial;
    grid-row-gap: initial;
    @media screen and (max-width: 1100px) {
      flex-direction: column;
    }
  }
  .button {
    margin-right: 0;
  }
  .select-filter {
    width: 25%;
    margin-top: 15px;
    margin-left: 15px;
  }
  .search-block__filters {
    flex: 1;
    @media screen and (max-width: 1100px) {
      flex-direction: column;
    }
  }
}
</style>