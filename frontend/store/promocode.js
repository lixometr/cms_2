
export const state = () => ({
    promocode: '',
    data: {}
})
export const getters = {
    promocode(state) {
        return state.promocode
    },
    hasPromocode(state) {
        return state.promocode.length > 0
    },
    data(state) {
        return state.data
    },
    cookieOptions() {
        return {
            path: '/',
            maxAge: 60 * 60 * 24 * 360
        }
    }
}
export const mutations = {
    init(state) {
        const promocode = this.$cookies.get('promocode')
        state.promocode = promocode
    },
    set(state, promocode) {
        state.promocode = promocode
        this.$cookies.set('promocode', promocode, this.getters['promocode/cookieOptions'])
    },
    setData(state, data) {
        state.data = data
    },
    reset(state) {
        state.promocode = ''
        this.$cookies.set('promocode', '', this.getters['promocode/cookieOptions'])
        state.data = {}
    }
}
export const actions = {
    async check({ getters }, promocode) {
        try {
            const isValid = await this.$api.$post('promocodeCheck', {}, {
                promocode
            })
            return isValid
        } catch (err) {
            this.$error(err)
        }
    },
    async get({ getters }, promocode) {
        try {
            const item = await this.$api.$get('promocode', { name: promocode })
            return item
        } catch (err) {
            this.$error(err)
        }
    },
    init({ commit }) {
        commit('init')

    },
    async fetch({ commit, getters }) {
        const isValid = await this.dispatch('promocode/check', getters.promocode)
        if (!isValid) {
            commit('reset')
            return
        }
        const item = await this.dispatch('promocode/get', getters.promocode)
        commit('setData', item)
    },
    async set({ commit }, promocode) {
        const isValid = await this.dispatch('promocode/check', promocode)
        if (!isValid) {
            commit('reset')
            return false
        }
        const item = await this.dispatch('promocode/get', promocode)
        if (!item) {
            commit('reset')
            return false
        }
        commit('set', promocode)
        commit('setData', item)
        return true
    }
}
