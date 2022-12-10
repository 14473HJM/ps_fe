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
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import LoadingButton from '@mui/lab/LoadingButton';
import {getToken} from "next-auth/jwt";
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CancelIcon from '@mui/icons-material/Cancel';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import SendIcon from '@mui/icons-material/Send';
import Divider from "@mui/material/Divider";
import TextField from '@mui/material/TextField';
import usePost from '../../hooks/usePost';
import {cancelInvitation, putInvitation, resendInvitation} from "../api/invitation/invitationsApi";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Invitations(props) {

    const [rowEditable, setRowEditable] = React.useState(0);
    const [rowOnDelete, setRowOnDelete] = React.useState(0);
    const [rowOnResend, setRowOnResend] = React.useState(0);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [openResendDialog, setOpenResendDialog] = React.useState(false);
    const [openEditDialog, setOpenEditDialog] = React.useState(false);
    const [openInvitationDialog, setOpenInvitationDialog] = React.useState(false);
    const { data: session, status } = useSession();
    const [invitations, SetInvitations] = React.useState(props.invitations);
    const [invitationsFiltered, setInvitationsFiltered] = React.useState(props.invitations);
    const [invitationData, setInvitationData] = React.useState(null);
    const { data, error, loading } = usePost('/api/invitation', invitationData);
    const [openSnackbarOK, setOpenSnackbarOK] = React.useState(false);
    const [openSnackbarError, setOpenSnackbarError] = React.useState(false);

    const handleEdit = (event, row, index) => {
        event.preventDefault();
        setRowEditable(row);
        handleClickOpenEditDialog();
    }
    const handleDelete = (event, row, index) => {
        event.preventDefault();
        setRowOnDelete(row);
        handleClickOpenDialog();
    }
    const handleResend = (event, row, index) => {
        event.preventDefault();
        setRowOnResend(row);
        handleClickOpenResendDialog();
    }

    const handleConfirmationDelete = async (event) => {
        event.preventDefault();
        const response = await cancelInvitation(session, rowOnDelete.id);
        if (response && response.ok) {
            const row = await response.json();
            const index = getRowIndex(rowOnDelete);
            invitations[index] = row;
            SetInvitations(invitations);
            handleOpenSnackbar("S")
        } else {
            handleOpenSnackbar("E")
        }
        handleCloseDialog(event);
    }
    const handleConfirmationResend  = async (event) => {
        event.preventDefault();
        const response = await resendInvitation(session, rowOnResend.id);
        if (response && response.ok) {
            const row = await response.json();
            const index = getRowIndex(rowOnResend);
            invitations[index] = row;
            SetInvitations(invitations);
            handleOpenSnackbar("S")
        } else {
            handleOpenSnackbar("E")
        }
        handleCloseResendDialog(event);
    }
    const handleConfirmationEdit  = async (event) => {
        event.preventDefault();
        const response = await putInvitation(session, rowEditable);
        if (response && response.ok) {
            const row = await response.json();
            const index = getRowIndex(rowEditable);
            invitations[index] = row;
            SetInvitations(invitations);
            handleOpenSnackbar("S")
        } else {
            handleOpenSnackbar("E")
        }
        handleCloseEditDialog(event);
    }
    const handleChangeRow = (event) => {
        event.preventDefault();
        const value = event.target.value;
        const field = event.target.name;
        //modalRow[field] = value;
        setRowEditable({...rowEditable, [field]:value});
        console.log(rowEditable);
    }

    const handleOpenSnackbar = (t) => {
        if(t === "E") {
            setOpenSnackbarError(true);
        } else if (t === "S") {
            setOpenSnackbarOK(true);
        }
    };
    const handleCloseSnackbar = (event, reason, t) => {
        if(t === "E") {
            if (reason === 'clickaway') {
                return;
            }
            setOpenSnackbarError(false);
        } else if (t === "S") {
            if (reason === 'clickaway') {
                return;
            }
            setOpenSnackbarOK(false);
        }
    };

    const handleOpenInvitationDialog = () => {
        setOpenInvitationDialog(true);
    };
    const handleCloseInvitationDialog = () => {
        setOpenInvitationDialog(false);
    };
    const handleSendInvitation = (e) => {
        e.preventDefault();
        const {
            legajo: { value: legajo },
            email: { value: email },
        } = e.target;
        setInvitationData({
            legajo,
            email,
        });
    }
    React.useEffect(() => {
        setInvitationData(null);
        setOpenInvitationDialog(false);
        if (data) {
            SetInvitations([
                ...invitations,
                data,
            ])
        }
    }, [data, error]);

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleClickOpenResendDialog = () => {
        setOpenResendDialog(true);
    };
    const handleCloseResendDialog = () => {
        setOpenResendDialog(false);
    };

    const handleClickOpenEditDialog = () => {
        setOpenEditDialog(true);
    };
    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
    };
    const handleIcons = (status) => {
        // console.log(status);
        if(status === 'ACTIVE') {
            return (<Fab color="success" variant="extended" size="small" aria-label="add">
                    <CheckIcon sx={{ mr: 1 }} />ACTIVO
                    </Fab>);
        } else if (status === 'USED') {
            return (<Fab variant="extended" size="small" color="info" aria-label="add">
                    <DoneAllIcon sx={{ mr: 1 }} />USADO
                    </Fab>);
        } else if(status === 'CANCELED') {
            return (<Fab variant="extended" size="small" color="error" aria-label="add">
                    <CancelIcon sx={{ mr: 1 }} />CANCELADO
                    </Fab>);
        } else if (status === 'OVERDUE') {
            return (<Fab variant="extended" size="small" color="warning" aria-label="add">
                    <EventBusyIcon sx={{ mr: 1 }} />VENCIDO
                    </Fab>);
        } else {
            return null;
        }
    }

    const filterData = (filter) => {
        if (!filter) {
            return setInvitationsFiltered(invitations);
        } else {
            return setInvitationsFiltered(invitations.filter(
                (i) => i.invitationStatus.toLowerCase().includes(filter) ||
                    i.email.toLowerCase().includes(filter) ||
                    i.id.toString().toLowerCase().includes(filter) ||
                    i.legajo.toString().toLowerCase().includes(filter) ||
                    i.dueDateTime.toLowerCase().includes(filter)
            ));
        }
    };

    const getRowIndex = (row) => {
        //return invitations.find(r => r.id == row.id).index;
        return invitations.indexOf(row);
    }

    return (
        <React.Fragment>
            <Box sx={{display: 'flex', mr: 10, mb:3}}>
                <Typography component="h1" variant="h5" color="primary" gutterBottom mr={10}>
                    Invitaciones
                </Typography>
                <Fab color="success" aria-label="add" size="medium" sx={{mt: -1.5}}
                        onClick={handleOpenInvitationDialog}>
                    <AddIcon />
                </Fab>
                <TextField
                    id="search-bar"
                    className="text"
                    onChange={(e) => {
                        filterData(e.target.value.toLowerCase());
                    }}
                    label="Ingresar algun valor de busqueda"
                    variant="outlined"
                    placeholder="Search..."
                    size="small"
                    sx={{ml: 10, width: 500}}
                />
                <IconButton aria-label="search" disabled={true}>
                    <SearchIcon style={{ fill: "blue" }} />
                </IconButton>
            </Box>
            <Divider />
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {/*<TableCell>Id</TableCell>*/}
                        <TableCell>Legajo</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell>Vencimiento</TableCell>
                        <TableCell  align={'center'}>Cantidad de envios</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {invitationsFiltered.map((row, index) =>
                        <TableRow key={row.id}>
                            {/*<TableCell>{row.id}</TableCell>*/}
                            <TableCell>{row.legajo}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>
                                {handleIcons(row.invitationStatus)}
                            </TableCell>
                            <TableCell>{row.dueDateTime}</TableCell>
                            <TableCell align={'center'}>{row.numberOfDeliveries}</TableCell>
                            <TableCell width={250}>
                                <Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'inline' }}>
                                    {row.invitationStatus == 'ACTIVE' ?
                                        <React.Fragment>
                                            <Fab color="primary" aria-label="edit" size="small" >
                                                <EditIcon fontSize={"small"} onClick={(e) => handleEdit(e, row)}/>
                                            </Fab>
                                            <Fab color="error" aria-label="edit" size="small">
                                                <CancelIcon fontSize={"small"} onClick={(e) => handleDelete(e, row)}/>
                                            </Fab>
                                            <Fab color="info" aria-label="edit" size="small">
                                                <SendIcon fontSize={"small"} onClick={(e) => handleResend(e, row)}/>
                                            </Fab>
                                        </React.Fragment>
                                     : null
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
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title" align={'center'}>
                    {"¿Seguro que quiere cancelar la invitación?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" variant={'h6'}>
                        Legajo: {rowOnDelete.legajo}
                        <br/>
                        Email: {rowOnDelete.email}
                        <br/>
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description" sx={{mt: 2, color: 'error.main'}}>
                        Esta acción no tiene vuelta atras y hará que que la invitación ya no pueda usarse.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="error">Cancelar</Button>
                    <Button onClick={handleConfirmationDelete} autoFocus>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                <DialogTitle>Editar invitación</DialogTitle>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="legajo"
                            label="Legajo"
                            name="legajo"
                            type="legajo"
                            fullWidth
                            variant="standard"
                            onChange={handleChangeRow}
                            value={rowEditable.legajo}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Dirección de email"
                            name="email"
                            type="email"
                            fullWidth
                            variant="standard"
                            onChange={handleChangeRow}
                            value={rowEditable.email}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseEditDialog}>Cancelar</Button>
                        <Button onClick={handleConfirmationEdit} autoFocus>
                            Confirmar
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
            <Dialog
                open={openResendDialog}
                onClose={handleCloseResendDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title" align={'center'}>
                    {"¿Seguro que quiere reenviar la invitación?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" variant={'h6'}>
                        Legajo: {rowOnResend.legajo}
                        <br/>
                        Email: {rowOnResend.email}
                        <br/>
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description" sx={{mt: 2}}>
                        Esta acción NO genera un invitación nueva, solo reenvia la invitación original si la misma aun esta activa.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseResendDialog} color="error">Cancelar</Button>
                    <Button onClick={handleConfirmationResend} autoFocus>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openInvitationDialog} onClose={handleCloseInvitationDialog}>
                <DialogTitle>Enviar invitación</DialogTitle>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSendInvitation}
               >
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="legajo"
                        label="Legajo"
                        name="legajo"
                        type="legajo"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Dirección de email"
                        name="email"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseInvitationDialog}>Cancelar</Button>
                    <LoadingButton loading={loading} type="submit">Enviar</LoadingButton>
                </DialogActions>
                </Box> 
            </Dialog>
            <Snackbar
                open={openSnackbarOK}
                autoHideDuration={6000}
                onClose={(e, r) => handleCloseSnackbar(e, r, 'S')}
                anchorOrigin={{vertical: 'bottom', horizontal: 'bottom'}}
            >
                <Alert onClose={(e, r) => handleCloseSnackbar(e, r, 'S')} severity="success" sx={{ width: '100%' }}>
                    Operación realizada con exito!
                </Alert>
            </Snackbar>
            <Snackbar
                open={openSnackbarError}
                autoHideDuration={6000}
                onClose={(e, r) => handleCloseSnackbar(e, r, 'E')}
                anchorOrigin={{vertical: 'bottom', horizontal: 'bottom'}}
            >
                <Alert onClose={(e, r) => handleCloseSnackbar(e, r, 'E')} severity="error" sx={{ width: '100%' }}>
                    Hubo un error al procesar la operación
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}

Invitations.auth = true;

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
        const res = await fetch('http://localhost:8080/ps/invitations', options);
        // console.log(res);
        const invitations = await res.json();
        // Pass data to the page via props
        // console.log(invitations);
        return {props: {invitations}}
    } else {
        return {props: {_project: {}}};
    }
}
