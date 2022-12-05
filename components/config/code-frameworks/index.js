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
import EditIcon from '@mui/icons-material/Edit';
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

export function CodeFrameworksTable({ codeFrameworks }) {
    const [rowEditable, setRowEditable] = React.useState(0);
    const [rowOnDelete, setRowOnDelete] = React.useState(0);
    const [openDialog, setOpenDialog] = React.useState(false);
    const { data: session, status } = useSession()
    const [cf, setCf] = React.useState(codeFrameworks)

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

     const handleSave = async (event, id, codeFramework) => {
        event.preventDefault();
        console.log(codeFramework);
        codeFramework = await put(id, codeFramework, session.user.access_token)
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
            setCf(response);
        }
    }

    const handleChangeRow = (id, event) => {
        event.preventDefault();
        let result = cf.map((c, id) => {
           return c.id == id ? {...c, name: event.target.value} : {...data}
        });
        setCf(result);
        console.log(cf);
        //rowValue = event.target.value;
    }

    return (
        <React.Fragment>
            <Box sx={{display: 'flex', mr: 10}}>
                <Typography component="h1" variant="h5" color="primary" gutterBottom mr={10}>
                    Code Framework
                </Typography>
                <Fab color="success" aria-label="add" size="medium" sx={{mt: 0,}}
                     onClick={() => {}}>
                    <AddIcon />
                </Fab>
            </Box>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell>Descripción</TableCell>
                        <TableCell>Acción</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cf.map((row) =>
                        <TableRow key={row.id} selected={handleEditable(row.id)}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell contentEditable={handleEditable(row.id)} onChange={(e) => handleChangeRow(row.name, e)}>{row.name}</TableCell>
                            <TableCell contentEditable={handleEditable(row.id)}>{row.type}</TableCell>
                            <TableCell contentEditable={handleEditable(row.id)}>{row.description}</TableCell>
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
                    )}
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

export function CodeFrameworksCard({codeFramework}) {
    console.log(codeFramework);
    console.log({codeFramework})
    return(
        <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
            <CardMedia
                component="img"
                sx={{
                    16:9,
                    pt: '0%',
                    flexGrow: 2
                }}
                image={codeFramework.imageLink}
                alt={codeFramework.name}
            />
            <CardContent sx={{
                flexGrow: 1
            }}>
                <Typography gutterBottom variant="h5" component="h2">
                    {codeFramework.name}
                </Typography>
                <Typography>
                    {codeFramework.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">View</Button>
                <Button size="small">Edit</Button>
            </CardActions>
        </Card>
    );
}

export function CodeFrameworksCardList({codeFrameworks}) {
    console.log(codeFrameworks);
    if (codeFrameworks && codeFrameworks.length) {
        console.log("Entre enla renderizacion")
        return (
            <Container sx={{py: 8}} maxWidth="md">
                {/* End hero unit */}
                <Grid container spacing={1}>
                    {codeFrameworks.map((codeFramework) => (
                        <Grid item key={codeFramework.id} xs={12} sm={6} md={6}>
                            <CodeFrameworksCard codeFramework={codeFramework}/>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        );
    } else {
        return null;
    }
}

export async function put(id, codeFramework, access_token) {
    if(access_token != null) {
        const options = {
            method: 'PUT',
            headers: {
                'accept': '*/*',
                'charset': 'UTF-8',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token,
            },
            body: JSON.stringify(codeFramework),
        };
        // Fetch data from external API
        const res = await fetch(`http://localhost:8080/ps/config/code/frameworks/${id}`, options);
        console.log(res);
        codeFramework = await res.json();
        // Pass data to the page via props
        console.log(codeFramework);
        return {codeFramework}
    } else {
        return {codeFramework};
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
        const res = await fetch('http://localhost:8080/ps/config/code/frameworks', options);
        console.log(res);
        const codeFrameworks = await res.json();
        // Pass data to the page via props
        console.log(codeFrameworks);
        return {codeFrameworks}
    } else {
        return null;
    }
}