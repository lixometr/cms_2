export default {
 
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
            const attributes = this.product.attributes || []
            return  attributes.filter(attr => !!attr.showInProduct)
        },
        defaultImage() {
            return this.product.defaultImage
        },
        type() {
            return this.product.type
        },
        variations() {
            return this.product.variations || ''
        },
        options() {
            return this.product.options || []
        }
    }
}