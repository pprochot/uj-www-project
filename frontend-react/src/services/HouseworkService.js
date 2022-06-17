import {AuthService} from "./AuthService";

export const HouseworkService = {
    createHousework(name, description, apartmentId, executorMail) {
        return fetch("http://localhost:3000/housework", {
            method: "POST",
            headers: AuthService.headers(),
            body: JSON.stringify({name, description, apartmentId, executorMail})
        })
    },

    getUserHousework() {
        return fetch("http://localhost:3000/housework", {
            method: "GET",
            headers: AuthService.headers()
        })
    },

    setHouseworkAsCompleted(houseworkId) {
        return fetch("http://localhost:3000/housework", {
            method: "PATCH",
            headers: AuthService.headers(),
            body: JSON.stringify({houseworkId})
        })
    }
}
