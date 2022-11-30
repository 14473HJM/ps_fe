import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

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
    let failStep = 0;

    const currentStep = (project) => {
        console.log(project.projectStatus);

        if(!project.projectStatus) {
            activeStep = 0;
        } else {
            switch (project.projectStatus) {
                case "CREATED":
                    activeStep = 1;
                    break;
                case "UNDER_PROP_REVIEW":
                    activeStep = 2;
                    break;
                case "PROP_ACCEPTED":
                    activeStep = 3;
                    break;
                case "WIP":
                    activeStep = 3;
                    break;
                case "UNDER_FINAL_REVIEW":
                    activeStep = 4;
                    break;
                case "READY_TO_DELIVER":
                    activeStep = 5;
                    break;
                case "DELIVERED":
                    activeStep = 6;
                    break;
                case "FINISHED":
                    activeStep = 7;
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
        </Box>
    );
}
