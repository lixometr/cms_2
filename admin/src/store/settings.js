import api from "@/plugins/api"
import Vue from "vue"
const settignsSlugs = [
    'locale-default',
    'currency-default'
]
export const namespaced = true
export const state = () => ({
    settings: [

    ]
})
export const getters = {
    settings(state) {
        return state.settings
    },
    adminLocale(state, getters, _, rootGetters) {
        return rootGetters['locale/defaultLocale'] || {}
    },
    adminCurrency(state, getters, _, rootGetters) {
        return rootGetters['currency/defaultCurrency'] || {}


    },
    getSetting(state, getters) {
        return (slug) => {
            const setting = state.settings.find(setting => setting.slug === slug)
            if (!setting) return
            return setting.value
        }
    },

}
export const mutations = {
    setSettings(state, settings) {
        state.settings = settings
    },
    setSetting(state, setting) {
        const settingIdx = state.settings.findIndex(s => s.slug === setting.slug)
        if (settingIdx < 0) {
            state.settings.push(setting)
        } else {
            Vue.set(state.settings, settingIdx, setting)
        }
    }
}
export const actions = {
    async fetch({ commit }) {
        try {
            const resolvers = settignsSlugs.map(async (slug) => {
                const { data: setting } = await api.get('setting', { slug })
                commit('setSetting', setting)
                return setting
            })
            await Promise.all(resolvers)
            // const { data: settings } = await api.get('settings')
            // commit('setSettings', settings.items)
        } catch (err) {
            console.log(err)
        }

    }
}