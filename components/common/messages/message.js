import * as React from 'react';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {addTutor, moveProject, postProjectComment} from "../../../pages/api/projects/projectsApi";
import {useSession} from "next-auth/react";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export function MessageModalSimple({title, description, modalStatus, setModalStatus, project, setProject, action}) {

    const [openSnackbarOK, setOpenSnackbarOK] = React.useState(false);
    const [openSnackbarError, setOpenSnackbarError] = React.useState(false);
    const [message, setMessage] = React.useState();

    const { data: session, status } = useSession()
    const user = session.user;

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
    const handleCloseModal = (event) => {
        setModalStatus(false);
        console.log(event);
    }
    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    }
    const handleSubmitModal = async (event) => {
        event.preventDefault();
        console.log('USER: ', user);
        const comment = {
            commentator: {
                id: user.person.id,
                objectType: user.person.objectType,
                name: user.person.name,
                lastName: user.person.lastName,
                imageProfile: user.person.imageProfile},
            comment: message,
            createdDate: new Date(),
        };
        const response = await moveProject(session, project, comment, action);
        if (response && response.ok) {
            const p = await response.json();
            setProject(p);
        }
        if (response && response.ok) {
            handleOpenSnackbar("S")
        } else {
            handleOpenSnackbar("E")
        }
        handleCloseModal();
    }

    return(
        <React.Fragment>
            <Modal
                open={modalStatus}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h4" component="h2">
                        {title}
                    </Typography>
                    <Typography id="modal-modal-title" variant="body1">
                        {description}
                    </Typography>
                    <TextField
                        required
                        id="message"
                        name="message"
                        label="Mensaje"
                        fullWidth
                        autoComplete="message"
                        multiline
                        rows={3}
                        sx={{pt:2}}
                        onChange={handleMessageChange}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} >
                        <Button
                            variant="contained"
                            sx={{ mt: 3, ml: 1 }}
                            disabled={false}
                            color="error"
                            onClick={handleCloseModal}
                        >Cancelar</Button>
                        <Button
                            variant="contained"
                            sx={{ mt: 3, ml: 1 }}
                            type={"submit"}
                            onClick={handleSubmitModal}
                        >Guardar</Button>
                    </Box>
                </Box>
            </Modal>
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