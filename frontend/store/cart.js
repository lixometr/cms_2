import _ from "lodash"
export const state = () => ({
    cookieItems: [],
    items: []
})

export const getters = {
    promocode(state) {
        return state.promocode
    },
    hasItem(state) {
        return (id) => {
            return state.items.findIndex(item => item.id === id) > -1
        }
    },
    getItem(state) {
        return (id) => {
            return state.items.find(item => item.id === id)
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
    add(state, { cnt, id, variation, options }) {
        if (!id) return
        cnt = parseInt(cnt)
        if (isNaN(cnt)) cnt = 1
        let cookieCart = this.$cookies.get('cart')
        if (!_.isArray(cookieCart)) cookieCart = []
        cookieCart.push({ id, cnt, variation, options })
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
            const resolvers = getters.cookieItems.map(async (cartItem, idx) => {
                try {
                    const item = await this.$api.$get("productById", {
                        id: cartItem.id,
                    });
                    if (!item) {
                        commit('removeByIdx', idx)
                        return false
                    }
                    return {
                        ...cartItem,
                        item,
                    };
                } catch (err) {
                    commit('removeByIdx', idx)
                    return false
                }
            });
            let items = await Promise.all(resolvers);
            items = items.filter(item => !!item)
            commit('setItems', items)
            return items
        } catch (err) {
            this.$error(err);
            return []
        }
    }
}