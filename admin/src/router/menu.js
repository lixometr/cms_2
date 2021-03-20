
const Menus = () => import("@/views/menu/menus")
const Menu = () => import("@/views/menu/menu")
export default {
    path: "menus",
    meta: {
        label: 'Menus'
    },
    component: {
        render(c) { return c('router-view') }
    },
    children: [
        {
            path: '',
            component: Menus,
            name: "Menus",

        },
        {
            name: "MenuNew",
            path: "new",
            component: Menu,
            props: {
                isNew: true
            }
        },
        {
            name: "Menu",
            path: ":id",
            component: Menu,
        },
    ]
}