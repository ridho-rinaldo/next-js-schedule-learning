import API from "../AxiosCall" // Import Axios API wrapper
import apiUrl from "../apiUrl" // Import the API endpoint configuration

export default class AuthAPI {
    
    // Method for user login
    static Login(payload) {
        return new Promise(((resolve, reject) => {
            API.post(apiUrl.auth.login, payload, {}) // Make a POST request to the login endpoint
                .then((result) => {
                    const data = result.data
                    if (data.code === 200) {
                        resolve({ data, success: true }) // Resolve with successful response
                    } else {
                        resolve({ data, success: false }) // Resolve with unsuccessful response
                    }
                }, (err) => {
                    console.log(JSON.stringify(err.response, null, 2))
                    reject(err) // Reject with error
                })
        }))
    }

    // Method for user logout
    static Logout(payload) {
        return new Promise(((resolve, reject) => {
            API.post(apiUrl.auth.logout, payload, {}) // Make a POST request to the logout endpoint
                .then((result) => {
                    const data = result.data
                    if (data.code === 200) {
                        resolve({ data, success: true }) // Resolve with successful response
                    } else {
                        resolve({ data, success: false }) // Resolve with unsuccessful response
                    }
                }, (err) => {
                    console.log(JSON.stringify(err.response, null, 2))
                    reject(err) // Reject with error
                })
        }))
    }

    // Method to refresh the authentication token
    static RefreshToken(payload) {
        return new Promise(((resolve, reject) => {
            API.post(apiUrl.auth.refresh_token, payload, {}) // Make a POST request to the token refresh endpoint
                .then((result) => {
                    const data = result.data
                    if (data.code === 200) {
                        resolve({ data, success: true }) // Resolve with successful response
                    } else {
                        resolve({ data, success: false }) // Resolve with unsuccessful response
                    }
                }, (err) => {
                    reject(err) // Reject with error
                })
        }))
    }
}
