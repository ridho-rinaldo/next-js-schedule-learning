import API from "../AxiosCall"
import apiUrl from "../apiUrl"

export default class AuthAPI {
    
    static Login(payload) {
        return new Promise(((resolve, reject) => {
            API.post(apiUrl.auth.login, payload, {})
                .then((result) => {
                    const data = result.data
                    if (data.code === 200) {
                        resolve({ data, success: true })
                    } else {
                        resolve({ data, success: false })
                    }
                }, (err) => {
                    console.log(JSON.stringify(err.response, null, 2))
                    reject(err)
                })
        }))
    }

    static Logout(payload) {
        return new Promise(((resolve, reject) => {
            API.post(apiUrl.auth.logout, payload, {})
                .then((result) => {
                    const data = result.data
                    if (data.code === 200) {
                        resolve({ data, success: true })
                    } else {
                        resolve({ data, success: false })
                    }
                }, (err) => {
                    console.log(JSON.stringify(err.response, null, 2))
                    reject(err)
                })
        }))
    }

    static RefreshToken(payload) {
        return new Promise(((resolve, reject) => {
            API.post(apiUrl.auth.refresh_token, payload, {})
                .then((result) => {
                    const data = result.data
                    if (data.code === 200) {
                        resolve({ data, success: true })
                    } else {
                        resolve({ data, success: false })
                    }
                }, (err) => {
                    reject(err)
                })
        }))
    }
}