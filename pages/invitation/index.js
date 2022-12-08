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
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { StickyFooter } from "../../components/brand/stickyFooter";
import PersonalInformation from "./personalInformation";
import AddressInformation from "./addressInformation";
import ContactInformation from "./contactInformation";
import Review from "./reviewInformation";
import Link from "next/link";

const steps = ['Información Personal', 'Domicilio', 'Información de Contacto', 'Enviar Pedido'];

const StepContent = (props) => {
    const stepMap = {
        0: <PersonalInformation {...props} />,
        1: <AddressInformation {...props} />,
        2: <ContactInformation {...props} />,
        3: <Review {...props} />,
        default: <div>Unknown step</div>,
    };
    const { step } = props;
    return stepMap[step] || stepMap.default
}

const theme = createTheme();

export default function CreateAccount(props) {
    const {legajo} = props;
    const [activeStep, setActiveStep] = React.useState(0);
    const [student, setStudent] = React.useState({
        universityIdentification: {
            identificationType: "LEGAJO",
            identification: legajo,
        },
        personIdentification: {
            identificationType: 'DNI'
        },
        address: { country: 'AR'},
        personalContacts: [],
        socialNetworks: [],
        universityContacts: [],
        objectType: 'STUDENT',
    });
    const [project, setProject] = React.useState({id: null});

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
                        Práctica Profesional - Legajo {legajo}
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
                            <StepContent
                                step={activeStep}
                                legajo={legajo}
                                student={student}
                                setStudent={setStudent}
                                handleNext={handleNext}
                                handleBack={handleBack}
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end'}} >
                                {/* {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                        Back
                                    </Button>
                                )} */}

                                {/* {isLastStep ? (
                                    <LoadingButton
                                        variant="contained"
                                        onClick={handleSaveStudent}
                                        sx={{ mt: 3, ml: 1 }}
                                        loading={loading}
                                    >
                                        Enviar Datos
                                    </LoadingButton>
                                ) : (
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        Siguiente
                                    </Button>
                                )} */}
                            </Box>
                        </React.Fragment>
                    )}
                </Paper>
                <StickyFooter color="white" />
            </Container>
        </ThemeProvider>
    );
}

export async function getServerSideProps({ query }) {
    const { legajo } = query;
    return {
        props: {
            legajo,
        },
    }
}
