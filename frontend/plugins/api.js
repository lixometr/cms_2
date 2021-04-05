import Api from "../../common/api_routes/api"
import ApiRoutes from "../../common/api_routes/api_routes"
import globalConfig from "@/helpers/globalConfig"
export default async ({ app, $axios, store }, inject) => {
    // store.commit('user/initToken')
    $axios.interceptors.request.use(config => {
        // const token = store.getters['user/token']
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`
        // }
        config.params = Object.assign({}, {
        }, config.params)
        return config
    })
    let baseUrl = globalConfig.api.baseUrl
    if (process.env.NODE_ENV === 'development') {
        // baseUrl = `https://api.st-cms.ru`
        baseUrl = `http://localhost:3001`

    }
    if (process.server) {
        if (process.env.NODE_ENV === 'development') {
            // baseUrl = `https://api.st-cms.ru`
            baseUrl = `http://localhost:3001`
        } else {
            baseUrl = `http://localhost:${globalConfig.api.port}`
        }
        // baseUrl = 'https://api.st-cms.ru'
    }
    inject('api', new Api(ApiRoutes({ baseUrl }), $axios, {}))
}