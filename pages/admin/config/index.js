import * as React from 'react';
import { useSession, getSession } from "next-auth/react"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PropTypes from "prop-types";
import {getToken} from "next-auth/jwt";
import {ConfigTable} from "../../../components/common/tables/configTables";
import {
    deleteCodeFramework,
    getCodeFramework,
    getCodeFrameworks,
    postCodeFramework,
    putCodeFramework
} from "../../api/config/codeFrameworksApi";
import {
    deleteCodeLanguage,
    getCodeLanguage,
    getCodeLanguages,
    postCodeLanguage,
    putCodeLanguage
} from "../../api/config/codeLanguagesApi";
import {
    deleteInternetPlatform, getInternetPlatform,
    getInternetPlatforms,
    postInternetPlatform,
    putInternetPlatform
} from "../../api/config/internetPlatformsApi";
import {deleteCohort, getCohort, getCohorts, postCohort, putCohort} from "../../api/config/cohortesApi";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
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
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}


export default function Config(props) {
    console.log(props);
    const [value, setValue] = React.useState(0);
    const [codeFrameworks, setCodeFrameworks ] = React.useState(props.codeFrameworks);
    const [codeLanguages, setCodeLanguages ] = React.useState(props.codeLanguages);
    const [platforms, setPlatforms ] = React.useState(props.platforms);
    const [technologies, setTechnologies ] = React.useState(props.technologies);
    const [internetPlatforms, setInternetPlatforms ] = React.useState(props.internetPlatforms);
    const [cohorts, setCohorts ] = React.useState(props.cohorts);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const { data: session } = useSession();

    const codeFrameworksColumns = [
        {
            id: "id",
            required: false,
            visible: false,
            disabled: true,
            name: "id",
            label: "ID",
            maxlength: 15,
        },
        {
            id: "name",
            required: true,
            visible: true,
            disabled: false,
            name: "name",
            label: "Nombre",
            maxlength: 249,
        },
        {
            id: "imageLink",
            required: false,
            visible: false,
            disabled: false,
            name: "imageLink",
            label: "Link a imagen",
            maxlength: 249,
        },
        {
            id: "type",
            required: true,
            visible: true,
            disabled: false,
            name: "type",
            label: "Tipo",
            maxlength: 249,
        },
        {
            id: "description",
            required: true,
            visible: true,
            disabled: false,
            name: "description",
            label: "Descripción",
            maxlength: 249,
        },
    ]

    const codeLanguagesColumns = [
        {
            id: "id",
            required: false,
            visible: false,
            disabled: true,
            name: "id",
            label: "ID",
            maxlength: 15,
        },
        {
            id: "name",
            required: true,
            visible: true,
            disabled: false,
            name: "name",
            label: "Nombre",
            maxlength: 249,
        },
        {
            id: "type",
            required: true,
            visible: true,
            disabled: false,
            name: "type",
            label: "Tipo",
            maxlength: 249,
        },
    ]

    const platformsColumns = [
        {
            id: "id",
            required: false,
            visible: false,
            disabled: true,
            name: "id",
            label: "ID",
            maxlength: 15,
        },
        {
            id: "name",
            required: true,
            visible: true,
            disabled: false,
            name: "name",
            label: "Nombre",
            maxlength: 249,
        },
        {
            id: "type",
            required: true,
            visible: true,
            disabled: false,
            name: "type",
            label: "Tipo",
            maxlength: 249,
        }
    ]

    const technologiesColumns = [
        {
            id: "id",
            required: false,
            visible: false,
            disabled: true,
            name: "id",
            label: "ID",
            maxlength: 15,
        },
        {
            id: "name",
            required: true,
            visible: true,
            disabled: false,
            name: "name",
            label: "Nombre",
            maxlength: 249,
        },
        {
            id: "type",
            required: true,
            visible: true,
            disabled: false,
            name: "type",
            label: "Tipo",
            maxlength: 249,
        }
    ]

    const internetPlatformsColumns = [
        {
            id: "id",
            required: false,
            visible: false,
            disabled: true,
            name: "id",
            label: "ID",
            maxlength: 15,
        },
        {
            id: "name",
            required: true,
            visible: true,
            disabled: false,
            name: "name",
            label: "Nombre",
            maxlength: 249,
        },
        {
            id: "type",
            required: true,
            visible: true,
            disabled: false,
            name: "type",
            label: "Tipo",
            select: "ISSUE_TRACKER,REPOSITORY",
            maxlength: 249,
        },
        {
            id: "linkImageLogo",
            required: false,
            visible: false,
            disabled: false,
            name: "linkImageLogo",
            label: "Link a imagen del logo",
            maxlength: 249,
        },
        {
            id: "baseUrl",
            required: true,
            visible: true,
            disabled: false,
            name: "baseUrl",
            label: "URL del sitio web",
            maxlength: 249,
        },
    ]

    const cohortsColumns = [
        {
            id: "id",
            required: false,
            visible: false,
            disabled: true,
            name: "id",
            label: "ID",
            maxlength: 15,
        },
        {
            id: "semester",
            required: true,
            visible: true,
            disabled: false,
            isNumber: true,
            name: "semester",
            label: "Semestre",
            maxlength: 1,
        },
        {
            id: "year",
            required: true,
            visible: true,
            disabled: false,
            isNumber: true,
            name: "year",
            label: "Año",
            maxlength: 4,
        },
        {
            id: "cohortStatus",
            required: true,
            visible: true,
            disabled: false,
            name: "cohortStatus",
            label: "Status",
            select: "CLOSED,OPEN",
            maxlength: 249,
        },
        {
            id: "proposalLimit",
            required: true,
            visible: true,
            disabled: false,
            name: "proposalLimit",
            label: "Fecha limite para entregar propuesta",
            maxlength: 249,
        },
        {
            id: "workLimit",
            required: true,
            visible: true,
            disabled: false,
            name: "workLimit",
            label: "Fecha limite para finalizar el trabajo",
            maxlength: 249,
        },
        {
            id: "presentationLimit",
            required: true,
            visible: true,
            disabled: false,
            name: "presentationLimit",
            label: "Fecha limite para presentar la PS",
            maxlength: 249,
        }
    ];

    const handleAddDisabled = () => {
        return false;
    }

    const handleEditDisabled = () => {
        return false;
    }

    const handleDeleteDisabled = () => {
        return false;
    }

    const handleAddDisabledCohorts = (_cohorts) => {
        if(_cohorts) {
            return _cohorts.some(c => c.cohortStatus == 'OPEN');
        }
    }

    const handleEditDisabledCohort = (cohort) => {
        if(cohort) {
            return cohort.cohortStatus != 'OPEN';
        } else {
            return false;
        }
    }

    const handleDeleteDisabledCohort = (cohort) => {
        return true;
    }

    if (session && session.user.roles.includes("ADMIN")) {
        return (
            <Box
                sx={{flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 1000}}
            >
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{borderRight: 1, borderColor: 'divider', minWidth: '15%'}}
                >
                    <Tab label="Framewors" {...a11yProps(0)} />
                    <Tab label="Lenguajes" {...a11yProps(1)} />
                    <Tab label="Plataformas" {...a11yProps(2)} />
                    <Tab label="Tecnologías" {...a11yProps(3)} />
                    <Tab label="UX" {...a11yProps(4)} />
                    <Tab label="Herramientas" {...a11yProps(5)} />
                    <Tab label="Cohortes" {...a11yProps(6)} />
                </Tabs>
                <TabPanel value={value} index={0} sx={{width:'100%'}}>
                    <ConfigTable
                        title={"Framewors de código"}
                        description={"Description"}
                        rows={codeFrameworks}
                        setRows={setCodeFrameworks}
                        columns={codeFrameworksColumns}
                        putApi={putCodeFramework}
                        postApi={postCodeFramework}
                        deleteApi={deleteCodeFramework}
                        getAll={getCodeFrameworks}
                        getOne={getCodeFramework}
                        handleEditDisabled={handleEditDisabled}
                        handleDeleteDisabled={handleDeleteDisabled}
                        handleAddDisabled={handleAddDisabled}
                    />
                </TabPanel>
                <TabPanel value={value} index={1} sx={{width:'100%'}}>
                    <ConfigTable
                        title={"Lenguajes de código"}
                        description={"Description"}
                        rows={codeLanguages}
                        setRows={setCodeLanguages}
                        columns={codeLanguagesColumns}
                        putApi={putCodeLanguage}
                        postApi={postCodeLanguage}
                        deleteApi={deleteCodeLanguage}
                        getAll={getCodeLanguages}
                        getOne={getCodeLanguage}
                        handleEditDisabled={handleEditDisabled}
                        handleDeleteDisabled={handleDeleteDisabled}
                        handleAddDisabled={handleAddDisabled}
                    />
                </TabPanel>
                <TabPanel value={value} index={2} sx={{width:'100%'}}>
                    <ConfigTable
                        title={"Plataformas de trabajo/despliegue"}
                        description={"Description"}
                        rows={platforms}
                        setRows={setPlatforms}
                        columns={platformsColumns}
                        putApi={putCodeFramework}
                        postApi={postCodeFramework}
                        deleteApi={deleteCodeFramework}
                        handleEditDisabled={handleEditDisabled}
                        handleDeleteDisabled={handleDeleteDisabled}
                        handleAddDisabled={handleAddDisabled}
                    />
                </TabPanel>
                <TabPanel value={value} index={3} sx={{width:'100%'}}>
                    <ConfigTable
                        title={"Tecnologías"}
                        description={"Description"}
                        rows={technologies}
                        setRows={setTechnologies}
                        columns={technologiesColumns}
                        putApi={putCodeFramework}
                        postApi={postCodeFramework}
                        deleteApi={deleteCodeFramework}
                        handleEditDisabled={handleEditDisabled}
                        handleDeleteDisabled={handleDeleteDisabled}
                        handleAddDisabled={handleAddDisabled}
                    />
                </TabPanel>
                <TabPanel value={value} index={4} sx={{width:'100%'}}>
                    Item Five
                </TabPanel>
                <TabPanel value={value} index={5} sx={{width:'100%'}}>
                    <ConfigTable
                        title={"Herramientas de Internet"}
                        description={"Description"}
                        rows={internetPlatforms}
                        setRows={setInternetPlatforms}
                        columns={internetPlatformsColumns}
                        putApi={putInternetPlatform}
                        postApi={postInternetPlatform}
                        deleteApi={deleteInternetPlatform}
                        getAll={getInternetPlatforms}
                        getOne={getInternetPlatform}
                        handleEditDisabled={handleEditDisabled}
                        handleDeleteDisabled={handleDeleteDisabled}
                        handleAddDisabled={handleAddDisabled}
                    />
                </TabPanel>
                <TabPanel value={value} index={6} sx={{width:'100%'}}>
                    <ConfigTable
                        title={"Cohortes"}
                        description={"Description"}
                        rows={cohorts}
                        setRows={setCohorts}
                        columns={cohortsColumns}
                        putApi={putCohort}
                        postApi={postCohort}
                        deleteApi={deleteCohort}
                        getAll={getCohorts}
                        getOne={getCohort}
                        handleEditDisabled={handleEditDisabledCohort}
                        handleDeleteDisabled={handleDeleteDisabledCohort}
                        handleAddDisabled={handleAddDisabledCohorts}
                    />
                </TabPanel>
            </Box>
        );
    } else {
        return (
            <div>
                <h1>You are not authorized to view this page!</h1>
            </div>
        );
    }
}

Config.auth = true;

export async function getServerSideProps(context) {

    const { req } = context;
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
        const resCodeFrameworks = await fetch('http://localhost:8080/ps/config/code/frameworks', options);
        const resCodeLanguages = await fetch('http://localhost:8080/ps/config/code/languages', options);
        const resPlatforms = await fetch('http://localhost:8080/ps/config/platforms', options);
        const resTechnologies = await fetch('http://localhost:8080/ps/config/technologies', options);
        const resInternetPlatforms = await fetch('http://localhost:8080/ps/config/internet/platforms', options);
        const resCohorts = await fetch('http://localhost:8080/ps/config/cohorts', options);
        const codeFrameworks = await resCodeFrameworks.json();
        const codeLanguages = await resCodeLanguages.json();
        const platforms = await resPlatforms.json();
        const technologies = await resTechnologies.json();
        const internetPlatforms = await resInternetPlatforms.json();
        const cohorts = await resCohorts.json();
        // Pass data to the page via props
        return {props: {codeFrameworks, codeLanguages, platforms, technologies, internetPlatforms, cohorts}}
    } else {
        return {props: {}};
    }
}
