import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import {getContactCard, getSocialNetworkCard} from "../../components/people/contact";
import Modal from "@mui/material/Modal";

export default function ContactInformation(props) {

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

    const { student, setStudent, handleNext, handleBack } = props;
    const [formValidation, setFormValidation] = React.useState(false);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [contactType, setContactType] = React.useState(null);
    const [contactContext, setContactContext] = React.useState(null);
    const [contactValue, setContactValue] = React.useState(null);
    const [modalValidation, setModalValidation] = React.useState(false);

    const handleChangeType = (event) => {
        setContactContext(event.target.value);
        validateModal();
    };

    const handleChangeMedia = (event) => {
        setContactType(event.target.value);
        validateModal();
    };

    const handleChangeValue = (event) => {
        event.preventDefault();
        if(!event.target.value && !event.target.value.trim().length) {

        } else {
            setContactValue(event.target.value);
        }
        validateModal();
    };

    const handleSubmitModal = (event) => {
        if(contactContext === 'SN') {
            const socialNetwork = {
                internetPlatform: contactType,
                profileName: contactValue
            };
            setContact(socialNetwork, contactContext);
        } else {
            const contact = {
                contactType: contactType,
                value: contactValue
            };
            setContact(contact, contactContext);
        }
        handleCloseModal();
    }

    const validateModal = () => {
        if(contactType != null && contactContext != null && contactValue != null) {
            setModalValidation(true);
        } else {
            setModalValidation(false);
        }
    }

    const handleOpenModal = (context) => {
        setModalOpen(true);
    };
    const handleCloseModal = () => {
        setContactContext(null);
        setContactType(null);
        setContactValue(null);
        validateModal();
        setModalOpen(false);
        handleChangeForm();
    };


    const setContact = (contact, contactContext) => {
        if(contactContext === 'SN') {
            if (contact.internetPlatform != null && contact.profileName != null) {
                        student.socialNetworks.push(contact);
                        setStudent(student);
            }
        } else {
            if (contact.contactType != null && contact.value != null) {
                switch (contactContext) {
                    case 'P':
                        student.personalContacts.push(contact);
                        setStudent(student);
                        break;
                    case 'U':
                        student.universityContacts.push(contact);
                        setStudent(student);
                        break;
                    default:
                        throw new Error('Unknown contact information');
                }
            }
        }
    };

    const handleChangeForm = () => {
        let anyPersonal = false;
        let anyUniversity = false;
        if(student.personalContacts != null &&
            student.personalContacts.length > 0 &&
            student.universityContacts &&
            student.universityContacts.length > 0) {

            student.personalContacts.map(
                (contact) => {
                    if(contact.contactType === 'PHONE') {
                        anyPersonal = true;
                    }
                });
            student.universityContacts.map(
                (contact) => {
                    if(contact.contactType === 'EMAIL') {
                        anyUniversity = true;
                    }
                });
            if(anyPersonal && anyUniversity) {
                setFormValidation(true);
            }
        } else {
            setFormValidation(false);
        }
    }

    return (
        <React.Fragment>
            <Box component="form"
                 onSubmit={handleNext}
                 noValidate sx={{ mt: 1 }}
                 onChange={handleChangeForm}
                 onLoad={handleChangeForm}
            >
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} sm={10} >
                        <Typography variant="h4" gutterBottom>
                            Ingresá tu información de contacto
                        </Typography>
                    </Grid>
                    <Grid items xs={12} sm={2} >
                        <Fab color="success" aria-label="add" size="medium"
                             onClick={handleOpenModal}>
                            <AddIcon />
                        </Fab>
                    </Grid>
                </Grid>
                <br/>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} sm={12} >
                        <Typography variant="h6" gutterBottom>
                            Tus datos de contacto personales
                        </Typography>
                    </Grid>
                    <Grid items xs={12} sm={12} ml={3}>
                        {student.personalContacts.map((contact) => (getContactCard(contact)))}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" gutterBottom>
                            Tus datos de contacto universitarios
                        </Typography>
                    </Grid>
                    <Grid items xs={12} sm={12} ml={3}>
                        {student.universityContacts.map((contact) => (getContactCard(contact)))}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" gutterBottom>
                            Tus datos en redes sociales
                        </Typography>
                    </Grid>
                    <Grid items xs={12} sm={12} ml={3}>
                        {student.socialNetworks.map((socialNetwork) => (getSocialNetworkCard(socialNetwork)))}
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} >
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Back
                    </Button>

                    <Button
                        variant="contained"
                        sx={{ mt: 3, ml: 1 }}
                        disabled={!formValidation}
                        type={"submit"}
                    >Siguiente</Button>
                </Box>
            </Box>
            <Modal
                open={modalOpen}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h4" component="h2">
                        Configurá un medio de contacto
                    </Typography>
                    <Grid item xs={12} sm={12} m={2}>
                        <Typography id="label" component="p">
                            Tipo de contacto
                        </Typography>
                        <Select
                            required
                            labelId="contactType-select"
                            id="contactType-select"
                            onChange={handleChangeType}
                            fullWidth
                        >
                            <MenuItem value="P">Contacto Personal</MenuItem>
                            <MenuItem value="U">Contacto Universitario</MenuItem>
                            <MenuItem value="SN">Red Social</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={12} m={2}>
                        <Typography id="label" component="p">
                            Medio de contacto
                        </Typography>
                        { contactContext === 'SN' ? (
                            <Select
                                required
                                labelId="contactType-select"
                                id="contactType-select"
                                onChange={handleChangeMedia}
                                disabled={!contactContext? true : false}
                                fullWidth
                            >
                                <MenuItem value="LINKEDIN">LinkedIn</MenuItem>
                                <MenuItem value="FACEBOOK">Facebook</MenuItem>
                                <MenuItem value="INSTAGRAM">Instagram</MenuItem>
                                <MenuItem value="TWITTER">Tweeter</MenuItem>
                                <MenuItem value="YOUTUBE">Youtube</MenuItem>
                            </Select>
                            ) : (
                            <Select
                                required
                                labelId="contactType-select"
                                id="contactType-select"
                                onChange={handleChangeMedia}
                                disabled={!contactContext? true : false}
                                fullWidth
                            >
                                <MenuItem value="EMAIL">E-mail</MenuItem>
                                <MenuItem value="PHONE">Télefono</MenuItem>
                            </Select>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={12} m={2}>
                        <TextField
                            required
                            id="value"
                            name="value"
                            label={
                                contactContext === 'SN'? 'Nombre del perfil' :
                                    contactType === 'EMAIL'? "Email" :
                                        !contactType? null: "Número de teléfono"
                            }
                            fullWidth
                            disabled={!contactType? true : false}
                            autoComplete="value"
                            variant="standard"
                            onChange={handleChangeValue}
                        />
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} >
                        <Button
                            variant="contained"
                            sx={{ mt: 3, ml: 1 }}
                            disabled={!modalValidation}
                            type={"submit"}
                            onClick={handleSubmitModal}
                        >Guardar</Button>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    );
}