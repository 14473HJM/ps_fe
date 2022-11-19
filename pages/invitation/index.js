import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from "../../components/people/address";
import ContactForm from "../../components/people/contact";
import {StickyFooterWhite} from "../../components/brand/stickyFooter";
import {useRouter} from "next/router";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import {useSession} from "next-auth/react";
import PersonalInformation from "./personalInformation";
import AddressInformation from "./addressInformation";
import ContactInformation from "./contactInformation";


const steps = ['Información Personal', 'Domicilio', 'Información de Contacto', 'Enviar Pedido'];

const studentMock = {
    name: "Hernán Jesús",
    lastName: "Morais",
    personIdentification: {
        identificationType: "DNI",
        identification: "30633672"
    },
    address: {
        street: "Herrera y Guzmán",
        streetNumber: "966",
        zipCode: "5008",
        detail: "entre Rodriguez de Ruescas y Gaspar de Quevedo",
        city: "CORDOBA",
        province: "Córdoba",
        country: "Argentina"
        },
    birthday: "15/09/1984",
    personalContacts: [
        {
            contactType: "EMAIL",
            value: "hernanjesusmorais@hotmail.com"
        },
        {
            contactType: "CELLPHONE",
            value: "+543516222059"
        }
    ],
    socialNetworks: [
        {
            internetPlatform: "LINKEDIN",
            profileName: "hjmorais"
        }
    ],
    universityIdentification: {
        identificationType: "LEGAJO",
        identification: "104473"
    },
    universityContacts: [
        {
            contactType: "EMAIL",
            value: "104473@tecnicatura.frc.utn.edu.ar"
        }
    ]
}

function getStepContent(props) {
    const step = props.step;
    switch (step) {
        case 0:
            return <PersonalInformation {...props} />;
        case 1:
            return <AddressInformation {...props} />;
        case 2:
            return <ContactInformation {...props}/>;
        case 3:
            return <Review {...props} />;
        default:
            throw new Error('Unknown step');
    }
}

const theme = createTheme();

export default function CreateAccount() {
    const router = useRouter();
    const { legajo, hash } = router.query;
    const [activeStep, setActiveStep] = React.useState(0);
    const [student, setStudent] = React.useState({universityIdentification: {
            identificationType: "LEGAJO",
            identification: legajo,
        },
        personIdentification: {},
        address: { country: 'AR'},
        personalContacts: [],
        socialNetworks: [],
        universityContacts: []
    });

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                    position: 'relative',
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                    alignItems: "center"
                }}
            >
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Tecnicatura Universitaria en Pregramación
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Práctica Profecional - Legajo {legajo}
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                                Thank you for your order.
                            </Typography>
                            <Typography variant="subtitle1">
                                Your order number is #2001539. We have emailed your order
                                confirmation, and will send you an update when your order has
                                shipped.
                            </Typography>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent({step: activeStep,
                                legajo: legajo, student: student, setStudent: setStudent,
                                handleNext:handleNext, handleBack:handleBack})
                            }
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end'}} >
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                        Back
                                    </Button>
                                )}

                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 3, ml: 1 }}
                                >
                                    {activeStep === steps.length - 1 ? 'Enviar Datos' : 'Next'}
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Paper>
                <StickyFooterWhite />
            </Container>
        </ThemeProvider>
    );
}

function Review({student}) {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Detalle del alta
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Información Personal
                    </Typography>
                    <Typography gutterBottom>{student.name + ' ' + student.lastName}</Typography>
                    <Typography gutterBottom>{student.personIdentification.identificationType +
                        ': ' + student.personIdentification.identification}</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Payment details
                    </Typography>
                    <Grid container>
                        {payments.map((payment) => (
                            <React.Fragment key={payment.name}>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.name}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.detail}</Typography>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
            <List disablePadding>
                {products.map((product) => (
                    <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
                        <ListItemText primary={product.name} secondary={product.desc} />
                        <Typography variant="body2">{product.price}</Typography>
                    </ListItem>
                ))}

                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        $34.06
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Shipping
                    </Typography>
                    <Typography gutterBottom>John Smith</Typography>
                    <Typography gutterBottom>{addresses.join(', ')}</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Payment details
                    </Typography>
                    <Grid container>
                        {payments.map((payment) => (
                            <React.Fragment key={payment.name}>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.name}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.detail}</Typography>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}


async function postStudent(student) {
    return axios({
        method: 'post',
        url: 'http://localhost:8080/ps/students/',
        data: student,
        headers: {
            'accept': '*/*',
            'charset': 'UTF-8',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
        },
        mode: 'no-cors',
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}