import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8080'
    // baseURL: '/api'
})

export default instance;