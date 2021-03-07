import { AxiosError } from "axios"
function errorHandler(notify) {
    return function (err) {
        if (err && err.isAxiosError) {
            const { response } = err
            const data = response.data
            let message = data && data.message
            if (Array.isArray(message)) {
                message = message.join(' ')
            }
            if (response.status === 401) {

            }
            else if (response.status === 400) {
                notify({
                    group: "main",
                    type: 'error',
                    title: "Ошибка при валидации данных",
                    text: message
                })
            } else {
                notify({
                    group: "main",
                    type: 'error',
                    title: "Ошибка",
                    text: err.message
                })
            }
        } else {
            console.log('App error', err)
            notify({
                group: "main",
                type: 'error',
                title: "Ошибка",
                text: err.message
            })
        }


    }
}
export default {
    install(Vue, notify) {
        Vue.prototype.$error = errorHandler(notify)
    }
}