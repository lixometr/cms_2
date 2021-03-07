import { getLocaleItem, getLocaleValue } from "@/helpers/locale-functions"
export default {
    install(Vue, store) {
        Vue.prototype.$getLocaleItem = (value, localeId) => {
            if (!localeId) {
                const locale = store.getters['settings/adminLocale']
                localeId = locale.id

            }
            return getLocaleItem(value, locale.id)
        }
        Vue.prototype.$getLocaleValue = (value, prop, localeId) => {

            if (!localeId) {
                const locale = store.getters['settings/adminLocale']
                localeId = locale.id
            }
            return getLocaleValue(value, prop, localeId)
        }
    }
}