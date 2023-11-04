import axios from "axios"
import cookie from "js-cookie"

// Function to get the authentication token from a cookie
const getToken = () => {
    const token = cookie.get("token_key")
    if (token === null) {
        return ""
    }
    return `Bearer ${token}`
}

// Create an Axios instance with default configurations
const instance = axios.create()
instance.defaults.baseURL = "http://localhost:5005"
instance.defaults.headers["X-Requested-With"] = "XMLHttpRequest"
instance.defaults.headers["Content-Type"] = "application/json"
instance.defaults.headers["Authorization"] = getToken()

const timeout = 500

// API class for making HTTP requests
export default class API {
    // HTTP GET request
    static get(path, options = {}) {
        return instance.get(path, { timeout, ...options })
    }

    // HTTP POST request
    static post(path, data = {}, options = {}) {
        return instance.post(path, data, { timeout, ...options })
    }

    // HTTP PUT request
    static put(path, data = {}, options = {}) {
        return instance.put(path, data, { timeout, ...options })
    }

    // HTTP DELETE request
    static delete(path, options = {}) {
        return instance.delete(path, { timeout, ...options })
    }

    // Create a batch of requests
    static all(path) {
        return instance.all(path)
    }

    // Spread the results of batch requests
    static spread(param) {
        return instance.spread(param)
    }

    // HTTP POST request with multipart/form-data
    static formdata(path, data = {}, options = {}) {
        return instance.post(path, data, {
            headers: {
                ["Content-Type"]: "multipart/form-data"
            },
            timeout,
            ...options
        })
    }

    // Set the authentication token in the request headers
    static setToken = async () => {
        const getToken = cookie.get("token_key")
        instance.defaults.headers.common['Authorization'] = `Bearer ${getToken}`
    }

    // Download a file from the server
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

    // Retry the request after a refresh token is obtained
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

// Axios request interceptor
instance.interceptors.request.use(
    response => {
        return response
    },
    error => Promise.reject(error)
)

// Axios response interceptor
instance.interceptors.response.use(
    response => {
        return response
    },
    async error => {
        // Handle errors, including token refresh
        const message = error.response?.data.message
        console.log(message)

        const originalRequest = error.config
        if (error.response.status === 401 && !originalRequest._retry) {
        } else if (error.response.status === 500) {
            originalRequest._retry = true
            const payload = {
                refresh_token: cookie.get("token_key")
            }
            // Attempt to refresh the token
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
