import {useSession} from "next-auth/react";
import Box from "@mui/material/Box";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ProjectInformation from "../../components/project/projectInformation";
import ProjectMonitoring from "../../components/project/projectMonitoring";
import ProjectAttachments from "../../components/project/projectAttachments";
import ProjectConversation from "../../components/project/projectConversation";
import ProjectPresentation from "../../components/project/projectPresentation";
import ProjectValuation from "../../components/project/projectValuation";
import {getToken} from "next-auth/jwt";
import ProjectStepper from "../../components/project/projectStepper";
import { getProjectById } from '../../services/projects.service';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {MessageModalSimple} from "../../components/common/messages/message";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    const { data: session, status } = useSession();

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <React.Fragment>{children}</React.Fragment>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const handleDisabled = (session, project) => {
    if (session && session.user.roles.includes("ADMIN")) {
        return (
            {
                infoDisable: false,
                segDisable: false,
                convDisable: false,
                attDisable: false,
                presDisable: false,
                evalDisable: false,
                infoTabDisable: false,
                segTabDisable: false,
                convTabDisable: false,
                attTabDisable: false,
                presTabDisable: false,
                evalTabDisable: false,
            }
        );
    }
    if (!project.projectStatus) {
        return (
            {
                infoDisable: false,
                segDisable: true,
                convDisable: true,
                attDisable: true,
                presDisable: true,
                evalDisable: true,
                infoTabDisable: false,
                segTabDisable: true,
                convTabDisable: true,
                attTabDisable: true,
                presTabDisable: true,
                evalTabDisable: true,
            }
        );
    }
    switch (project.projectStatus) {
        case "CREATED":
            if(session && project.tutor && project.tutor.id == session.user.person.id) {
                return (
                    {
                        infoDisable: true,
                        segDisable: true,
                        convDisable: false,
                        attDisable: true,
                        presDisable: true,
                        evalDisable: true,
                        infoTabDisable: false,
                        segTabDisable: true,
                        convTabDisable: false,
                        attTabDisable: true,
                        presTabDisable: true,
                        evalTabDisable: true,
                    }
                );
            }
            if(session && project.students.some(s => s.id == session.user.person.id)) {
                return (
                    {
                        infoDisable: false,
                        segDisable: true,
                        convDisable: false,
                        attDisable: true,
                        presDisable: true,
                        evalDisable: true,
                        infoTabDisable: false,
                        segTabDisable: true,
                        convTabDisable: false,
                        attTabDisable: true,
                        presTabDisable: true,
                        evalTabDisable: true,
                    }
                );
            }
        case "UNDER_PROP_REVIEW":
            if(session && project.tutor && project.tutor.id == session.user.person.id) {
                return (
                    {
                        infoDisable: true,
                        segDisable: true,
                        convDisable: false,
                        attDisable: true,
                        presDisable: true,
                        evalDisable: true,
                        infoTabDisable: false,
                        segTabDisable: true,
                        convTabDisable: false,
                        attTabDisable: true,
                        presTabDisable: true,
                        evalTabDisable: true,
                    }
                );
            }
            if(session && project.students.some(s => s.id == session.user.person.id)) {
                return (
                    {
                        infoDisable: true,
                        segDisable: true,
                        convDisable: false,
                        attDisable: true,
                        presDisable: true,
                        evalDisable: true,
                        infoTabDisable: false,
                        segTabDisable: true,
                        convTabDisable: false,
                        attTabDisable: true,
                        presTabDisable: true,
                        evalTabDisable: true,
                    }
                );
            }
        case "PROP_ACCEPTED":
            if(session && project.tutor && project.tutor.id == session.user.person.id) {
                return (
                    {
                        infoDisable: true,
                        segDisable: true,
                        convDisable: false,
                        attDisable: true,
                        presDisable: true,
                        evalDisable: true,
                        infoTabDisable: false,
                        segTabDisable: false,
                        convTabDisable: false,
                        attTabDisable: true,
                        presTabDisable: true,
                        evalTabDisable: true,
                    }
                );
            }
            if(session && project.students.some(s => s.id == session.user.person.id)) {
                return (
                    {
                        infoDisable: true,
                        segDisable: false,
                        convDisable: false,
                        attDisable: true,
                        presDisable: true,
                        evalDisable: true,
                        infoTabDisable: false,
                        segTabDisable: false,
                        convTabDisable: false,
                        attTabDisable: true,
                        presTabDisable: true,
                        evalTabDisable: true,
                    }
                );
            }
        case "WIP":
            if(session && project.tutor && project.tutor.id == session.user.person.id) {
                return (
                    {
                        infoDisable: true,
                        segDisable: true,
                        convDisable: false,
                        attDisable: true,
                        presDisable: true,
                        evalDisable: true,
                        infoTabDisable: false,
                        segTabDisable: false,
                        convTabDisable: false,
                        attTabDisable: true,
                        presTabDisable: true,
                        evalTabDisable: true,
                    }
                );
            }
            if(session && project.students.some(s => s.id == session.user.person.id)) {
                return (
                    {
                        infoDisable: true,
                        segDisable: true,
                        convDisable: false,
                        attDisable: false,
                        presDisable: true,
                        evalDisable: true,
                        infoTabDisable: false,
                        segTabDisable: false,
                        convTabDisable: false,
                        attTabDisable: false,
                        presTabDisable: true,
                        evalTabDisable: true,
                    }
                );
            }
        case "UNDER_FINAL_REVIEW":
            if(session && project.tutor && project.tutor.id == session.user.person.id) {
                return (
                    {
                        infoDisable: true,
                        segDisable: true,
                        convDisable: false,
                        attDisable: true,
                        presDisable: true,
                        evalDisable: true,
                        infoTabDisable: false,
                        segTabDisable: false,
                        convTabDisable: false,
                        attTabDisable: false,
                        presTabDisable: true,
                        evalTabDisable: true,
                    }
                );
            }
            if(session && project.students.some(s => s.id == session.user.person.id)) {
                return (
                    {
                        infoDisable: true,
                        segDisable: true,
                        convDisable: false,
                        attDisable: true,
                        presDisable: true,
                        evalDisable: true,
                        infoTabDisable: false,
                        segTabDisable: false,
                        convTabDisable: false,
                        attTabDisable: false,
                        presTabDisable: true,
                        evalTabDisable: true,
                    }
                );
            }
        case "READY_TO_DELIVER":
            if(session && project.tutor && project.tutor.id == session.user.person.id) {
                return (
                    {
                        infoDisable: true,
                        segDisable: true,
                        convDisable: false,
                        attDisable: true,
                        presDisable: true,
                        evalDisable: true,
                        infoTabDisable: false,
                        segTabDisable: false,
                        convTabDisable: false,
                        attTabDisable: false,
                        presTabDisable: false,
                        evalTabDisable: true,
                    }
                );
            }
            if(session && project.students.some(s => s.id == session.user.person.id)) {
                return (
                    {
                        infoDisable: true,
                        segDisable: true,
                        convDisable: false,
                        attDisable: true,
                        presDisable: false,
                        evalDisable: true,
                        infoTabDisable: false,
                        segTabDisable: false,
                        convTabDisable: false,
                        attTabDisable: false,
                        presTabDisable: false,
                        evalTabDisable: true,
                    }
                );
            }
        case "DELIVERED":
            if(session && project.tutor && project.tutor.id == session.user.person.id) {
                return (
                    {
                        infoDisable: true,
                        segDisable: true,
                        convDisable: false,
                        attDisable: true,
                        presDisable: true,
                        evalDisable: false,
                        infoTabDisable: false,
                        segTabDisable: false,
                        convTabDisable: false,
                        attTabDisable: false,
                        presTabDisable: false,
                        evalTabDisable: false,
                    }
                );
            }
            if(session && project.students.some(s => s.id == session.user.person.id)) {
                return (
                    {
                        infoDisable: true,
                        segDisable: true,
                        convDisable: false,
                        attDisable: true,
                        presDisable: true,
                        evalDisable: true,
                        infoTabDisable: false,
                        segTabDisable: false,
                        convTabDisable: false,
                        attTabDisable: false,
                        presTabDisable: false,
                        evalTabDisable: true,
                    }
                );
            }
        case "FINISHED":
            if(session && project.tutor && project.tutor.id == session.user.person.id) {
                return (
                    {
                        infoDisable: true,
                        segDisable: true,
                        convDisable: false,
                        attDisable: true,
                        presDisable: true,
                        evalDisable: true,
                        infoTabDisable: false,
                        segTabDisable: false,
                        convTabDisable: false,
                        attTabDisable: false,
                        presTabDisable: false,
                        evalTabDisable: false,
                    }
                );
            }
            if(session && project.students.some(s => s.id == session.user.person.id)) {
                return (
                    {
                        infoDisable: true,
                        segDisable: true,
                        convDisable: false,
                        attDisable: true,
                        presDisable: true,
                        evalDisable: true,
                        infoTabDisable: false,
                        segTabDisable: false,
                        convTabDisable: false,
                        attTabDisable: false,
                        presTabDisable: false,
                        evalTabDisable: false,
                    }
                );
            }
        case "CANCELED":
            if(session && project.tutor && project.tutor.id == session.user.person.id) {
                return (
                    {
                        infoDisable: true,
                        segDisable: true,
                        convDisable: false,
                        attDisable: true,
                        presDisable: true,
                        evalDisable: true,
                        infoTabDisable: false,
                        segTabDisable: false,
                        convTabDisable: false,
                        attTabDisable: false,
                        presTabDisable: false,
                        evalTabDisable: false,
                    }
                );
            }
            if(session && project.students.some(s => s.id == session.user.person.id)) {
                return (
                    {
                        infoDisable: true,
                        segDisable: true,
                        convDisable: false,
                        attDisable: true,
                        presDisable: true,
                        evalDisable: true,
                        infoTabDisable: false,
                        segTabDisable: false,
                        convTabDisable: false,
                        attTabDisable: false,
                        presTabDisable: false,
                        evalTabDisable: false,
                    }
                );
            }
        default:
            return(
                {
                    infoDisable: true,
                    segDisable: true,
                    convDisable: true,
                    attDisable: true,
                    presDisable: true,
                    evalDisable: true,
                    infoTabDisable: true,
                    segTabDisable: true,
                    convTabDisable: true,
                    attTabDisable: true,
                    presTabDisable: true,
                    evalTabDisable: true,
                }
            );
        }
};
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function BasicTabs(props) {
    const {data: session, status} = useSession()
    const [value, setValue] = React.useState(0);
    const [project, setProject] = React.useState(props._project);
    const [availableInternetPlatforms, setAvailableInternetPlatforms] = React.useState(props._availableInternetPlatforms);
    const [infSegDis, setInfSegDis] = React.useState(handleDisabled(session, project));
    const [openSnackbarOK, setOpenSnackbarOK] = React.useState(false);
    const [openSnackbarError, setOpenSnackbarError] = React.useState(false);

    console.log(props);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // const handleOpenSnackbar = (t) => {
    //     if(t === "E") {
    //         setOpenSnackbarError(true);
    //     } else if (t === "S") {
    //         setOpenSnackbarOK(true);
    //     }
    // };
    // const handleCloseSnackbar = (event, reason, t) => {
    //     if(t === "E") {
    //         if (reason === 'clickaway') {
    //             return;
    //         }
    //         setOpenSnackbarError(false);
    //     } else if (t === "S") {
    //         if (reason === 'clickaway') {
    //             return;
    //         }
    //         setOpenSnackbarOK(false);
    //     }
    // };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ width: '100%', mb: 6}}>
                <ProjectStepper project={project} setProject={setProject} />
            </Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Información del Proyecto" {...a11yProps(0)} disabled={infSegDis.infoTabDisable}/>
                    <Tab label="Seguimiento" {...a11yProps(1)} disabled={infSegDis.segTabDisable}/>
                    <Tab label="Conversaciones" {...a11yProps(2)} disabled={infSegDis.convTabDisable}/>
                    <Tab label="Adjuntos" {...a11yProps(3)} disabled={infSegDis.attTabDisable}/>
                    <Tab label="Presentación final" {...a11yProps(4)} disabled={infSegDis.presTabDisable}/>
                    <Tab label="Evaluaciones" {...a11yProps(5)} disabled={infSegDis.evalTabDisable}/>
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <ProjectInformation project={project} setProject={setProject} isDisabled={infSegDis.infoDisable}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ProjectMonitoring project={project} setProject={setProject} isDisabled={infSegDis.segDisable} availableInternetPlatforms={availableInternetPlatforms}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ProjectConversation project={project} setProject={setProject} isDisabled={infSegDis.convDisable}/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <ProjectAttachments project={project} setProject={setProject} isDisabled={infSegDis.attDisable}/>
            </TabPanel>
            <TabPanel value={value} index={4}>
                <ProjectPresentation project={project} setProject={setProject} isDisabled={infSegDis.presDisable}/>
            </TabPanel>
            <TabPanel value={value} index={5}>
                <ProjectValuation project={project} setProject={setProject} isDisabled={infSegDis.evalDisable}/>
            </TabPanel>

            {/*<Snackbar*/}
            {/*    open={openSnackbarOK}*/}
            {/*    autoHideDuration={6000}*/}
            {/*    onClose={(e, r) => handleCloseSnackbar(e, r, 'S')}*/}
            {/*    anchorOrigin={{vertical: 'bottom', horizontal: 'bottom'}}*/}
            {/*>*/}
            {/*    <Alert onClose={(e, r) => handleCloseSnackbar(e, r, 'S')} severity="success" sx={{ width: '100%' }}>*/}
            {/*        Operación realizada con exito!*/}
            {/*    </Alert>*/}
            {/*</Snackbar>*/}
            {/*<Snackbar*/}
            {/*    open={openSnackbarError}*/}
            {/*    autoHideDuration={6000}*/}
            {/*    onClose={(e, r) => handleCloseSnackbar(e, r, 'E')}*/}
            {/*    anchorOrigin={{vertical: 'bottom', horizontal: 'bottom'}}*/}
            {/*>*/}
            {/*    <Alert onClose={(e, r) => handleCloseSnackbar(e, r, 'E')} severity="error" sx={{ width: '100%' }}>*/}
            {/*        Hubo un error al procesar la operación*/}
            {/*    </Alert>*/}
            {/*</Snackbar>*/}
        </Box>
    );
}

BasicTabs.auth = true;

export async function getServerSideProps(context) {

    const { req } = context;
    const { params } = context;
    console.log(context);
    const token = await getToken({ req })
    let _project = {};
    let _availableInternetPlatforms = null;
    if(token != null && params.id != 'new') {
        const {access_token} = token

        const options = {
            headers: {
                'accept': '*/*',
                'charset': 'UTF-8',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token,
            }
        };

        // Fetch data from external API
        const res = await fetch(`http://localhost:8080/ps/projects/${params.id}`, options)
        _project = await res.json();
        // Pass data to the page via props
    }
    if(token != null) {
        const {access_token} = token
        const options = {
            headers: {
                'accept': '*/*',
                'charset': 'UTF-8',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token,
            }
        };
        const resAvailableInternetPlatforms = await fetch(`http://localhost:8080/ps/config/internet/platforms`, options)
        _availableInternetPlatforms = await resAvailableInternetPlatforms.json();
    }
    return {props: {_project, _availableInternetPlatforms}}
}