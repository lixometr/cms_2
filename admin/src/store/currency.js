import api from "@/plugins/api"

export const namespaced = true
export const state = () => ({
    currencies: []
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
    async fetch({ commit }) {
        try {
            const { data: currencies } = await api.get('currencies')
            commit('setCurrencies', currencies.items)
        } catch (err) {
            console.log(err)
        }

    }
}