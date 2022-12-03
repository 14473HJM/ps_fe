import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";

const steps = [
    'Inicio',
    'Propuesta creada',
    'Propuesta enviada',
    'Proyecto aceptado',
    'Revisión final',
    'Pendiente doc. final',
    'Entregado',
    'Terminado'
];

export default function ProjectStepper({project}) {

    let activeStep = 0;
    let disableNextAction = true;
    let disableBackAction = true;
    let visibleNextAction = false;
    let visibleBackAction = false;

    const handleNext = () => {
        console.log("Next")
    };

    const handleBack = () => {
        console.log("Back")
    };

    const currentStep = (project) => {
        console.log(project.projectStatus);

        if(!project.projectStatus) {
            activeStep = 0;
        } else {
            switch (project.projectStatus) {
                case "CREATED":
                    activeStep = 1;
                    disableNextAction = false;
                    break;
                case "UNDER_PROP_REVIEW":
                    activeStep = 2;
                    disableNextAction = true;
                    break;
                case "PROP_ACCEPTED":
                    activeStep = 3;
                    disableNextAction = false;
                    break;
                case "WIP":
                    activeStep = 3;
                    disableNextAction = false;
                    break;
                case "UNDER_FINAL_REVIEW":
                    activeStep = 4;
                    disableNextAction = true;
                    break;
                case "READY_TO_DELIVER":
                    activeStep = 5;
                    disableNextAction = false;
                    break;
                case "DELIVERED":
                    activeStep = 6;
                    disableNextAction = true;
                    break;
                case "FINISHED":
                    activeStep = 7;
                    disableNextAction = true;
                    break;
                case "CANCELED":
                    activeStep = 7;
                    break;
                default:
                    activeStep = 0;
                    break;
            }
        }
    };

    console.log(activeStep);
    return (
        <Box sx={{ width: '100%' }} >
            <Stepper activeStep={activeStep} alternativeLabel onLoad={currentStep(project)}>
                {steps.map((label, index) => {
                    const labelProps = {};
                    // if (isStepFailed(index)) {
                    //     labelProps.optional = (
                    //         <Typography variant="caption" color="error">
                    //             Alert message
                    //         </Typography>
                    //     );
                    //     labelProps.error = true;
                    // }
                    return (
                        <Step key={label}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} >
                <Button
                    onClick={handleBack}
                    sx={{ mt: 3, ml: 1 }}
                    disabled={disableBackAction}>
                    Back
                </Button>

                <Button
                    variant="contained"
                    sx={{ mt: 3, ml: 1 }}
                    disabled={disableNextAction}
                    onClick={handleNext}
                >Next</Button>
            </Box>
        </Box>
    );
}
