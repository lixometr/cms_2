<template>
  <main class="page__cat">
      <AppBreadcrumbs class="breadcrumb__silver" :items="breadcrumbs"/>
      <CategoryTitle />
      <CategoryFilters />
      <CategorySubCategories />
  </main>
</template>

<script>
export default {
    computed: {
        breadcrumbs() {
            return [
                {
                    title: 'Главная',
                    link: '/'
                },
                {
                    title: "Чехлы",
                    link: "#"
                }
            ]
        }
    }
};
</script>

<style lang="scss" >
</style>