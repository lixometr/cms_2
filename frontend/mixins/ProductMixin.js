export default {
    props: {
        product: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        name() {
            return this.product.name
        },
        oldPrice() {
            return this.product.oldPrice
        },
        price() {
            return this.product.price
        },
        sale() {
            return this.product.sale
        },
        hasSale() {
            return this.product.sale > 0
        },
        tags() {
            return this.product.tags
        },
        attributes() {
            return this.product.attributes.filter(attr => !!attr.showInProduct)
        },
        defaultImage() {
            return this.product.defaultImage
        }
    }
}