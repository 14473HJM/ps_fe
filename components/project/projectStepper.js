import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

const steps = [
    'Inicio',
    'Propuesta enviada',
    'Proyecto aceptado',
    'En revisión final',
    'Pendiente documentación final',
    'Terminado'
];

export default function ProjectStepper() {
    const isStepFailed = (step) => {
        return step === 1;
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={1}>
                {steps.map((label, index) => {
                    const labelProps = {};
                    if (isStepFailed(index)) {
                        labelProps.optional = (
                            <Typography variant="caption" color="error">
                                Alert message
                            </Typography>
                        );

                        labelProps.error = true;
                    }

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
