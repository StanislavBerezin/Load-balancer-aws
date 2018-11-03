import axios from 'axios'

const instance = axios.create({
    // baseURL: 'http://localhost:8888'
    baseURL: '/socket'

})

export default instance;