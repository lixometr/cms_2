import ProductRoutes from "./routes/product"
import CategoryRoutes from "./routes/category"

import LocaleRoutes from "./routes/locale"

import PageRoutes from "./routes/page"
import UserRoutes from "./routes/user"
import PromocodeRoutes from "./routes/promocode"
import SectionTagRoutes from "./routes/sectionTag"
import AttributeRoutes from "./routes/attribute"
import AttributeValuesRoutes from "./routes/attributeValues"
import ProductTagRoutes from "./routes/product-tag"
import OrderRoutes from "./routes/order"
import NotyRoutes from "./routes/noty"
import PageTemplateRoutes from "./routes/pageTemplate"
import SectionRoutes from "./routes/section"
import SettingsRoutes from "./routes/settings"
import SectionPageRoutes from "./routes/section-page"
import CurrencyRoutes from "./routes/currency"
import DeliveryRoutes from "./routes/delivery"
import WidgetRoutes from "./routes/widget"
import AuthRoutes from "./routes/auth"
import AuthAdminRoutes from "./routes/auth-admin"
import MenuRoutes from "./routes/menu"

const routes = {
    ...ProductRoutes,
    ...CategoryRoutes,
    ...LocaleRoutes,
    ...PageRoutes,
    ...UserRoutes,
    ...PromocodeRoutes,
    ...SectionTagRoutes,
    ...AttributeRoutes,
    ...AttributeValuesRoutes,
    ...ProductTagRoutes,
    ...OrderRoutes,
    ...NotyRoutes,
    ...PageTemplateRoutes,
    ...SectionRoutes,
    ...SettingsRoutes,
    ...SectionPageRoutes,
    ...CurrencyRoutes,
    ...DeliveryRoutes,
    ...WidgetRoutes,
    ...AuthRoutes,
    ...AuthAdminRoutes,
    ...MenuRoutes,

    uploadImage: '/upload/image',
    uploadFile: '/upload/file',
    search: '/search/{{text}}'

}
export default ({ version, baseUrl = '/api' } = {}) => {
    const Routes = { ...routes }
    for (let key in routes) {
        if (version) {
            Routes[key] = `${baseUrl}${version}${Routes[key]}`
        } else {
            Routes[key] = `${baseUrl}${Routes[key]}`
        }
    }
    return Routes
}