import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import {useSession} from "next-auth/react";

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

const studentSteps = ['CREATED', 'PROP_ACCEPTED', 'WIP', 'READY_TO_DELIVER'];

const currentStep = (projectStatus) => {
    console.log(projectStatus);

    if(!projectStatus) {
        return 0;
    } else {
        switch (projectStatus) {
            case "CREATED":
                return 1;
                break;
            case "UNDER_PROP_REVIEW":
                return 2;
                break;
            case "PROP_ACCEPTED":
                return 3;
                break;
            case "WIP":
                return 3;
                break;
            case "UNDER_FINAL_REVIEW":
                return 4;
                break;
            case "READY_TO_DELIVER":
                return 5;
                break;
            case "DELIVERED":
                return 6;
                break;
            case "FINISHED":
                return 7;
                break;
            case "CANCELED":
                return 7;
                break;
            default:
                return 0;
                break;
        }
    }
};

const getBackActionDisabled = (session) => {
    if (session && session.user.roles.includes("ADMIN","PROFESSOR")) {
        return false;
    } else {
        return true;
    }
}

const getNextActionDisabled = (session, projectStatus) => {
    if (session && session.user.roles.includes("ADMIN","PROFESSOR")) {
        return false;
    } else {
        if(studentSteps.includes(projectStatus)) {
            return false;
        } else {
            return true;
        }
    }
}


export default function ProjectStepper({project}) {

    const [activeStep, setActiveStep] = React.useState(currentStep(project.projectStatus));
    const { data: session } = useSession();
    const [disableBackAction, setDisableBackAction] = React.useState(getBackActionDisabled(session));
    const [disableNextAction, setDisableNextAction] = React.useState(getNextActionDisabled(session, project.projectStatus));

    const handleNext = () => {
        console.log("Next")
    };

    const handleBack = () => {
        console.log("Back")
    };


    console.log(activeStep);
    return (
        <Box sx={{ width: '100%' }} >
            <Stepper activeStep={activeStep} alternativeLabel >
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
