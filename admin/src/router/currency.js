const Currencies = () => import("@/views/currency/currencies")

export default {
    path: "currencies",
    meta: {
        label: 'Currencies'
    },
    component: {
        render(c) { return c('router-view') }
    },
    children: [
        {
            path: '',
            component: Currencies,
            name: "Currencies",

        },
       
    ]
}