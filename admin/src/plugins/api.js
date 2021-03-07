import Api from "@/../../common/api_routes/api";
import ApiRoutes from "@/../../common/api_routes/api_routes";
import store from "@/store/store";
import axios from "axios";

const instance = axios.create()
instance.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${store.getters['user/token']}`
    if (!instance.defaults.params) instance.defaults.params = {}

    instance.defaults.params.locale = store.getters['settings/adminLocale'].slug
    instance.defaults.params.currency = store.getters['settings/adminCurrency'].slug
    return config
}
);
let baseUrl = 'http://localhost:4000'
if (process.env.NODE_ENV === 'production') {
    baseUrl = 'http://localhost:4000'

}
export default new Api(ApiRoutes({ baseUrl }), instance)