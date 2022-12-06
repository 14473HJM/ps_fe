import * as React from 'react';
import { useSession, getSession } from "next-auth/react"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PropTypes from "prop-types";
import {CodeFrameworksCardList, CodeFrameworksTable} from "../../../components/config/code-frameworks";
import {Title1} from "../../../components/common/title";
import {getToken} from "next-auth/jwt";
import {getCodeFrameworks} from "../../api/config";
import {CodeLanguagesTable} from "../../../components/config/code-language";
import {PlatformsTable} from "../../../components/config/platform";

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

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const { data: session } = useSession()

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
                    <Tab label="UserInterface" {...a11yProps(4)} />
                    <Tab label="Cohort" {...a11yProps(5)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <CodeFrameworksTable codeFrameworks={codeFrameworks}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <CodeLanguagesTable codeLanguages={codeLanguages} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <PlatformsTable platforms={platforms} />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    Item Four
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
        const codeFrameworks = await resCodeFrameworks.json();
        const codeLanguages = await resCodeLanguages.json();
        const platforms = await resPlatforms.json();
        // Pass data to the page via props
        return {props: {codeFrameworks, codeLanguages, platforms}}
    } else {
        return {props: {}};
    }
}

