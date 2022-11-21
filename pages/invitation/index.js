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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {StickyFooterWhite} from "../../components/brand/stickyFooter";
import {useRouter} from "next/router";
import axios from "axios";
import PersonalInformation from "./personalInformation";
import AddressInformation from "./addressInformation";
import ContactInformation from "./contactInformation";
import Review from "./reviewInformation";
import Link from "next/link";


const steps = ['Información Personal', 'Domicilio', 'Información de Contacto', 'Enviar Pedido'];

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
            identification: {legajo}.legajo,
        },
        personIdentification: {},
        address: { country: 'Argentina'},
        personalContacts: [],
        socialNetworks: [],
        universityContacts: []
    });
    const [project, setProject] = React.useState({id: null});

    const handleNext = () => {
        console.log(student)
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
                                Gracias por inscribirte en la Práctica Supervisada.
                            </Typography>
                            <Typography variant="subtitle1">
                                Con la creación de tu usuario, tambien se ha creado el proyeco # {project.id}.
                                Para empezar a trabajar puedes acceder a traves de este
                                <Link href={`/projects/${project.id}`} > link.</Link>
                                Buena suerte!!!!
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