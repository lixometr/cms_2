<template>
  <main class="page__cat">
    <AppBreadcrumbs class="breadcrumb__silver" :items="breadcrumbs" />

    <CategoryTitle :item="category" />
    <CategoryFilters :item="category" />
    <CategorySubCategories :items="children" :item="category" v-if="hasSubCategories" />
    <CategoryProducts :items="products" v-else/>
  </main>
</template>

<script>
import SeoMixin from "../../mixins/SeoMixin.js";
export default {
  mixins: [SeoMixin("category")],
  data() {
    return {};
  },
  watchQuery: true,

  async asyncData({ $api, error, params, query, store }) {
    try {
      const slug = params.pathMatch;
      const category = await $api.$get("category", { slug });
      if (!category) throw { statusCode: 404 };
      store.dispatch("filters/init", query);

      const filters = store.getters["filters/active"];
      let productsData = await $api.$get(
        "categoryProducts",
        {
          id: category.id,
        },
        {
          params: {
            page: query.page || 1,
            filters,
          },
        }
      );
      let { items: children } = await $api.$get("categoryChildren", {
        id: category.id,
      });
      store.commit("filters/setItems", productsData.filters);
      const { items: breadcrumbsItems } = await $api.$get(
        "categoryBreadcrumbs",
        {
          id: category.id,
        }
      );

      return {
        children,
        breadcrumbsItems,
        category,
        productsData,

      };
    } catch (err) {
      error(err);
    }
  },
  computed: {
    products() {
      return this.productsData.items || []
    },
    hasSubCategories() {
      return this.children.length > 0;
    },
    breadcrumbs() {
      return this.breadcrumbsItems.map((item) => ({
        title: item.name,
        link: this.$url.category(item.fullSlug),
      }));
    },
    nowPage() {
      return this.products.info.nowPage;
    },
    totalPages() {
      return this.products.info.totalPages;
    },
  },
};
</script>

<style lang="scss" >
</style>