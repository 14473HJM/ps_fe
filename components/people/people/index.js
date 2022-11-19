import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {useSession, getSession} from "next-auth/react";
import axios from "axios";

export default function PeopleForm({legajo, context}) {

    const { data: session, status } = useSession();

    const [identificationType, setIdentificationType] = React.useState('');

    const handleChangeIdentificationType = (event) => {
        setIdentificationType(event.target.value);
    };

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
                 noValidate
                 sx={{ mt: 1 }}
            >
                <Typography variant="h6" gutterBottom>
                    Set your personal information
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="legajo"
                            name="legajo"
                            label="Legajo"
                            fullWidth
                            autoComplete="legajo"
                            variant="standard"
                            defaultValue={legajo}
                            disabled={legajo? true : false}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="name"
                            name="name"
                            label="Name"
                            fullWidth
                            autoComplete="name"
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            fullWidth
                            autoComplete="lastName"
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Select
                            labelId="identificationType-select"
                            id="identificationType-select"
                            value={identificationType}
                            label="Identification Type"
                            onChange={handleChangeIdentificationType}
                            fullWidth
                        >
                            <MenuItem value="DNI">DNI</MenuItem>
                            <MenuItem value="CUIL">CUIL</MenuItem>
                            <MenuItem value="CUIT">CUIT</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="identification"
                            name="identification"
                            label="Identification Number"
                            fullWidth
                            autoComplete="identification"
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            id="birthday"
                            name="birthday"
                            type="date"
                            defaultValue="2000-01-01"
                            label="Birth Day"
                            //value={birthdate}
                            sx={{ width: 220 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    {context ?
                        <Grid item xs={12}
                              container
                              direction="row"
                              justifyContent="flex-end"
                              alignItems="center">
                            <Button variant="contained" type="submit">Save</Button>
                        </Grid> : <></>
                    }
                </Grid>
            </Box>
        </React.Fragment>
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