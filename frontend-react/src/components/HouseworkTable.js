import {
    Box, Button, Checkbox, FormControlLabel,
    ListItem,
    ListItemText,
    Paper, PropTypes,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel, Toolbar
} from "@mui/material";
import {useEffect, useState} from "react";
import { visuallyHidden } from '@mui/utils';
import {AuthService} from "../services/AuthService";
import {HouseworkService} from "../services/HouseworkService";

const headCells = [
    {
        id: 'name',
        numeric: false,
        label: 'Name',
    },
    {
        id: 'description',
        numeric: false,
        label: 'Description',
    },
    {
        id: 'executorMail',
        numeric: false,
        label: 'Executor Mail',
    },
    {
        id: 'completionDate',
        numeric: false,
        label: 'Completion Date',
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


export default function HouseworkTable() {
    const [errorMessage, setErrorMessage] = useState("");
    const [housework, setHousework] = useState([]);
    const [displayed, setDisplayed] = useState([]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [filterCompleted, setFilterCompleted] = useState(false);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    function getHousework() {
        HouseworkService.getUserHousework()
            .then(res => {
                if (res.status === 200) {
                    return res.json()
                } else {
                    return Promise.reject("Failed to fetch housework!")
                }
            })
            .then(body => setHousework(body))
            .catch(err => setErrorMessage(err))
    }

    function handleComplete(houseworkId) {
        HouseworkService.setHouseworkAsCompleted(houseworkId)
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    return Promise.reject("Failed to complete housework");
                }
            })
            .then(body => setHousework(prev => [...prev.filter(h => h.id !== houseworkId), body]))
            .catch(err => setErrorMessage(err));
    }

    useEffect(getHousework, []);
    useEffect(() => {
        if (filterCompleted) {
            setDisplayed([...housework].filter(h => !!h.completionDate));
        } else {
            setDisplayed([...housework]);
        }
    }, [housework, filterCompleted]);

    return (
        <Box sx={{width: '100%'}}>
            <FormControlLabel
                label="Only Completed"
                control={
                    <Checkbox
                        checked={filterCompleted}
                        onChange={(e) => setFilterCompleted(e.target.checked)}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                }
            />
            <Paper sx={{width: '100%', mb: 2}}>
                <TableContainer>
                    <Table
                        sx={{minWidth: 750}}
                        aria-labelledby="housework table"
                        size="medium"
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            { [...displayed].sort(getComparator(order, orderBy))
                                .map((h, index) => {
                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={index}
                                        >
                                            <TableCell align="left">{h.name}</TableCell>
                                            <TableCell align="left">{h.description}</TableCell>
                                            <TableCell align="left">{h.executorMail}</TableCell>
                                            <TableCell align="left">{h.completionDate ?
                                                new Date(h.completionDate).toISOString().split('T')[0]
                                                :
                                                <Button
                                                    variant="contained"
                                                    onClick={() => handleComplete(h.id)}
                                                >Complete</Button>
                                            }</TableCell>
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
