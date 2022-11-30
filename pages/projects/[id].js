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

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Información del Proyecto" {...a11yProps(0)} />
                    <Tab label="Seguimiento" {...a11yProps(1)} />
                    <Tab label="Conversaciones" {...a11yProps(2)} />
                    <Tab label="Adjuntos" {...a11yProps(3)} />
                    <Tab label="Presentación final" {...a11yProps(4)} />
                    <Tab label="Evaluaciones" {...a11yProps(5)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <ProjectInformation project={project} setProject={setProject} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ProjectMonitoring project={project} setProject={setProject} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ProjectConversation project={project} setProject={setProject} />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <ProjectAttachments project={project} setProject={setProject} />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <ProjectPresentation project={project} setProject={setProject} />
            </TabPanel>
            <TabPanel value={value} index={5}>
                <ProjectValuation project={project} setProject={setProject} />
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

        // Fetch data from external API
        const res = await fetch(`http://localhost:8080/ps/projects/${params.id}`, options)
        const _project = await res.json()
        // Pass data to the page via props
        return {props: {_project}}
    } else {
        return {props: {}};
    }
}