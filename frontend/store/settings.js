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
    async init() {
        this.dispatch('settings/fetch')
    },
    async fetch({ commit }) {
        try {
            const resolvers = settignsSlugs.map(async (slug) => {
                const setting = await this.$api.$get('setting', { slug })
                commit('setSetting', setting)
                return setting
            })
            await Promise.all(resolvers)
        } catch (err) {
            this.$error(err)
        }

    }
}