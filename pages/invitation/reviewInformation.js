import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from "@mui/material/TextField";
import usePost from '../../hooks/usePost';

const regexp_password = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/";

export default function Review(props) {

    const student = props.student;
    const [user, setUser] = React.useState({
        userName: props.legajo,
        password: null,
    });
    const [formValidation, setFormValidation] = React.useState(false);
    const [body, setBody] = React.useState(null);
    const { data, error, loading } = usePost('/api/students', body);

    const handleNext = props.handleNext;
    const handleBack = props.handleBack;

    const handlePassword = (event) => {
        event.preventDefault();
        if(event.target.value && event.target.value.length > 6) {
            setUser({
                ...user,
                password: event.target.value,
            })
        }
        handleChangeForm();
    };

    const handleChangeForm = () => {
        if(user.password != null) {
            setFormValidation(true);
        } else {
            setFormValidation(false);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        setBody({
            ...student,
            user,
        });
    }

    React.useEffect(() => {
        setBody(null);
        if (data) {
            console.log(data);
            handleNext();
        };
        if (error) {
            alert('Algo malir sal');
            console.log(error)
        };
    }, [data, error]);

    return (
        <React.Fragment>
            <Box component="form"
                onSubmit={handleSubmit}
                noValidate sx={{ mt: 1 }}
            >
                <Typography variant="h3" gutterBottom>
                    Detalle del alta
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Por favor revise atentamente sus datos antes de enviar el formulario.
                </Typography>
            <Grid container spacing={2}>
                {/** INFORMACION PERSONAL */}
                <Grid item xs={12} sm={12} border={0.5} borderRadius={2} borderColor="gray" mt={2}>
                    <Grid item xs={12} sm={12}>
                        <Typography variant="h4" gutterBottom sx={{ mt: 0 }}>
                            Información Personal
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Typography gutterBottom variant="h6">{student.name + ' ' + student.lastName}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography gutterBottom variant="h6">{student.personIdentification.identificationType +
                            ': ' + student.personIdentification.identification}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography gutterBottom variant="h6">Fecha de Nacimiento: {student.birthday}</Typography>
                    </Grid>
                </Grid>
                {/** INFORMACION Universitria */}
                <Grid item xs={12} sm={12} border={0.5} borderRadius={2} borderColor="gray" mt={2}>
                    <Grid item xs={12} sm={12}>
                        <Typography variant="h4" gutterBottom sx={{ mt: 0 }}>
                            Información Universitaria
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Typography gutterBottom variant="h6">{student.universityIdentification.identificationType +
                            ': ' + student.universityIdentification.identification}</Typography>
                    </Grid>
                    {student.universityContacts.map((contact) => getContactInfo(contact))}
                </Grid>
                {/** INFORMACION Address */}
                <Grid item xs={12} sm={12} border={0.5} borderRadius={2} borderColor="gray" mt={2}>
                    <Grid item xs={12} sm={12}>
                        <Typography variant="h4" gutterBottom sx={{ mt: 0 }}>
                            Información de tu domicilio
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Typography gutterBottom variant="h6">{student.address.street} {student.address.streetNumber}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Typography gutterBottom variant="h6">{student.address.city} - {student.address.zipCode} - {student.address.province} - {student.address.country}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Typography gutterBottom variant="h6">{student.address.detail}</Typography>
                    </Grid>
                </Grid>
                {/** INFORMACION CONTACTO */}
                <Grid item xs={12} sm={12} border={0.5} borderRadius={2} borderColor="gray" mt={2}>
                    <Grid item xs={12} sm={12}>
                        <Typography variant="h4" gutterBottom sx={{ mt: 0 }}>
                            Información de contacto
                        </Typography>
                    </Grid>
                    {student.personalContacts.map((contact) => getContactInfo(contact))}
                    {student.socialNetworks.map((socialNetwork) => getSocialNetworkInfo(socialNetwork))}
                </Grid>
                <Grid item xs={12} sm={12} mt={2}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 0 }}>
                        Elegí tu password
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} mt={2}>
                    <TextField
                        required
                        id="password"
                        name="password"
                        label="Password"
                        fullWidth
                        autoComplete="value"
                        variant="standard"
                        type="password"
                        onChange={handlePassword}
                    />
                </Grid>
            </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} >
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Back
                    </Button>

                    <Button
                        variant="contained"
                        sx={{ mt: 3, ml: 1 }}
                        type={"submit"}
                        disabled={!formValidation}
                    >Enviar Datos</Button>
                </Box>
            </Box>
        </React.Fragment>
    );
}

export function getContactInfo(contact) {
    let title = "Others";
    switch (contact.contactType) {
        case 'EMAIL':
            title = "Email";
            break;
        case 'CELLPHONE':
            title = "Celular";
            break;
        case 'PHONE':
            title = "Teléfono";
            break;
        default:
            title = "Others";
            break;
    }
    return(
        <Grid item xs={12} sm={12}>
            <Typography gutterBottom variant="h6">{title}: {contact.value}</Typography>
        </Grid>
    );
}

function getSocialNetworkInfo(socialNetwork) {
    let title = "Others";
    switch (socialNetwork.internetPlatform) {
        case 'LINKEDIN':
            title = "LinkedIn";
            break;
        case 'FACEBOOK':
            title = "Facebook";
            break;
        case 'INSTAGRAM':
            title = "Instagram";
            break;
        case 'TWITTER':
            title = "Twitter";
            break;
        case 'YOUTUBE':
            title = "Youtube";
            break;
        default:
            title = "Otros";
            break;
    }
    return(
        <Grid item xs={12} sm={12}>
            <Typography gutterBottom variant="h6">{title}: {socialNetwork.profileName}</Typography>
        </Grid>
    );
}
