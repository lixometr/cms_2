export default {
    computed: {
        items() {
            return this.$store.getters["cart/items"];
        },
        totalPrice() {
            const info = this.$store.getters["cart/info"];
            return info.totalPrice;
        },
        totalSale() {
            return this.totalNoSale - this.totalPrice
        },
        totalNoSale() {
            const info = this.$store.getters["cart/info"];
            return info.totalPriceNoSale;
        },
        sale() {
            const totalSale = this.items.reduce((sum, item) => {
                const d = item.oldPrice - item.price;
                if (d > 0) {
                    return sum + d * item.cnt;
                }
                return sum;
            }, 0);
            return totalSale;
        },
    }

}