const Deliveries = () => import("@/views/delivery/deliveries")
const DeliveryPickup = () => import("@/views/delivery/delivery-pickup")
const DeliveryCourier = () => import("@/views/delivery/delivery-courier")

export default {
    path: "deliveries",
    meta: {
        label: 'Deliveries'
    },
    component: {
        render(c) { return c('router-view') }
    },
    children: [
        {
            path: '',
            name: "Deliveries",
            component: Deliveries,
        },

        {
            name: "DeliveryPickup",
            path: "pickup",
            component: DeliveryPickup,
        },
        {
            name: "DeliveryCourier",
            path: "courier",
            component: DeliveryCourier,
        },
    ]
}