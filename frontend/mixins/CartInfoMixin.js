export default {
    items() {
        return this.$store.getters["cart/items"];
    },
    totalPrice() {
        const info = this.$store.getters["cart/info"];
        return info.totalPrice;
    },
    totalSale() {
        const items = this.$store.getters["cart/items"];
        return items.reduce((sum, item) => {
            let d = 0;
            if (item.oldPrice) {
                d = Math.abs(item.oldPrice - item.price);
            }
            d *= item.cnt;
            return sum + d;
        }, 0);
    },
    totalNoSale() {
        const items = this.$store.getters["cart/items"];
        return items.reduce((sum, item) => {
            let price = item.totalPrice;
            if (item.oldPrice) {
                price = item.oldPrice * item.cnt;
            }
            return sum + price;
        }, 0);
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