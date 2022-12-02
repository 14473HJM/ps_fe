import {useSession} from "next-auth/react";
import Box from "@mui/material/Box";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ContactForm from "../../components/people/contact";
import Layout from "../../components/layout/layout";
import ProjectInformation from "../../components/project/projectInformation";
import ProjectMonitoring from "../../components/project/projectMonitoring";
import ProjectAttachments from "../../components/project/projectAttachments";
import ProjectConversation from "../../components/project/projectConversation";
import ProjectPresentation from "../../components/project/projectPresentation";
import ProjectValuation from "../../components/project/projectValuation";
import {getToken} from "next-auth/jwt";
import ProjectStepper from "../../components/project/projectStepper";

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

export default function BasicTabs(props) {
    const [value, setValue] = React.useState(0);
    const [project, setProject] = React.useState(props._project);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let infoDisable = false;
    let segDisable = false;
    let convDisable = false;
    let attDisable = false;
    let presDisable = false;
    let evalDisable = false;
    let infoTabDisable = false;
    let segTabDisable = false;
    let convTabDisable = false;
    let attTabDisable = false;
    let presTabDisable = false;
    let evalTabDisable = false;

    const handleDisabled = (project) => {
        if(!project.projectStatus) {
            infoDisable = false;
            segDisable = true;
            convDisable = true;
            attDisable = true;
            presDisable = true;
            evalDisable = true;
        } else {
            switch (project.projectStatus) {
                case "CREATED":
                    infoDisable = false;
                    segDisable = true;
                    convDisable = false;
                    attDisable = true;
                    presDisable = true;
                    evalDisable = true;
                    infoTabDisable = false;
                    segTabDisable = true;
                    convTabDisable = false;
                    attTabDisable = true;
                    presTabDisable = true;
                    evalTabDisable = true;
                    break;
                case "UNDER_PROP_REVIEW":
                    infoDisable = true;
                    segDisable = true;
                    convDisable = false;
                    attDisable = true;
                    presDisable = true;
                    evalDisable = true;
                    infoTabDisable = false;
                    segTabDisable = true;
                    convTabDisable = false;
                    attTabDisable = true;
                    presTabDisable = true;
                    evalTabDisable = true;
                    break;
                case "PROP_ACCEPTED":
                    infoDisable = true;
                    segDisable = false;
                    convDisable = false;
                    attDisable = true;
                    presDisable = true;
                    evalDisable = true;
                    infoTabDisable = false;
                    segTabDisable = false;
                    convTabDisable = false;
                    attTabDisable = true;
                    presTabDisable = true;
                    evalTabDisable = true;
                    break;
                case "WIP":
                    infoDisable = true;
                    segDisable = true;
                    convDisable = false;
                    attDisable = false;
                    presDisable = true;
                    evalDisable = true;
                    infoTabDisable = false;
                    segTabDisable = false;
                    convTabDisable = false;
                    attTabDisable = false;
                    presTabDisable = true;
                    evalTabDisable = true;
                    break;
                case "UNDER_FINAL_REVIEW":
                    infoDisable = true;
                    segDisable = true;
                    convDisable = false;
                    attDisable = true;
                    presDisable = true;
                    evalDisable = true;
                    infoTabDisable = false;
                    segTabDisable = false;
                    convTabDisable = false;
                    attTabDisable = false;
                    presTabDisable = true;
                    evalTabDisable = true;
                    break;
                case "READY_TO_DELIVER":
                    infoDisable = true;
                    segDisable = true;
                    convDisable = false;
                    attDisable = false;
                    presDisable = false;
                    evalDisable = true;
                    infoTabDisable = false;
                    segTabDisable = false;
                    convTabDisable = false;
                    attTabDisable = false;
                    presTabDisable = false;
                    evalTabDisable = true;
                    break;
                case "DELIVERED":
                    infoDisable = true;
                    segDisable = true;
                    convDisable = true;
                    attDisable = true;
                    presDisable = true;
                    evalDisable = false;
                    infoTabDisable = false;
                    segTabDisable = false;
                    convTabDisable = false;
                    attTabDisable = false;
                    presTabDisable = false;
                    evalTabDisable = false;
                    break;
                case "FINISHED":
                    infoDisable = true;
                    segDisable = true;
                    convDisable = true;
                    attDisable = true;
                    presDisable = true;
                    evalDisable = true;
                    infoTabDisable = false;
                    segTabDisable = false;
                    convTabDisable = false;
                    attTabDisable = false;
                    presTabDisable = false;
                    evalTabDisable = false;
                    break;
                case "CANCELED":
                    infoDisable = true;
                    segDisable = true;
                    convDisable = true;
                    attDisable = true;
                    presDisable = true;
                    evalDisable = true;
                    infoTabDisable = false;
                    segTabDisable = false;
                    convTabDisable = false;
                    attTabDisable = false;
                    presTabDisable = false;
                    evalTabDisable = false;
                    break;
                default:
                    infoDisable = true;
                    segDisable = true;
                    convDisable = true;
                    attDisable = true;
                    presDisable = true;
                    evalDisable = true;
                    infoTabDisable = true;
                    segTabDisable = true;
                    convTabDisable = true;
                    attTabDisable = true;
                    presTabDisable = true;
                    evalTabDisable = true;
                    break;
            }
        }
    };

    handleDisabled(project);

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ width: '100%', mb: 6}}>
                <ProjectStepper project={project} />
            </Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Información del Proyecto" {...a11yProps(0)} disabled={infoTabDisable}/>
                    <Tab label="Seguimiento" {...a11yProps(1)} disabled={segTabDisable}/>
                    <Tab label="Conversaciones" {...a11yProps(2)} disabled={convTabDisable}/>
                    <Tab label="Adjuntos" {...a11yProps(3)} disabled={attTabDisable}/>
                    <Tab label="Presentación final" {...a11yProps(4)} disabled={presTabDisable}/>
                    <Tab label="Evaluaciones" {...a11yProps(5)} disabled={evalTabDisable}/>
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <ProjectInformation project={project} setProject={setProject} isDisabled={infoDisable}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ProjectMonitoring project={project} setProject={setProject} isDisabled={segDisable}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ProjectConversation project={project} setProject={setProject} isDisabled={convDisable}/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <ProjectAttachments project={project} setProject={setProject} isDisabled={attDisable}/>
            </TabPanel>
            <TabPanel value={value} index={4}>
                <ProjectPresentation project={project} setProject={setProject} isDisabled={presDisable}/>
            </TabPanel>
            <TabPanel value={value} index={5}>
                <ProjectValuation project={project} setProject={setProject} isDisabled={evalDisable}/>
            </TabPanel>
        </Box>
    );
}

BasicTabs.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}

export async function getServerSideProps(context) {

    const { req } = context;
    const { params } = context;
    console.log(context);
    const token = await getToken({ req })
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
        const _project = await res.json()
        // Pass data to the page via props
        return {props: {_project}}
    } else {
        return {props: {_project: {}}};
    }
}