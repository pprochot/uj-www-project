import {Box, Button, TextField} from "@mui/material";
import {useState} from "react";
import {ApartmentService} from "../services/ApartmentService";

export default function CreateApartment() {

    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    function createApartment(event) {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const name = data.get("name");
        const address = data.get("address");
        const roommatesMails = data.get("roommatesMails").split(",").map(a => a.trim());

        setErrorMessage("")
        ApartmentService.createApartment(name, address, roommatesMails)
            .then(res => {
                if (res.status === 200) {
                    return res.json()
                } else {
                    setErrorMessage("Failed to create apartment!")
                    return Promise.reject()
                }
            })
            .then(() => setSuccessMessage("Created apartment."))
            .catch(err => setErrorMessage(err))
    }

    return (
        <Box component="form" sx={{margin: 5, display: "flex", flexDirection: "column", gap: 1}}
             onSubmit={createApartment}>
            <TextField required
                       id="name"
                       label="Name"
                       name="name"
                       autoFocus
            />

            <TextField required
                       id="address"
                       label="Address"
                       name="address"
                       autoFocus
            />

            <TextField required
                       id="roommatesMails"
                       label="Roommates Mails separated by comma"
                       name="roommatesMails"
                       autoFocus
            />

            <Button type="submit" variant="contained">
                Create apartment
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