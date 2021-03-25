import _ from "lodash"
const cookieKey = 'favourite'
export const state = () => ({
    cookieItems: [],
    items: []
})

export const getters = {

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
    add(state, { cnt, id, activeVariation, activeOptions }) {
        if (!id) return
        cnt = parseInt(cnt)
        if (isNaN(cnt)) cnt = 1
        let cookieFavourite = this.$cookies.get(cookieKey)
        if (!_.isArray(cookieFavourite)) cookieFavourite = []
        cookieFavourite.push({ id, cnt, activeVariation, activeOptions })
        this.$cookies.set(cookieKey, cookieFavourite, this.getters['favourite/cookieOptions'])
        state.cookieItems = cookieFavourite
    },

    remove(state, { id }) {
        let cookieFavourite = this.$cookies.get(cookieKey)
        if (!_.isArray(cookieFavourite)) {
            this.commit('favourite/clear')
            return
        }
        cookieFavourite = cookieFavourite.filter(item => item.id !== id)
        this.$cookies.set(cookieKey, cookieFavourite, this.getters['favourite/cookieOptions'])
        state.cookieItems = cookieFavourite
    },
    removeByIdx(state, idx) {
        let cookieFavourite = this.$cookies.get(cookieKey)
        if (!_.isArray(cookieFavourite)) {
            this.commit('favourite/clear')
            return
        }
        cookieFavourite.splice(idx, 1)
        this.$cookies.set(cookieKey, cookieFavourite, this.getters['favourite/cookieOptions'])
        state.cookieItems = cookieFavourite
    },
    update(state, { idx, cnt }) {
        cnt = parseInt(cnt)
        if (isNaN(cnt)) cnt = 1
        let cookieFavourite = this.$cookies.get(cookieKey)
        if (!_.isArray(cookieFavourite)) return
        const itemIdx = idx
        if (itemIdx < 0) return
        cookieFavourite[itemIdx].cnt = cnt
        this.$cookies.set(cookieKey, cookieFavourite, this.getters['favourite/cookieOptions'])
        state.cookieItems = cookieFavourite
    },
    clear(state) {
        state.cookieItems = []
        this.$cookies.set(cookieKey, [], this.getters['favourite/cookieOptions'])
    },
    setItems(state, items) {
        state.items = items
    },
    init(state) {
        let cookieFavourite = this.$cookies.get(cookieKey)
        if (!_.isArray(cookieFavourite)) {
            this.commit('favourite/clear')
            return
        }
        state.cookieItems = cookieFavourite

    }
}

export const actions = {
    async add({ commit, getters }, payload) {
        commit('add', payload)
        await this.dispatch('favourite/fetchItems')

    },
    async remove({ commit }, payload) {
        commit('remove', payload)
        await this.dispatch('favourite/fetchItems')

    },
    async removeByIdx({ commit }, payload) {
        commit('removeByIdx', payload)
        await this.dispatch('favourite/fetchItems')
    },
    async update({ commit }, payload) {
        commit('update', payload)
        await this.dispatch('favourite/fetchItems')
    },
    async init({ commit }) {
        commit('init')
        await this.dispatch('favourite/fetchItems')
    },
    clear({ commit }, payload) {
        commit('clear', payload)
    },

    async fetchItems({ commit, getters }) {
        try {
            const resolvers = getters.cookieItems.map(async (favouriteItem, idx) => {
                try {
                    const item = await this.$api.$post("productInfo", {
                        id: favouriteItem.id,
                    }, {
                        activeVariation: favouriteItem.activeVariation || null,
                        activeOptions: favouriteItem.activeOptions || {},
                        cnt: favouriteItem.cnt,
                    });

                    return item
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