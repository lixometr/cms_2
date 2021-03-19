export default {
    categories: '/category',
    category: '/category/slug/{{slug}}',
    categoriesSearch: '/category/search/{{text}}',


    categoryProducts: '/category/id/{{id}}/products',
    categoryById: '/category/id/{{id}}',
    categoryAdmin: '/category/admin/slug/{{slug}}',
    categoryByIdAdmin: '/category/admin/id/{{id}}',

    categoryChildren: '/category/id/{{id}}/children',
    categoryChildrenTree: '/category/id/{{id}}/children-tree',
    categoryParents: '/category/id/{{id}}/parents',
    categoryBreadcrumbs: '/category/id/{{id}}/breadcrumbs',
    categoriesPrimary: '/category/tree',
}