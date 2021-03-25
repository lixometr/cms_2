import _ from "lodash"
export const state = () => ({
    cookieItems: [],
    items: [],
    info: {}
})

export const getters = {
    info(state) {
        return state.info
    },
    promocode(state) {
        return state.promocode
    },
    hasItem(state) {
        return (id) => {
            return state.items.findIndex(item => item.id === id) > -1
        }
    },
    getItem(state) {
        return (idx) => {
            return state.cookieItems[idx]
        }
    },
    hasItems(state) {
        return state.items.length > 0
    },
    items(state) {
        return state.items;
    },
    cookieItems(state) {
        return state.cookieItems;
    },
    cnt(state, getters) {
        return getters.items.length
    },
    cookieOptions() {
        return {
            path: '/',
            maxAge: 60 * 60 * 24 * 360
        }
    }
}

export const mutations = {
   
    add(state, { cnt, id, activeVariation, activeOptions }) {
        if (!id) return
        cnt = parseInt(cnt)
        if (isNaN(cnt)) cnt = 1
        let cookieCart = this.$cookies.get('cart')
        if (!_.isArray(cookieCart)) cookieCart = []
        cookieCart.push({ id, cnt, activeVariation, activeOptions })
        this.$cookies.set('cart', cookieCart, this.getters['cart/cookieOptions'])
        state.cookieItems = cookieCart
    },

    remove(state, { id }) {
        let cookieCart = this.$cookies.get('cart')
        if (!_.isArray(cookieCart)) {
            this.commit('cart/clear')
            return
        }
        cookieCart = cookieCart.filter(item => item.id !== id)
        this.$cookies.set('cart', cookieCart, this.getters['cart/cookieOptions'])
        state.cookieItems = cookieCart
    },
    removeByIdx(state, idx) {
        let cookieCart = this.$cookies.get('cart')
        if (!_.isArray(cookieCart)) {
            this.commit('cart/clear')
            return
        }
        cookieCart.splice(idx, 1)
        this.$cookies.set('cart', cookieCart, this.getters['cart/cookieOptions'])
        state.cookieItems = cookieCart
    },
    update(state, { idx, cnt }) {
        cnt = parseInt(cnt)
        if (isNaN(cnt)) cnt = 1
        let cookieCart = this.$cookies.get('cart')
        if (!_.isArray(cookieCart)) return
        const itemIdx = idx
        if (itemIdx < 0) return
        cookieCart[itemIdx].cnt = cnt
        this.$cookies.set('cart', cookieCart, this.getters['cart/cookieOptions'])
        state.cookieItems = cookieCart
    },
    clear(state) {
        state.cookieItems = []
        this.$cookies.set('cart', [], this.getters['cart/cookieOptions'])
    },
    setItems(state, items) {
        state.items = items
    },
    init(state) {
        let cookieCart = this.$cookies.get('cart')
        if (!_.isArray(cookieCart)) {
            this.commit('cart/clear')
            return
        }
        state.cookieItems = cookieCart

    },
    setInfo(state, info) {
        state.info = info
    }
}

export const actions = {
    async add({ commit, getters }, payload) {
        commit('add', payload)
        await this.dispatch('cart/fetchItems')

    },
    async remove({ commit }, payload) {
        commit('remove', payload)
        await this.dispatch('cart/fetchItems')

    },
    async removeByIdx({ commit }, payload) {
        commit('removeByIdx', payload)
        await this.dispatch('cart/fetchItems')
    },
    async update({ commit }, payload) {
        commit('update', payload)
        await this.dispatch('cart/fetchItems')
    },
    async init({ commit }) {
        commit('init')
        await this.dispatch('cart/fetchItems')
    },
    clear({ commit }, payload) {
        commit('clear', payload)
    },

    async fetchItems({ commit, getters }) {
        try {

            const cartProducts = getters.cookieItems.map(cartItem => ({
                activeVariation: cartItem.activeVariation || null,
                activeOptions: cartItem.activeOptions || {},
                cnt: cartItem.cnt,
                product: { id: cartItem.id }
            }))
            const cartInfo = await this.$api.$post("cartInfo", {}, {
                promocode: this.getters['promocode/promocode'],
                products: cartProducts
            })

            commit('setItems', cartInfo.products)

            commit('setInfo', {
                totalPrice: cartInfo.totalPrice,
                promocodeSale: cartInfo.promocodeSale,
            })
            let cookieCart = this.$cookies.get('cart')
            cookieCart = cookieCart.filter(cookieItem => cartInfo.products.findIndex(productItem => productItem.id === cookieItem.id) >= 0)
            this.$cookies.set('cart', cookieCart, this.getters['cart/cookieOptions'])
            state.cookieItems = cookieCart
            return cartInfo
        } catch (err) {
            this.$error(err);
            return []
        }
    }
}