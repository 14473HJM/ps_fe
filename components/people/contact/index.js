import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import {useSession, getSession} from "next-auth/react";
import axios from "axios";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {useTheme} from "@mui/material/styles";
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import DeleteIcon from '@mui/icons-material/Delete';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import PhoneIcon from '@mui/icons-material/Phone';
import ContactlessIcon from '@mui/icons-material/Contactless';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function ContactForm({ person: { personalContacts } }) {

    const { data: session, status } = useSession();

    const theme = useTheme();

    const handleSubmit = (event) => {
        event.preventDefault();
        const address = {
            street: event.target.street.value,
            streetNumber: event.target.streetNumber.value,
            zipCode: event.target.zipCode.value,
            detail: event.target.detail.value,
            city: event.target.city.value,
            province: {province}.province,
            country: 'AR'
        }
        const {user} = session;
        const {access_token} = user;
        const {id} = user;
        const res = postAddress(address, access_token, id);
    };

    return (
        <React.Fragment>
            <Box component="form"
                 onSubmit={handleSubmit}
                 noValidate sx={{ mt: 1 }}
            >
                <Grid container spacing={3}>
                    <Grid items xs={12} sm={10}>
                        <Typography variant="h5" gutterBottom>
                            Set your contact information
                        </Typography>
                    </Grid>
                    <Grid items xs={12} sm={2}>
                        <Fab color="primary" aria-label="add" size="medium">
                            <AddIcon />
                        </Fab>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        {personalContacts ?
                            personalContacts.map(
                            (contact) => (
                                getContactCard(contact)
                            )):<></>}
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    );
}

export function getContactCard(contact) {
    console.log(contact);
    return(
        <Card sx={{ display: 'flex', m:1, maxHeight:70}}>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                {getContactIcon(contact.contactType)}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', m:1, width:1 }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    {getContactValue(contact)}
                </CardContent>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', m:1 }}>
                <Fab color="primary" aria-label="add" size="small" sx={{m:0.5}}>
                    <EditIcon sx={{ height: 20, width: 20 }}/>
                </Fab>
                <Fab color="error" aria-label="add" size="small" sx={{m:0.5}}>
                    <DeleteIcon sx={{ height: 20, width: 20 }}/>
                </Fab>
            </Box>
        </Card>
    );
}

export function getSocialNetworkCard(socialNetwork) {
    console.log(socialNetwork);
    return(
        <Card sx={{ display: 'flex', m:1, maxHeight:70}}>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                {getContactIcon(socialNetwork.internetPlatform)}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', m:1, width:1 }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    {getSocialNetworkValue(socialNetwork)}
                </CardContent>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', m:1 }}>
                <Fab color="primary" aria-label="add" size="small" sx={{m:0.5}}>
                    <EditIcon sx={{ height: 20, width: 20 }}/>
                </Fab>
                <Fab color="error" aria-label="add" size="small" sx={{m:0.5}}>
                    <DeleteIcon sx={{ height: 20, width: 20 }}/>
                </Fab>
            </Box>
        </Card>
    );
}

function getContactIcon(contactType) {
    switch (contactType) {
        case 'EMAIL':
            return(<EmailIcon color="disabled" sx={{ height: 50, width: 50 }}/>);
            break;
        case 'CELLPHONE':
            return(<SmartphoneIcon color="disabled" sx={{ height: 50, width: 50 }}/>);
            break;
        case 'PHONE':
            return(<PhoneIcon color="disabled" sx={{ height: 50, width: 50 }}/>);
            break;
        case 'FACEBOOK':
            return(<FacebookIcon color="disabled" sx={{ height: 50, width: 50 }}/>);
            break;
        case 'LINKEDIN':
            return(<LinkedInIcon color="disabled" sx={{ height: 50, width: 50 }}/>);
            break;
        case 'INSTAGRAM':
            return(<InstagramIcon color="disabled" sx={{ height: 50, width: 50 }}/>);
            break;
        case 'TWEETER':
            return(<TwitterIcon color="disabled" sx={{ height: 50, width: 50 }}/>);
            break;
        case 'YOUTUBE':
            return(<YouTubeIcon color="disabled" sx={{ height: 50, width: 50 }}/>);
            break;
        default:
            return(<ContactlessIcon color="disabled" sx={{ height: 50, width: 50 }}/>);
            break;
    }
}

function getContactValue(contact) {
    let title = "Others";
    switch (contact.contactType) {
        case 'EMAIL':
            title = "Email";
            break;
        case 'CELLPHONE':
            title = "Celular";
            break;
        case 'PHONE':
            title = "Tel??fono";
            break;
        default:
            title = "Email";
            break;
    }
    return(
        <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h6">
                {title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
                {contact.value}
            </Typography>
        </CardContent>
    );
}

function getSocialNetworkValue(socialNetwork) {
    let title = "Others";
    switch (socialNetwork.internetPlatform) {
        case 'LINKEDIN':
            title = "LinkedIn";
            break;
        case 'FACEBOOK':
            title = "Facebook";
            break;
        case 'INSTAGRAM':
            title = "Instagram";
            break;
        case 'TWITTER':
            title = "Twitter";
            break;
        case 'YOUTUBE':
            title = "Youtube";
            break;
        default:
            title = "Otros";
            break;
    }
    return(
        <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h6">
                {title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
                {socialNetwork.profileName}
            </Typography>
        </CardContent>
    );
}

async function postPeople(address, access_token, user_id) {
    // const res = await fetch('http://localhost:8080/ps/users/'.concat(3,'/address'), {
    //     mode: 'no-cors',
    //     method: 'POST',
    //     body: JSON.stringify(address),
    //     headers: { accept: '*/*',
    //         'Content-Type': 'application/json',
    //         'Access-Control-Allow-Origin':'*',}
    // });
    // const data = await res.json();
    // return data;

    return axios({
        method: 'post',
        url: 'http://localhost:8080/ps/users/' + user_id + '/address',
        data: address,
        headers: {
            'accept': '*/*',
            'charset': 'UTF-8',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'Authorization': 'Bearer ' + access_token,
        },
        mode: 'no-cors',
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}