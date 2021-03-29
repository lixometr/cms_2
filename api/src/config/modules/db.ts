export default {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    port: 3307,
    host: process.env.DB_HOST ||  'localhost'
}