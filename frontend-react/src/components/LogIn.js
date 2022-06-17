import {Box, Button, MenuItem, TextField} from "@mui/material";
import {useState} from "react";
import {AuthService} from "../services/AuthService";

export default function LogIn() {

    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    function logIn(event) {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const email = data.get("email");
        const password = data.get("password");

        if (email.includes("@")) {
            setErrorMessage("")
            AuthService.logIn(email, password)
                .then(res => {
                    if (res.status !== 401) {
                        AuthService.setAuth(email, password)
                        setSuccessMessage("Signed in!")
                        setErrorMessage("")
                    } else {
                        setSuccessMessage("")
                        setErrorMessage("Failed to sign in!")
                    }
                })
                .catch(err => setErrorMessage(err))
        } else {
            setErrorMessage("Invalid email or password!")
        }
    }

    return (
        <Box component="form" sx={{margin: 5, display: "flex", flexDirection: "column", gap: 1}} onSubmit={logIn}>
            <TextField required
                       id="email"
                       label="Email"
                       name="email"
                       autoFocus
            />

            <TextField type="password"
                       required
                       id="password"
                       label="Password"
                       name="password"
                       autoFocus
            />

            <Button type="submit" variant="contained">
                Sign In
            </Button>

            <Box sx={{color: "red"}}>
                {errorMessage}
            </Box>

            <Box sx={{color: "green"}}>
                {successMessage}
            </Box>
        </Box>
    )
}