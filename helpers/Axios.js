import axios from 'axios'

const instance = axios.create({
    // baseURL: 'http://localhost:4000'
    baseURL: 'http://18.236.158.34'
})

export default instance;