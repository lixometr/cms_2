const Payments = () => import("@/views/payment/payments")
const PaymentCash = () => import("@/views/payment/payment-cash")
const PaymentInvoice = () => import("@/views/payment/payment-invoice")

export default {
    path: "payments",
    meta: {
        label: 'Payments'
    },
    component: {
        render(c) { return c('router-view') }
    },
    children: [
        {
            path: '',
            name: "Payments",
            component: Payments,
        },
        {
            path: 'cash',
            name: "PaymentCash",
            component: PaymentCash,
        },
        {
            path: 'invoice',
            name: "PaymentInvoice",
            component: PaymentInvoice,
        },

        
    ]
}