import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import {useSession} from "next-auth/react";
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import {styled} from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Collapse from "@mui/material/Collapse";
import {isValidToNext, messageValidation} from "./projectValidations";
import {moveProject} from "../../pages/api/projects/projectsApi";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import {MessageModalSimple} from "../common/messages/message";


const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#4b64d0',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#0a2fce',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
}));

const steps = [
    'Inicio',
    'Creado',
    'En Revisión',
    'Aceptado',
    'En progreso',
    'Revisión final',
    'Pendiente doc. final',
    'Entregado',
    'Terminado'
];
const studentSteps = ['CREATED', 'PROP_ACCEPTED', 'WIP', 'READY_TO_DELIVER'];
const professorSteps = ['UNDER_PROP_REVIEW', 'UNDER_FINAL_REVIEW', 'DELIVERED'];
const noBackSteps = ['CREATED', 'FINISHED', 'CANCELED'];
const noCancelSteps = ['FINISHED', 'CANCELED'];
const buttonNamesByStatus = {
    createdBack: "No Permitido",
    createdNext: "Enviar propuesta",
    underPropReviewNext: "Aceptar Propuesta",
    underPropReviewBack: "Rechazar Propuesta",
    propAcceptedNext: "Comenzar a trabajar",
    propAcceptedBack: "Devolver para revisión",
    wipNext: "Enviar a revisión final",
    wipBack: "Devolver para revisión",
    underFinalReviewNext: "Aceptar entrega",
    underFinalReviewBack: "Rechazar entrega",
    readyToDeliverNext: "Entregar PS",
    readyToDeliverBack: "Devolver para revisión",
    deliveredNext: "Finalizar PS",
    deliveredBack: "Rechazar PS",
    finishedNext: "No Permitido",
    finishedBack: "Reabrir PS",
    cancelNext: "Cancelar PS",
    cancelBack: "Recuperar PS"
};
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
                return 4;
                break;
            case "UNDER_FINAL_REVIEW":
                return 5;
                break;
            case "READY_TO_DELIVER":
                return 6;
                break;
            case "DELIVERED":
                return 7;
                break;
            case "FINISHED":
                return 8;
                break;
            case "CANCELED":
                return 9;
                break;
            default:
                return 0;
                break;
        }
    }
};
const getBackActionVisible = (session, projectStatus) => {
    if (session && session.user.roles.includes("ADMIN") && !noBackSteps.includes(projectStatus)) {
        return false;
    } else if (session && session.user.roles.includes("PROFESSOR") && !noBackSteps.includes(projectStatus)) {
        return false;
    }else {
        return true;
    }
    // if (session && session.user.roles.includes("ADMIN","PROFESSOR") && !noBackSteps.includes(projectStatus)) {
    //     return false;
    // } else {
    //     return true;
    // }
}
const getCancelActionVisible = (session, projectStatus) => {
    if (session && session.user.roles.includes("ADMIN") && !noCancelSteps.includes(projectStatus)) {
        return false;
    } else if (session && session.user.roles.includes("PROFESSOR") && !noCancelSteps.includes(projectStatus)) {
        return false;
    }else {
        return true;
    }
    // if (session && session.user.roles.includes("ADMIN","PROFESSOR") && !noCancelSteps.includes(projectStatus)) {
    //     return false;
    // } else {
    //     return true;
    // }
}
const getNextActionVisible = (session, projectStatus) => {
    if (session && session.user.roles.includes("ADMIN")) {
        return false;
    } else if (session && session.user.roles.includes("PROFESSOR") && professorSteps.includes(projectStatus)) {
        return false;
    }else if(session && session.user.roles.includes("STUDENT") && studentSteps.includes(projectStatus)) {
        return false;
    } else {
        return true;
    }
};
const getButtonNextLabel = (projectStatus) => {
    console.log(projectStatus);
    if(!projectStatus) {
        return 0;
    } else {
        switch (projectStatus) {
            case "CREATED":
                return buttonNamesByStatus.createdNext;
                break;
            case "UNDER_PROP_REVIEW":
                return buttonNamesByStatus.underFinalReviewNext;
                break;
            case "PROP_ACCEPTED":
                return buttonNamesByStatus.propAcceptedNext;
                break;
            case "WIP":
                return buttonNamesByStatus.wipNext;
                break;
            case "UNDER_FINAL_REVIEW":
                return buttonNamesByStatus.underFinalReviewNext;
                break;
            case "READY_TO_DELIVER":
                return buttonNamesByStatus.readyToDeliverNext;
                break;
            case "DELIVERED":
                return buttonNamesByStatus.deliveredNext;
                break;
            case "FINISHED":
                return buttonNamesByStatus.finishedNext;
                break;
            case "CANCELED":
                return buttonNamesByStatus.cancelNext;
                break;
            default:
                return "NEXT";
                break;
        }
    }
}
const getButtonBackLabel = (projectStatus) => {
    console.log(projectStatus);
    if(!projectStatus) {
        return 0;
    } else {
        switch (projectStatus) {
            case "CREATED":
                return buttonNamesByStatus.createdBack;
                break;
            case "UNDER_PROP_REVIEW":
                return buttonNamesByStatus.underFinalReviewBack;
                break;
            case "PROP_ACCEPTED":
                return buttonNamesByStatus.propAcceptedBack;
                break;
            case "WIP":
                return buttonNamesByStatus.wipBack;
                break;
            case "UNDER_FINAL_REVIEW":
                return buttonNamesByStatus.underFinalReviewBack;
                break;
            case "READY_TO_DELIVER":
                return buttonNamesByStatus.readyToDeliverBack;
                break;
            case "DELIVERED":
                return buttonNamesByStatus.deliveredBack;
                break;
            case "FINISHED":
                return buttonNamesByStatus.finishedBack;
                break;
            case "CANCELED":
                return buttonNamesByStatus.cancelBack;
                break;
            default:
                return "BACK";
                break;
        }
    }
}
const getNextActionDisable = (project) => {
    if(isValidToNext(project)) {
        return false;
    } else {
        return true;
    }
}

const alertErrorMessage = () => {

}

export default function ProjectStepper({project, setProject}) {

    const [activeStep, setActiveStep] = React.useState(currentStep(project.projectStatus));
    const { data: session } = useSession();
    const [visibleBackAction, setVisibleBackAction] = React.useState(getBackActionVisible(session, project.projectStatus));
    const [visibleNextAction, setVisibleNextAction] = React.useState(getNextActionVisible(session, project.projectStatus));
    const [visibleCancelAction, setVisibleCancelAction] = React.useState(getCancelActionVisible(session, project.projectStatus));
    const [nextName, setNextName] = React.useState(getButtonNextLabel(project.projectStatus));
    const [backName, setBackName] = React.useState(getButtonBackLabel(project.projectStatus));
    const [disableNextAction, setDisableNextAction] = React.useState(getNextActionDisable(project));
    const [alertErrorVisible, setAlertErrorVisible] = React.useState(messageValidation(project).alert);
    const [alertErrorTitle, setAlertErrorTitle] = React.useState(messageValidation(project).title);
    const [alertErrorDescription, setAlertErrorDescription] = React.useState(messageValidation(project).description);
    const [alertErrorFields, setAlertErrorFields] = React.useState(messageValidation(project).fields);
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState();
    const [modalStatus, setModalStatus] = React.useState(false);
    const [action, setAction] = React.useState('');

    const handleNext = async (event) => {
        console.log("Next")
        event.preventDefault();
        setAction('MOVE_ON');
        setTitle("¿Seguro que desea avanzar de etapa?");
        setDescription("Deje un mensaje con el detalle de su pedido.");
        setModalStatus(true);
    };

    const handleBack = async (event) => {
        console.log("Back")
        event.preventDefault();
        setAction('MOVE_BACK');
        setTitle("¿Seguro que desea retroceder de etapa?");
        setDescription("Deje un mensaje con la justificación para esta acción.");
        setModalStatus(true);
    };

    const handleCancel = async (event) => {
        console.log("Cancel")
        event.preventDefault();
        setAction('CANCEL');
        setTitle("¿Seguro que desea cancelar la PS?");
        setDescription("Esta acción no tiene vuelta atras. Por favor deje un mensaje con el detalle de esta acción.");
        setModalStatus(true);
    };

    console.log(disableNextAction);
    return (
        <Box sx={{ width: '100%' }} >
            <Stepper activeStep={activeStep} alternativeLabel connector={<QontoConnector />} >
                {steps.map((label, index) => {
                    const labelProps = {};
                    return (
                        <Step key={label}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <Collapse in={alertErrorVisible} sx={{mt:3}}>
                <Alert severity="error">
                    <AlertTitle>{alertErrorTitle}</AlertTitle>
                    {alertErrorDescription}
                    {alertErrorFields.map(f =>
                        <li>{f}</li>
                    )}
                    <strong>check it out!</strong>
                </Alert>
            </Collapse>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} >
                {!visibleCancelAction ?
                <Button
                    onClick={handleCancel}
                    sx={{ mt: 3, ml: 7 }}
                    disabled={visibleCancelAction}
                    color="error"
                >Cancelar</Button> : null }
                {!visibleBackAction ?
                <Button
                    onClick={handleBack}
                    sx={{ mt: 3, ml: 7 }}
                    disabled={visibleBackAction}
                >{backName}</Button> : null }
                {!visibleNextAction ?
                <Button
                    sx={{ mt: 3, ml: 7, mr: 7 }}
                    disabled={disableNextAction}
                    onClick={handleNext}
                    color="success"
                >{nextName}</Button> : null }
            </Box>
            <MessageModalSimple
                title={title}
                description={description}
                modalStatus={modalStatus}
                setModalStatus={setModalStatus}
                project={project}
                setProject={setProject}
                action={action}/>
        </Box>
    );
}
