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
    const [value, setValue] = React.useState(0);
    const [codeFrameworks, setCodeFrameworks ] = React.useState(props.codeFrameworks);
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
                    <Tab label="Item Two" {...a11yProps(1)} />
                    <Tab label="Item Three" {...a11yProps(2)} />
                    <Tab label="Item Four" {...a11yProps(3)} />
                    <Tab label="Item Five" {...a11yProps(4)} />
                    <Tab label="Item Six" {...a11yProps(5)} />
                    <Tab label="Item Seven" {...a11yProps(6)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                        <CodeFrameworksTable codeFrameworks={codeFrameworks}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Item Two
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three
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
                <TabPanel value={value} index={6}>
                    Item Seven
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
        const res = await fetch('http://localhost:8080/ps/config/code/frameworks', options);
        console.log(res);
        const codeFrameworks = await res.json();
        // Pass data to the page via props
        console.log(codeFrameworks);
        return {props: {codeFrameworks}}
    } else {
        return {props: {_project: {}}};
    }
}

