import {List, ListItem, ListItemText} from "@mui/material";
import {useEffect, useState} from "react";
import {AuthService} from "../services/AuthService";

export default function Users() {

    const [users, setUsers] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [size, setSize] = useState(10)
    const [page, setPage] = useState(0)

    function getUsers() {
        setErrorMessage("")
        AuthService.getUsers(size, page)
            .then(res => {
                if (res.status === 200) {
                    return res.json()
                } else {
                    return Promise.reject("Failed to fetch users!")
                }
            })
            .then(body => setUsers(prev => [...prev, ...body.content]))
            .catch(err => setErrorMessage(err))
    }

    function loadMoreItems(event) {
        if (event.target.scrollTop + 416 === event.target.scrollHeight) {
            setPage(prev => prev + 1)
        }
    }

    useEffect(getUsers, [size, page])

    const listItems = users.map(user => (
        <ListItem key={user}>
            <ListItemText primary={user}/>
        </ListItem>
    ))

    return (
        <List onScroll={loadMoreItems} style={{
            maxHeight: 400,
            overflowY: 'scroll'
        }}>
            {listItems}
        </List>
    )
}
