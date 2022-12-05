import * as React from "react";
import {useSession} from "next-auth/react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {getCodeFrameworks, put} from "../../components/config/code-frameworks";
import {getToken} from "next-auth/jwt";
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CancelIcon from '@mui/icons-material/Cancel';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import SendIcon from '@mui/icons-material/Send';
import Divider from "@mui/material/Divider";


export default function Invitations(props) {
    const [rowEditable, setRowEditable] = React.useState(0);
    const [rowOnDelete, setRowOnDelete] = React.useState(0);
    const [openDialog, setOpenDialog] = React.useState(false);
    const { data: session, status } = useSession();
    const [invitations, SetInvitations] = React.useState(props.invitations);

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
    }

    const handleChangeRow = (id, event) => {
        event.preventDefault();
    }

    const handleIcons = (status) => {
        console.log(status);
        if(status === 'ACTIVE') {
            return (<Fab color="success" variant="extended" size="small" aria-label="add">
                    <CheckIcon sx={{ mr: 1 }} />{status}
                    </Fab>);
        } else if (status === 'USED') {
            return (<Fab variant="extended" size="small" color="info" aria-label="add">
                    <DoneAllIcon sx={{ mr: 1 }} />{status}
                    </Fab>);
        } else if(status === 'CANCELED') {
            return (<Fab variant="extended" size="small" color="error" aria-label="add">
                    <CancelIcon sx={{ mr: 1 }} />{status}
                    </Fab>);
        } else if (status === 'OVERDUE') {
            return (<Fab variant="extended" size="small" color="warning" aria-label="add">
                    <EventBusyIcon sx={{ mr: 1 }} />{status}
                    </Fab>);
        } else {
            return null;
        }
    }

    return (
        <React.Fragment>
            <Box sx={{display: 'flex', mr: 10, mb:3}}>
                <Typography component="h1" variant="h5" color="primary" gutterBottom mr={10}>
                    Invitaciones
                </Typography>
                <Fab color="success" aria-label="add" size="medium" sx={{mt: 0,}}
                     onClick={() => {}}>
                    <AddIcon />
                </Fab>
            </Box>
            <Divider />
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Legajo</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell>Vencimiento</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {invitations.map((row) =>
                        <TableRow key={row.id} selected={handleEditable(row.id)}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell contentEditable={handleEditable(row.id)} onChange={(e) => handleChangeRow(row.legajo, e)}>{row.legajo}</TableCell>
                            <TableCell contentEditable={handleEditable(row.id)}>{row.email}</TableCell>
                            <TableCell>
                                {handleIcons(row.invitationStatus)}
                            </TableCell>
                            <TableCell>{row.dueDateTime}</TableCell>
                            <TableCell width={250}>
                                <Box sx={{ '& > :not(style)': { m: 1 }, display: 'inline' }}>
                                    {handleEditable(row.id) ?
                                        <Fab color="primary" aria-label="edit" size="small">
                                            <SaveIcon fontSize={"small"} onClick={(e) => handleSave(e, row.id, row)}/>
                                        </Fab>
                                        :
                                        <React.Fragment>
                                            <Fab color="primary" aria-label="edit" size="small" >
                                                <EditIcon fontSize={"small"} onClick={(e) => handleEdit(e, row.id)}/>
                                            </Fab>
                                            <Fab color="error" aria-label="edit" size="small">
                                                <CancelIcon fontSize={"small"} onClick={(e) => handleDelete(e, row.id)}/>
                                            </Fab>
                                            <Fab color="info" aria-label="edit" size="small">
                                                <SendIcon fontSize={"small"} onClick={(e) => handleDelete(e, row.id)}/>
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

Invitations.auth = true;

export async function getServerSideProps(context) {

    const { req } = context;
    console.log(context);
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
        const res = await fetch('http://localhost:8080/ps/invitations', options);
        console.log(res);
        const invitations = await res.json();
        // Pass data to the page via props
        console.log(invitations);
        return {props: {invitations}}
    } else {
        return {props: {_project: {}}};
    }
}
