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
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

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
                <TableCell><Avatar src={row.person.imageProfile} /></TableCell>
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
                                {row.person.name + ' ' + row.person.lastName}
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Tipo Usuario</TableCell>
                                        {row.person.personalContacts ?
                                        <TableCell>Contactos Personales</TableCell>
                                            : null }
                                        {row.person.universityContacts ?
                                        <TableCell>Contactos Universitarios</TableCell>
                                            : null }
                                        {row.person.personIdentification ?
                                            <TableCell>{row.person.personIdentification.identificationType}</TableCell>
                                            :
                                            null }
                                        {row.person.universityIdentification ?
                                            <TableCell>{row.person.universityIdentification.identificationType}</TableCell>
                                            :
                                            null }
                                        <TableCell>Ciudad</TableCell>
                                        <TableCell>Estado</TableCell>
                                        <TableCell>Fecha de Nacimiento</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={row.person.id}>
                                        <TableCell component="th" scope="row">{row.person.objectType}</TableCell>
                                        {row.person.personalContacts ?
                                        <TableCell component="th" scope="row">
                                            {
                                                row.person.personalContacts.map(c =>
                                                    <Typography variant="body22" key={c.id}>
                                                        <pre style={{ fontFamily: 'inherit' }}>
                                                        {c.contactType + ': ' + c.value}
                                                        </pre>
                                                    </Typography>
                                                )
                                            }
                                        </TableCell>
                                            : null }
                                        {row.person.universityContacts ?
                                        <TableCell component="th" scope="row">
                                            {
                                                row.person.universityContacts.map(c =>
                                                    <Typography variant="body22" key={c.id}>
                                                        <pre style={{ fontFamily: 'inherit' }}>
                                                        {c.contactType + ': ' + c.value}
                                                        </pre>
                                                    </Typography>
                                                )
                                            }
                                        </TableCell>
                                            : null }
                                        {row.person.personIdentification ?
                                            <TableCell>{row.person.personIdentification.identification}</TableCell>
                                            :
                                            null }
                                        {row.person.universityIdentification ?
                                            <TableCell>{row.person.universityIdentification.identification}</TableCell>
                                            :
                                            null }
                                        <TableCell>{row.person.address.city}</TableCell>
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
    const [filteredUsers, setFilteredUsers] = React.useState(_users);

    const filterData = (filter) => {
        if (!filter) {
            return setFilteredUsers(_users);
        } else {
            return setFilteredUsers(_users.filter(
                (u) => u.userName.toLowerCase().includes(filter) ||
                    u.createdDate.toLowerCase().includes(filter) ||
                    u.roles.toString().toLowerCase().includes(filter) ||
                    u.person.name.toString().toLowerCase().includes(filter) ||
                    u.person.lastName.toLowerCase().includes(filter) ||
                    u.person.personIdentification.identification.toString().toLowerCase().includes(filter) ||
                    u.person.universityIdentification.identification.toString().toLowerCase().includes(filter)
            ));
        }
        console.log(filteredUsers);
    };

    return (
        <React.Fragment>
            <Box sx={{display: 'flex', mr: 10, mb:3}}>
                <Typography component="h1" variant="h5" color="primary" gutterBottom mr={10}>
                    Usuarios
                </Typography>
                <TextField
                    id="search-bar"
                    className="text"
                    onChange={(e) => {
                        filterData(e.target.value.toLowerCase());
                    }}
                    label="Ingresar algun valor de busqueda"
                    variant="outlined"
                    placeholder="Buscar..."
                    size="small"
                    sx={{ml: 10, width: 500}}
                />
                <IconButton aria-label="search" disabled={true}>
                    <SearchIcon style={{ fill: "blue" }} />
                </IconButton>
            </Box>
            <Divider />
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell />
                            <TableCell>User Name</TableCell>
                            <TableCell>Fecha de Creación</TableCell>
                            <TableCell>Ultima Modificación</TableCell>
                            <TableCell>Roles</TableCell>
                            <TableCell align={"center"}>Resetear Password</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.map((row) => (
                            <Row key={row.id} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
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