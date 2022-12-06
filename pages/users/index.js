import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {getToken} from "next-auth/jwt";
import Avatar from "@mui/material/Avatar";
import LockResetIcon from '@mui/icons-material/LockReset';
import Fab from "@mui/material/Fab";

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    const handleChangePassword = () => {
        alert("Password cambiada.")
    }

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} key={row.id}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.userName}
                </TableCell>
                <TableCell>{row.createdDate}</TableCell>
                <TableCell>{row.lastUpdatedDate}</TableCell>
                <TableCell>{row.roles.concat()}</TableCell>
                <TableCell align={"center"}>
                    <Fab color="primary" aria-label="edit" size="small" >
                        <LockResetIcon fontSize={"medium"} onClick={(e) => handleChangePassword(e, row.id)}/>
                    </Fab>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                {row.person.objectType}
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell/>
                                        <TableCell>Nombre</TableCell>
                                        {row.person.personIdentification ?
                                            <TableCell>{row.person.personIdentification.identificationType}</TableCell>
                                            :
                                            null }
                                        {row.person.universityIdentification ?
                                            <TableCell>{row.person.universityIdentification.identificationType}</TableCell>
                                            :
                                            null }
                                        <TableCell>Estado</TableCell>
                                        <TableCell>Cumpleaños</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={row.person.id}>
                                        <TableCell><Avatar src={row.person.imageProfile} /></TableCell>
                                        <TableCell component="th" scope="row">{row.person.name + ' ' + row.person.lastName}</TableCell>
                                        {row.person.personIdentification ?
                                            <TableCell>{row.person.personIdentification.identification}</TableCell>
                                            :
                                            null }
                                        {row.person.universityIdentification ?
                                            <TableCell>{row.person.universityIdentification.identification}</TableCell>
                                            :
                                            null }
                                        <TableCell>{row.person.status}</TableCell>
                                        <TableCell>{row.person.birthday}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function Users({users}) {

    const [_users, setUsers] = React.useState(users);
    console.log(_users);
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>User Name</TableCell>
                        <TableCell>Fecha de Creación</TableCell>
                        <TableCell>Ultima Modificación</TableCell>
                        <TableCell>Roles</TableCell>
                        <TableCell align={"center"}>Resetear Password</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {_users.map((row) => (
                        <Row key={row.id} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

}

Users.auth = true;

export async function getServerSideProps(context) {

    const { req } = context;
    const token = await getToken({ req })
    if(token != null) {
        const {access_token} = token

        const options = {
            headers: {
                'accept': '*/*',
                'charset': 'UTF-8',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token,
            }
        };

        // Fetch data from external API
        const res = await fetch(`http://localhost:8080/ps/users`, options)
        const users = await res.json()
        // Pass data to the page via props
        return {props: {users}}
    } else {
        return {props: {}};
    }
}