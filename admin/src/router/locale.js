const Locales = () => import("@/views/locale/locales")

export default {
    path: "locales",
    meta: {
        label: 'Locales'
    },
    component: {
        render(c) { return c('router-view') }
    },
    children: [
        {
            path: '',
            component: Locales,
            name: "Locales",

        },
       
    ]
}