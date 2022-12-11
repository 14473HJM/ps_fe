import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AddressForm from "../../components/people/address";
import {useSession, getSession } from "next-auth/react";
import PeopleForm from "../../components/people/people";
import ContactForm from "../../components/people/contact";
import { getUser } from '../../services/users.service';

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

export default function BasicTabs({ users }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Personal Data" {...a11yProps(0)} />
                    <Tab label="Address" {...a11yProps(1)} />
                    <Tab label="Contact Information" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <PeopleForm {...users} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <AddressForm {...users} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ContactForm {...users} />
            </TabPanel>
        </Box>
    );
}

BasicTabs.auth = true;

export async function getServerSideProps(context) {
    return await getUser(context);
}
