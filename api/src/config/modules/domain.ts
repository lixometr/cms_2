
let protocol = process.env.PROTOCOL

let host = process.env.API_HOST
let port = process.env.API_PORT
let baseUrl = `${protocol}://${host}`
if (process.env.NODE_ENV !== 'production') {
    baseUrl = `${protocol}://${host}:${port}`
}

export default {
    host,
    protocol,
    baseUrl
}