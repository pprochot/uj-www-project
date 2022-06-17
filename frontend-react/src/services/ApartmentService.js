import {AuthService} from "./AuthService";

export const ApartmentService = {
    createApartment(name, address, roommatesMails) {
        return fetch("http://localhost:3000/apartment", {
            method: "POST",
            headers: AuthService.headers(),
            body: JSON.stringify({name, address, roommatesMails})
        })
    },

    getUserApartments() {
        return fetch("http://localhost:3000/apartment", {
            method: "GET",
            headers: AuthService.headers()
        })
    }
}
