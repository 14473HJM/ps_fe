import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {getSession, useSession} from "next-auth/react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";

export function PlatformsTable({ platforms }) {
    const [rowEditable, setRowEditable] = React.useState(0);
    const [rowOnDelete, setRowOnDelete] = React.useState(0);
    const [openDialog, setOpenDialog] = React.useState(false);
    const { data: session, status } = useSession()
    const [ _platforms, setPlatforms] = React.useState(platforms)

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

    const handleSave = async (event, id, platform) => {
        event.preventDefault();
        console.log(codeLanguage);
        platform = await put(id, platform, session.user.access_token)
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
        const response = await get(session.user.access_token);
        if(response) {
            setPlatforms(response);
        }
    }

    const handleChangeRow = (id, event) => {
        event.preventDefault();
        let result = _platforms.map((p, id) => {
            return p.id == id ? {...p, name: event.target.value} : {...data}
        });
        setPlatforms(result);
        console.log(_platforms);
        //rowValue = event.target.value;
    }

    return (
        <React.Fragment>
            <Box sx={{display: 'flex', mr: 10}}>
                <Typography component="h1" variant="h5" color="primary" gutterBottom mr={10}>
                    Platforms
                </Typography>
                <Fab color="success" aria-label="add" size="medium" sx={{mt: 0}}
                     onClick={() => {}}>
                    <AddIcon />
                </Fab>
            </Box>
            <Typography component="body1" variant="body1" color="info" gutterBottom mr={10}>
                Esta es la lista de plataformas de ejecución que estarán disponibles como selección por parte de
                los estudiantes que desarrollan un nuevo proyecto (Ej: LOCAL, AWS, GCP, etc)
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
                    {_platforms ? _platforms.map((row) =>
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

export async function put(id, platform, access_token) {
    if(access_token != null) {
        const options = {
            method: 'PUT',
            headers: {
                'accept': '*/*',
                'charset': 'UTF-8',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token,
            },
            body: JSON.stringify(platform),
        };
        // Fetch data from external API
        const res = await fetch(`http://localhost:8080/ps/config/platforms/${id}`, options);
        console.log(res);
        platform = await res.json();
        // Pass data to the page via props
        console.log(platform);
        return {platform}
    } else {
        return {platform};
    }
}

export async function get(access_token) {

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
        const res = await fetch('http://localhost:8080/ps/config/platforms', options);
        console.log(res);
        const platforms = await res.json();
        // Pass data to the page via props
        console.log(platforms);
        return {platforms}
    } else {
        return null;
    }
}