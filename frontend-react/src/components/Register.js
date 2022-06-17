import {Box, Button, MenuItem, TextField} from "@mui/material";
import {useState} from "react";
import {AuthService} from "../services/AuthService";

const roles = [
    {
        value: "admin",
        label: 'Admin',
    },
    {
        value: "user",
        label: 'User',
    }
];

export default function Register() {

    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    function register(event) {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const email = data.get("email");
        const password = data.get("password");
        const matchingPassword = data.get("matchingPassword");
        const role = data.get("role")

        if (email.includes("@") && password === matchingPassword) {
            setErrorMessage("")
            AuthService.register(email, password, matchingPassword, role)
                .then(res => {
                    if (res.status === 200) {
                        // TODO redirect to antoher page
                        AuthService.setAuth(email, password)
                        setSuccessMessage("Registered user!")
                    } else {
                        setErrorMessage("Failed to register!")
                    }
                })
                .catch(err => setErrorMessage(err))
        } else {
            setErrorMessage("Invalid email or password!")
        }
    }

    return (
        <Box component="form" sx={{margin: 5, display: "flex", flexDirection: "column", gap: 1}} onSubmit={register}>
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

            <TextField type="password"
                       required
                       id="matchingPassword"
                       label="Matching password"
                       name="matchingPassword"
                       autoFocus
            />

            <TextField select id="role" name="role" label="Role" defaultValue="admin">
                {roles.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>

            <Button type="submit" variant="contained">
                Sign Up
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