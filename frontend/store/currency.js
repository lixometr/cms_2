
export const namespaced = true
export const state = () => ({
    currencies: [],
    currency: ''
})
export const getters = {
    currencies(state) {
        return state.currencies
    },
    getCurrency(state) {
        return (id) => {
            return state.currencies.find(reg => reg.id === id) || {}
        }
    },
    currency(state, getters) {
        if(state.currency) {
            return getters.getCurrency(state.currency)
        }
        return getters.defaultCurrency
    },
    defaultCurrency(state, getters, _, rootGetters) {
        const currencyId =  rootGetters['settings/getSetting']('currency-default')
        const currency = state.currencies.find(loc => loc.id === currencyId)
        return currency || {}
    }
}
export const mutations = {
    setCurrencies(state, currencies) {
        state.currencies = currencies
    }
}
export const actions = {
    async init() {
        await this.dispatch('currency/fetch')
    },
    async fetch({ commit }) {
        try {
            const currencies = await this.$api.$get('currencies')
            commit('setCurrencies', currencies.items)
        } catch (err) {
            this.$error(err)
        }

    }
}