export const AuthService = {
    registeredEmail: null,
    registeredPassword: null,

    toBinary(string) {
        const codeUnits = new Uint16Array(string.length);
        for (let i = 0; i < codeUnits.length; i++) {
            codeUnits[i] = string.charCodeAt(i);
        }
        const charCodes = new Uint8Array(codeUnits.buffer);
        let result = '';
        for (let i = 0; i < charCodes.byteLength; i++) {
            result += String.fromCharCode(charCodes[i]);
        }
        return result;
    },

    headers() {
        return {
            "Content-Type": "application/json;charset=UTF-8",
            "Authorization": "Basic " +
                this.toBinary(`${this.registeredEmail}:${this.registeredPassword}`)
        }
    }
    ,

    register(email, password, matchingPassword, role) {
        switch (role) {
            case "admin":
                return this.registerAdmin(email, password, matchingPassword);
            case "user":
                return this.registerUser(email, password, matchingPassword);
        }
    }
    ,

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
    }
}
