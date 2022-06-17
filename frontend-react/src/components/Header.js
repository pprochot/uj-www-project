import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Box,
    Typography
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Link} from "react-router-dom"

export default function Header() {
    return (
        <Box sx={{marginBottom: 5}}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>Users</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Link to="sign-in">Sign In</Link>
                    <br />
                    <Link to="/sign-up">Sign Up</Link>
                    <br />
                    <Link to="/users">User List</Link>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>Apartment</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Link to="/apartment/create">Create New</Link>
                    <br />
                    <Link to="/apartment">User Apartments</Link>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>Housework</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Link to="/housework/create">Create New</Link>
                    <br />
                    <Link to="/housework">Housework Table</Link>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}