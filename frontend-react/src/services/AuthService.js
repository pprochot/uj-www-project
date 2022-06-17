import {Base64} from "js-base64";

export const AuthService = {
    email: null,
    password: null,

    headers() {
        return {
            "Content-Type": "application/json;charset=UTF-8",
            "Authorization": "Basic " +
                Base64.encode(`${this.email}:${this.password}`)
        }
    },

    register(email, password, matchingPassword, role) {
        switch (role) {
            case "admin":
                return this.registerAdmin(email, password, matchingPassword);
            case "user":
                return this.registerUser(email, password, matchingPassword);
        }
    },

    registerAdmin(email, password, matchingPassword) {
        return fetch("http://localhost:3000/register/admin", {
            method: "POST",
            headers: {"Content-Type": "application/json;charset=UTF-8"},
            body: JSON.stringify({email, password, matchingPassword})
        })
    }
    ,

    registerUser(email, password, matchingPassword) {
        return fetch("http://localhost:3000/register/user", {
            method: "POST",
            headers: {"Content-Type": "application/json;charset=UTF-8"},
            body: JSON.stringify({email, password, matchingPassword})
        })
    },

    getUsers() {
        return fetch("http://localhost:3000/user", {
            method: "GET",
            headers: {"Content-Type": "application/json;charset=UTF-8"}
        })
    },

    setAuth(email, password) {
        this.email = email;
        this.password = password;
        localStorage.setItem("email", email)
        localStorage.setItem("password", password)
    },

    refreshAuth() {
        this.email = localStorage.getItem("email");
        this.password = localStorage.getItem("password");
    },

    isAuth() {
        return !!this.email && !!this.password;
    }
}
