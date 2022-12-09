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
            visible: true,
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
            visible: true,
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
            visible: true,
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
                    <Tab label="Framewors de código" {...a11yProps(0)} />
                    <Tab label="Lenguajes de código" {...a11yProps(1)} />
                    <Tab label="Plataformas de trabajo" {...a11yProps(2)} />
                    <Tab label="Tecnologías" {...a11yProps(3)} />
                    <Tab label="Interfaces de usuario" {...a11yProps(4)} />
                    <Tab label="Cohortes" {...a11yProps(5)} />
                </Tabs>
                <TabPanel value={value} index={0}>
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
                    />
                </TabPanel>
                <TabPanel value={value} index={1}>
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
                    />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <ConfigTable
                        title={"Plataformas de trabajo"}
                        description={"Description"}
                        rows={platforms}
                        setRows={setPlatforms}
                        columns={platformsColumns}
                        putApi={putCodeFramework}
                        postApi={postCodeFramework}
                        deleteApi={deleteCodeFramework}
                    />
                </TabPanel>
                <TabPanel value={value} index={3} sx={{width: 1}}>
                    <ConfigTable
                        title={"Tecnologías"}
                        description={"Description"}
                        rows={technologies}
                        setRows={setTechnologies}
                        columns={technologiesColumns}
                        putApi={putCodeFramework}
                        postApi={postCodeFramework}
                        deleteApi={deleteCodeFramework}
                    />
                </TabPanel>
                <TabPanel value={value} index={4}>
                    Item Five
                </TabPanel>
                <TabPanel value={value} index={5}>
                    Item Six
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
        const codeFrameworks = await resCodeFrameworks.json();
        const codeLanguages = await resCodeLanguages.json();
        const platforms = await resPlatforms.json();
        const technologies = await resTechnologies.json();
        // Pass data to the page via props
        return {props: {codeFrameworks, codeLanguages, platforms, technologies}}
    } else {
        return {props: {}};
    }
}
