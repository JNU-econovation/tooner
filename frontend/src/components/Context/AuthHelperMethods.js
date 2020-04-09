import decode from 'jwt-decode';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

class AuthHelperMethods {
    constructor() {
        this.login_api = "/login";
    }

    login = (user_data) => {
        return (
            axios.post(this.login_api, user_data)
            .then(res => {
                const token = res.data.token;
                this.setToken(token);
            }).catch(err => {
                console.log('login failed');
            })
        );
    };

    loggedIn = () => {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    isTokenExpired = token => {
        try {
            const decoded = decode(token);
            if(decoded.exp < Date.now() / 1000) {
                return true;
            }
            return false;
        } catch(err) {
            console.log('Expired check failed')
            return false;
        }
    };

    logout = () => {
        localStorage.removeItem('token');
    }

    getToken = () => {
        return localStorage.getItem('token');
    }

    setToken = (token) => {
        localStorage.setItem('token', token)
    }

    getConfirm = () => {
        return decode(this.getToken());
    }

    /*
    fetch = (url, options) => {
        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json"
        };

        if(this.loggedIn())
        header["Authorization"] = this.getToken();

        return fetch(url, {
            headers,
            ...options
        })
        .then(this._checkStatus)
        .then(res => res.json());
    }

    _checkStatus = res => {
        if(res.status >= 200 && res.status < 300) {
            return res;
        }
        var error = new Error(res.status);
        error.res = res;
        throw error;
    }
    */
}

export default AuthHelperMethods;