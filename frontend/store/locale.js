
export const namespaced = true
export const state = () => ({
    locales: [],
    // id
    locale: null
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
    locale(state, getters) {
        if (state.locale) {
            return getters.getLocale(state.locale)
        }
        return getters.defaultLocale
    },
    defaultLocale(state, getters, _, rootGetters) {
        const localeId = rootGetters['settings/getSetting']('locale-default')
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
    async init() {
        await this.dispatch('locale/fetch')
    },
    async fetch({ commit }) {
        try {
            const locales = await this.$api.$get('locales')
            commit('setLocales', locales.items)
        } catch (err) {
            console.log(err)
        }

    }
}