import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {useSession} from "next-auth/react";
import axios from "axios";


export default function AddressForm() {

    const { data: session, status } = useSession();

    const [province, setProvince] = React.useState('');

    const handleChange = (event) => {
        setProvince(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(event.target.street.value)
        // console.log(event.target.streetNumber.value)
        // console.log(event.target.zipCode.value)
        // console.log(event.target.detail.value)
        // console.log(event.target.city.value)
        // console.log({province})
        // console.log(event.target.country.value)
        const address = {
            street: event.target.street.value,
            streetNumber: event.target.streetNumber.value,
            zipCode: event.target.zipCode.value,
            detail: event.target.detail.value,
            city: event.target.city.value,
            province: {province},
            country: 'AR'
        }
        const res = postAddress(address, session);
    };

    return (
        <React.Fragment>
            <Box component="form"
                 onSubmit={handleSubmit}
                 noValidate sx={{ mt: 1 }}
            >
                <Typography variant="h6" gutterBottom>
                    Set your personal address
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="street"
                            name="street"
                            label="Street Name"
                            fullWidth
                            autoComplete="street"
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="streetNumber"
                            name="streetNumber"
                            label="Street Number"
                            fullWidth
                            autoComplete="streetNumber"
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="zipCode"
                            name="zipCode"
                            label="Zip / Postal code"
                            fullWidth
                            autoComplete="zipCode"
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="detail"
                            name="detail"
                            label="Additional Details"
                            fullWidth
                            autoComplete="detail"
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="city"
                            name="city"
                            label="City"
                            fullWidth
                            autoComplete="city"
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Select
                            labelId="province-select"
                            id="province-select"
                            value={province}
                            label="Age"
                            onChange={handleChange}
                            fullWidth
                        >
                            <MenuItem value="B">Buenos Aires</MenuItem>
                            <MenuItem value="K">Catamarca</MenuItem>
                            <MenuItem value="H">Chaco</MenuItem>
                            <MenuItem value="U">Chubut</MenuItem>
                            <MenuItem value="C">Ciudad Autónoma de Buenos Aires</MenuItem>
                            <MenuItem value="W">Corrientes</MenuItem>
                            <MenuItem value="X">Córdoba</MenuItem>
                            <MenuItem value="E">Entre Ríos</MenuItem>
                            <MenuItem value="P">Formosa</MenuItem>
                            <MenuItem value="Y">Jujuy</MenuItem>
                            <MenuItem value="L">La Pampa</MenuItem>
                            <MenuItem value="F">La Rioja</MenuItem>
                            <MenuItem value="M">Mendoza</MenuItem>
                            <MenuItem value="N">Misiones</MenuItem>
                            <MenuItem value="Q">Neuquén</MenuItem>
                            <MenuItem value="R">Río Negro</MenuItem>
                            <MenuItem value="A">Salta</MenuItem>
                            <MenuItem value="J">San Juan</MenuItem>
                            <MenuItem value="D">San Luis</MenuItem>
                            <MenuItem value="Z">Santa Cruz</MenuItem>
                            <MenuItem value="S">Santa Fe</MenuItem>
                            <MenuItem value="G">Santiago del Estero</MenuItem>
                            <MenuItem value="V">Tierra del Fuego</MenuItem>
                            <MenuItem value="T">Tucumán</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="country"
                            name="country"
                            label="Country"
                            fullWidth
                            autoComplete="country"
                            variant="standard"
                            disabled
                            defaultValue="Argentina"
                        />
                    </Grid>
                    <Grid item xs={12}
                          container
                          direction="row"
                          justifyContent="flex-end"
                          alignItems="center">
                        <Button variant="contained" type="submit" >Save</Button>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    );
}

async function postAddress({address, session}) {

    axios.post(`http://localhost:8080/ps/users/`.concat(16,'/address'), {
        address
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}