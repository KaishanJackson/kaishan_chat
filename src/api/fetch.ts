import axios from "axios";
import { store } from "../store"
const fetch = axios.create({
    baseURL: "http://localhost:8000"
})

fetch.interceptors.request.use(config => {
    const token = store.getState().user.info.token
    if (token) {
        config.headers!.token = token; // token
    }
    return config
})

fetch.interceptors.response.use(response => {
    console.log(response)
    const status = Number(response.status) || 200;
    const message = response.data.message;
    console.log(status, message)
    return response
})
export default fetch