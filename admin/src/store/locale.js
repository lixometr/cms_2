import api from "@/plugins/api"

export const namespaced = true
export const state = () => ({
    locales: []
})
export const getters = {
    locales(state) {
        return state.locales
    },
    getLocale(state) {
        return (id) => {
            return state.locales.find(reg => reg.id === id) || {}
        }
    },
    defaultLocale(state, getters, _, rootGetters) {
        const localeId =  rootGetters['settings/getSetting']('locale-default')
        const locale = state.locales.find(loc => loc.id === localeId)
        return locale || {}
    }
}
export const mutations = {
    setLocales(state, locales) {
        state.locales = locales
    }
}
export const actions = {
    async fetch({ commit }) {
        try {
            const { data: locales } = await api.get('locales')
            commit('setLocales', locales.items)
        } catch (err) {
            console.log(err)
        }

    }
}