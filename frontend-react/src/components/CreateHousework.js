import {Box, Button, TextField} from "@mui/material";
import {useState} from "react";
import {HouseworkService} from "../services/HouseworkService";

export default function CreateHousework() {

    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    function createApartment(event) {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const name = data.get("name");
        const description = data.get("description");
        const apartmentId = data.get("apartmentId");
        const executorMail = data.get("executorMail")

        setErrorMessage("")
        HouseworkService.createHousework(name, description, apartmentId, executorMail)
            .then(res => {
                if (res.status === 200) {
                    return res.json()
                } else {
                    return Promise.reject("Failed to create housework!")
                }
            })
            .then(() => setSuccessMessage("Created Housework."))
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
                       id="description"
                       label="Description"
                       name="description"
                       autoFocus
            />

            <TextField required
                       id="apartmentId"
                       label="Apartment id"
                       name="apartmentId"
                       autoFocus
            />

            <TextField required
                       id="executorMail"
                       label="Executor mail"
                       name="executorMail"
                       autoFocus
            />

            <Button type="submit" variant="contained">
                Create housework
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