import _ from "lodash"
export const state = () => ({
  isLoading: false,
  passwordLength: 4,

})
export const getters = {
  defaultImage() {
    return '/no_image.png'
  },  

  pageTitle(state) {
    return (name, type) => {
      return name
    }
  },
}
export const mutations = {
 
}
export const actions = {

  async nuxtServerInit({ commit, dispatch }, { app, req, i18n, route }) {
    try {
      await dispatch('settings/init')
      await dispatch('locale/init')
      await dispatch('currency/init')
      await dispatch('cart/init')
      await dispatch('favourite/init')
      // await dispatch('user/init')


    } catch (err) {
      this.$error(err)
    }
  },

}