import axios from "axios"
import cookie from "js-cookie"

const getToken = () => {

    const token = cookie.get("token_key")
    if (token === null) {
        return ""
    }
    // const token =""

    return `Bearer ${token}`
}

const instance = axios.create()
instance.defaults.baseURL = "http://localhost:5005"
instance.defaults.headers["X-Requested-With"] = "XMLHttpRequest"
instance.defaults.headers["Content-Type"] = "application/json"
instance.defaults.headers["Authorization"] = getToken()

const timeout = 500

export default class API {

    static get(path, options = {}) {
        return instance.get(path, { timeout, ...options })
    }

    static post(path, data = {}, options = {}) {
        return instance.post(path, data, { timeout, ...options })
    }

    static put(path, data = {}, options = {}) {
        return instance.put(path, data, { timeout, ...options })
    }

    static delete(path, options = {}) {
        return instance.delete(path, { timeout, ...options })
    }

    static all(path) {
        return instance.all(path)
    }

    static spread(param) {
        return instance.spread(param)
    }

    static formdata(path, data = {}, options = {}) {
        return instance.post(path, data, {
            headers: {
                ["Content-Type"]: "multipart/form-data"
            },
            timeout,
            ...options
        })
    }

    static setToken = async () => {
        const getToken = cookie.get("token_key")
        instance.defaults.headers.common['Authorization'] = `Bearer ${getToken}`
    }

    static download(path, data = {}) {
        path = path.replace(/([^:]\/)\/+/g, "$1")
        const downloadProcess = new Promise((resolve, reject) => {
            instance({
                url: path,
                method: "GET",
                responseType: "blob"
            })
                .then(response => {
                    const url = window.URL.createObjectURL(new Blob([response.data]))
                    const link = document.createElement("a")
                    link.href = url
                    link.setAttribute("download", data.name)
                    document.body.appendChild(link)
                    link.click()
                    link.remove()
                    resolve({ status: true })
                })
                .catch(e => {
                    reject(e)
                })
        })
        return downloadProcess
    }

    static rehit = (originalRequest) => {
        return new Promise(((resolve, reject) => {
            instance(originalRequest)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        }))
    }
}

instance.interceptors.request.use(
    response => {
        return response
    },
    error => Promise.reject(error)
)


instance.interceptors.response.use(
    response => {
        return response
    },
    async error => {
        const message = error.response?.data.message
        console.log(message)

        const originalRequest = error.config
        if (error.response.status === 401 && !originalRequest._retry) {
        } else if (error.response.status === 500) {
            originalRequest._retry = true
            const payload = {
                refresh_token: cookie.get("token_key")
            }
            await AuthAPI.RefreshToken(payload)
                .then(async res => {
                    if (res.success) {
                        const data = res.data.data

                        cookie.set("token_key", data['access_token'].token)
                        API.setToken()
                        const token = data['access_token'].token
                        instance.defaults.headers.common["Authorization"] = `Bearer ${token}`
                    } else {

                    }
                })
        }

        return Promise.reject(error)
    }
)