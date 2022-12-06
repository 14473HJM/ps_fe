import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Title1} from './../../common/title';
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from '@mui/material/CardActions';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {getSession, useSession} from "next-auth/react";
import {getToken} from "next-auth/jwt";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";

export function CodeLanguagesTable({ codeLanguages }) {
    const [rowEditable, setRowEditable] = React.useState(0);
    const [rowOnDelete, setRowOnDelete] = React.useState(0);
    const [openDialog, setOpenDialog] = React.useState(false);
    const { data: session, status } = useSession()
    const [cl, setCl] = React.useState(codeLanguages)

    console.log(session);

    const handleEdit = (event, id) => {
        event.preventDefault();
        setRowEditable(id);
    }

    const handleDelete = (event, id) => {
        event.preventDefault();
        setRowOnDelete(id);
        handleClickOpenDialog();
    }

    const handleConfirmationDelete = () => {

    }

    const handleSave = async (event, id, codeLanguage) => {
        event.preventDefault();
        console.log(codeLanguage);
        codeLanguage = await put(id, codeLanguage, session.user.access_token)
        setRowEditable(0);
        refreshContent();
    }

    const handleEditable = (id) => {
        if(id === rowEditable) {
            return true;
        } else {
            return false;
        }
    }

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const refreshContent = async () => {
        const response = await getCodeFrameworks(session.user.access_token);
        if(response) {
            setCl(response);
        }
    }

    const handleChangeRow = (id, event) => {
        event.preventDefault();
        let result = cl.map((c, id) => {
            return c.id == id ? {...c, name: event.target.value} : {...data}
        });
        setCl(result);
        console.log(cl);
        //rowValue = event.target.value;
    }

    return (
        <React.Fragment>
            <Box sx={{display: 'flex', mr: 10}}>
                <Typography component="h1" variant="h5" color="primary" gutterBottom mr={10}>
                    Code Language
                </Typography>
                <Fab color="success" aria-label="add" size="medium" sx={{mt: 0}}
                     onClick={() => {}}>
                    <AddIcon />
                </Fab>
            </Box>
            <Typography component="body1" variant="body1" color="info" gutterBottom mr={10}>
                Esta es la lista de diferentes lenguajes de programación que estarán disponibles como selección por parte de
                los estudiantes que desarrollan un nuevo proyecto.
            </Typography>
            <Table size="small" width={1}>
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell>Acción</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cl ? cl.map((row) =>
                        <TableRow key={row.id} selected={handleEditable(row.id)}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell contentEditable={handleEditable(row.id)} onChange={(e) => handleChangeRow(row.name, e)}>{row.name}</TableCell>
                            <TableCell contentEditable={handleEditable(row.id)}>{row.type}</TableCell>
                            <TableCell width={150}>
                                <Box sx={{ '& > :not(style)': { m: 1 }, display: 'inline' }}>
                                    {handleEditable(row.id) ?
                                        <Fab color="primary" aria-label="edit" size="small">
                                            <SaveIcon fontSize={"small"} onClick={(e) => handleSave(e, row.id, row)}/>
                                        </Fab>
                                        :
                                        <React.Fragment>
                                            <Fab color="primary" aria-label="edit" size="small">
                                                <EditIcon fontSize={"small"} onClick={(e) => handleEdit(e, row.id)}/>
                                            </Fab>
                                            <Fab color="error" aria-label="edit" size="small">
                                                <DeleteIcon fontSize={"small"} onClick={(e) => handleDelete(e, row.id)}/>
                                            </Fab>
                                        </React.Fragment>
                                    }
                                </Box>
                            </TableCell>
                        </TableRow>
                    ) : null
                    }
                </TableBody>
            </Table>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"¿Seguro que desea borrar esta configuración?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Esta acción hará que ya no este disponible esta opción para nuevos proyectos,
                        pero seguirá apareciendo en los proyectos que ya la tengan en uso.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <Button onClick={handleConfirmationDelete} autoFocus>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export async function put(id, codeLanguage, access_token) {
    if(access_token != null) {
        const options = {
            method: 'PUT',
            headers: {
                'accept': '*/*',
                'charset': 'UTF-8',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token,
            },
            body: JSON.stringify(codeLanguage),
        };
        // Fetch data from external API
        const res = await fetch(`http://localhost:8080/ps/config/code/languages/${id}`, options);
        console.log(res);
        codeLanguage = await res.json();
        // Pass data to the page via props
        console.log(codeLanguage);
        return {codeLanguage}
    } else {
        return {codeLanguage};
    }
}

export async function getCodeFrameworks(access_token) {

    if(access_token != null) {
        const options = {
            headers: {
                'accept': '*/*',
                'charset': 'UTF-8',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token,
            }
        };
        // Fetch data from external API
        const res = await fetch('http://localhost:8080/ps/config/code/languages', options);
        console.log(res);
        const codeLanguages = await res.json();
        // Pass data to the page via props
        console.log(codeLanguages);
        return {codeLanguages}
    } else {
        return null;
    }
}