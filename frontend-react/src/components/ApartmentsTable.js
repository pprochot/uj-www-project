import {
    Box,
    Checkbox,
    FormControlLabel,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel
} from "@mui/material";
import {useEffect, useState} from "react";
import {visuallyHidden} from '@mui/utils';
import {ApartmentService} from "../services/ApartmentService";

const headCells = [
    {
        id: 'id',
        numeric: false,
        label: 'Id',
    },
    {
        id: 'name',
        numeric: false,
        label: 'Name',
    },
    {
        id: 'address',
        numeric: false,
        label: 'Address',
    },
    {
        id: 'creator',
        numeric: false,
        label: 'Creator',
    },
    {
        id: 'roommatesMails',
        numeric: false,
        label: 'Roommates mails',
    }
];

function EnhancedTableHead(props) {
    const {order, orderBy, onRequestSort} =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align="left"
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}


export default function ApartmentsTable() {
    const [errorMessage, setErrorMessage] = useState("");
    const [apartments, setApartments] = useState([]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    function getApartments() {
        ApartmentService.getUserApartments()
            .then(res => {
                if (res.status === 200) {
                    return res.json()
                } else {
                    return Promise.reject("Failed to fetch apartments!")
                }
            })
            .then(body => setApartments(body))
            .catch(err => setErrorMessage(err))
    }

    useEffect(getApartments, []);

    return (
        <Box sx={{width: '100%'}}>
            <Paper sx={{width: '100%', mb: 2}}>
                <TableContainer>
                    <Table
                        sx={{minWidth: 750}}
                        aria-labelledby="apartments table"
                        size="medium"
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {[...apartments].sort(getComparator(order, orderBy))
                                .map((h, index) => {
                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={index}
                                        >
                                            <TableCell align="left">{h.id}</TableCell>
                                            <TableCell align="left">{h.name}</TableCell>
                                            <TableCell align="left">{h.address}</TableCell>
                                            <TableCell align="left">{h.creator}</TableCell>
                                            <TableCell align="left">{h.roommatesMails.join(", ")}</TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <Box sx={{color: "red"}}>
                {errorMessage}
            </Box>
        </Box>
    );
}
