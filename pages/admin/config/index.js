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
            label: "ID"
        },
        {
            id: "name",
            required: true,
            visible: true,
            disabled: false,
            name: "name",
            label: "Nombre"
        },
        {
            id: "imageLink",
            required: false,
            visible: false,
            disabled: false,
            name: "imageLink",
            label: "Link a imagen"
        },
        {
            id: "type",
            required: true,
            visible: true,
            disabled: false,
            name: "type",
            label: "Tipo"
        },
        {
            id: "description",
            required: true,
            visible: true,
            disabled: false,
            name: "description",
            label: "Descripción"
        },
    ]

    const codeLanguagesColumns = [
        {
            id: "id",
            required: false,
            visible: true,
            disabled: true,
            name: "id",
            label: "ID"
        },
        {
            id: "name",
            required: true,
            visible: true,
            disabled: false,
            name: "name",
            label: "Nombre"
        },
        {
            id: "type",
            required: true,
            visible: true,
            disabled: false,
            name: "type",
            label: "Tipo"
        },
    ]

    const platformsColumns = [
        {
            id: "id",
            required: false,
            visible: true,
            disabled: true,
            name: "id",
            label: "ID"
        },
        {
            id: "name",
            required: true,
            visible: true,
            disabled: false,
            name: "name",
            label: "Nombre"
        },
        {
            id: "type",
            required: true,
            visible: true,
            disabled: false,
            name: "type",
            label: "Tipo"
        }
    ]

    const technologiesColumns = [
        {
            id: "id",
            required: false,
            visible: true,
            disabled: true,
            name: "id",
            label: "ID"
        },
        {
            id: "name",
            required: true,
            visible: true,
            disabled: false,
            name: "name",
            label: "Nombre"
        },
        {
            id: "type",
            required: true,
            visible: true,
            disabled: false,
            name: "type",
            label: "Tipo"
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
                    sx={{borderRight: 1, borderColor: 'divider'}}
                >
                    <Tab label="Code Frameworks" {...a11yProps(0)} />
                    <Tab label="Code Languages" {...a11yProps(1)} />
                    <Tab label="Platform" {...a11yProps(2)} />
                    <Tab label="Technology" {...a11yProps(3)} />
                    <Tab label="User Interface" {...a11yProps(4)} />
                    <Tab label="Cohort" {...a11yProps(5)} />
                    <Tab label="Test" {...a11yProps(6)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <ConfigTable
                        title={"Code Framewors"}
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
                        title={"Code Languages"}
                        description={"Description"}
                        rows={codeLanguages}
                        setRows={setCodeLanguages}
                        columns={codeLanguagesColumns}
                        putApi={putCodeFramework}
                        postApi={postCodeFramework}
                        deleteApi={deleteCodeFramework}
                    />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <ConfigTable
                        title={"Platforms"}
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
                        title={"Technologies"}
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
                <TabPanel value={value} index={6}>
                    <ConfigTable
                        title={"Code Framewors"}
                        description={"Description"}
                        rows={codeFrameworks}
                        columns={codeFrameworksColumns}
                        putApi={putCodeFramework}
                        postApi={postCodeFramework}
                        deleteApi={deleteCodeFramework}
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
