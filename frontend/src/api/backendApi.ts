import axios from 'axios'

const bacendApi = axios.create({
    baseURL: "http://localhost:3400/"
})

export default bacendApi
