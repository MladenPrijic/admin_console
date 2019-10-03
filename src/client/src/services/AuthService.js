import axios from "axios";
import * as decode from 'jwt-decode';

export default class AuthService {
    constructor(domain) {
        this.domain = domain || process.env.REACT_APP_API_URL;
    }

    login = async (username, password) => {
        const user = {
            email: username,
            password: password
        };
        try {
            const token = await axios.post(`${this.domain}/api/auth/login`, user);
            this.setToken(token.data.token);
        } catch (err) {
            return Promise.reject(this._checkStatus(err.response));
        }
    }

    loggedIn = () => {
        const token = this.getToken()
        return !!token && !this.isTokenExpired(token)
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);

            if (decoded.exp < Date.now() / 1000) {
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken(token) {
        localStorage.setItem('token', token);
    }

    getToken() {
        return localStorage.getItem('token')
    }

    logout() {
        localStorage.removeItem('token');
        window.location.replace('/');
    }

    getProfile = () => {
        // Using jwt-decode npm package to decode the token
        return decode(this.getToken());
    }


    fetch = () => {

        let instance = null;
        if (this.loggedIn()) {
            instance = axios.create({
                baseURL: this.domain,
                timeout: 10000,
                headers: { "Authorization": `Bearer ${this.getToken()}` }
            });
        } else {
            instance = axios.create({ baseURL: this.domain });
        }

        return instance;
    }

    _checkStatus(response) {
        if (response === undefined) {
            let error = new Error("Problem with connection.");
            error.data = { Message: "Problem with connection." };
            return error;
        }
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response;
        } else if (response.status === 401) {
            return response;
        }
        else {
            var error = new Error(response.statusText);
            error.response = response;
            return error;
        }
    }
}
