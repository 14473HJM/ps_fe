import {useSession} from "next-auth/react";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";


export default function AddressInformation(props) {

    const student = props.student;
    const setStudent = props.setStudent;
    const handleNext = props.handleNext;
    const handleBack = props.handleBack;
    const [province, setProvince] = React.useState('X');
    const [formValidation, setFormValidation] = React.useState(false);

    const handleProvince = (event) => {
        console.log(event.target)
        setProvince(event.target.value);
        student.address.province = province;
        handleChangeForm();
    };

    const handleStreet = (event) => {
        event.preventDefault();
        if(!event.target.value && !event.target.value.trim().length) {
            student.address.street = null;
        } else {
            student.address.street = event.target.value;
            setStudent(student);
        }
        handleChangeForm();
    };

    const handleStreetNumber = (event) => {
        if(!event.target.value && !event.target.value.trim().length) {
            student.address.streetNumber = null;
        } else {
            student.address.streetNumber = event.target.value;
            setStudent(student);
        }
        handleChangeForm();
    };

    const handleZipCode = (event) => {
        if(!event.target.value && !event.target.value.trim().length) {
            student.address.zipCode = null;
        } else {
            student.address.zipCode = event.target.value;
            setStudent(student);
        }
        handleChangeForm();
    };

    const handleDetail = (event) => {
        if(!event.target.value && !event.target.value.trim().length) {
            student.address.detail = null;
        } else {
            student.address.detail = event.target.value;
            setStudent(student);
        }
        handleChangeForm();
    };

    const handleCity = (event) => {
        if(!event.target.value && !event.target.value.trim().length) {
            student.address.city = null;
        } else {
            student.address.city = event.target.value;
            setStudent(student);
        }
        handleChangeForm();
    };

    const handleChangeForm = () => {
        console.log(student)
        if(student.address.street != null &&
            student.address.streetNumber != null &&
            student.address.province &&
            student.address.city != null &&
            student.address.zipCode != null){
            setFormValidation(true);
        } else {
            setFormValidation(false);
        }
    }

    return (
        <React.Fragment>
            <Box component="form"
                 onSubmit={handleNext}
                 noValidate sx={{ mt: 1 }}
            >
                <Typography variant="h4" gutterBottom>
                    Ingresá tu domicilio actual
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
                            defaultValue={student.address.street}
                            onBlur={handleStreet}
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
                            defaultValue={student.address.streetNumber}
                            onBlur={handleStreetNumber}
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
                            defaultValue={student.address.zipCode}
                            onBlur={handleZipCode}
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
                            defaultValue={student.address.detail}
                            onBlur={handleDetail}
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
                            defaultValue={student.address.city}
                            onBlur={handleCity}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Select
                            labelId="province-select"
                            id="province-select"
                            value={province}
                            label="Age"
                            onChange={handleProvince}
                            fullWidth
                            onBlur={handleProvince}
                        >
                            <MenuItem value="Buenos Aires">Buenos Aires</MenuItem>
                            <MenuItem value="Catamarca">Catamarca</MenuItem>
                            <MenuItem value="Chaco">Chaco</MenuItem>
                            <MenuItem value="Chubut">Chubut</MenuItem>
                            <MenuItem value="Ciudad Autónoma de Buenos Aires">Ciudad Autónoma de Buenos Aires</MenuItem>
                            <MenuItem value="Corrientes">Corrientes</MenuItem>
                            <MenuItem value="C">Córdoba</MenuItem>
                            <MenuItem value="Entre Ríos">Entre Ríos</MenuItem>
                            <MenuItem value="Formosa">Formosa</MenuItem>
                            <MenuItem value="Jujuy">Jujuy</MenuItem>
                            <MenuItem value="La Pampa">La Pampa</MenuItem>
                            <MenuItem value="La Rioja">La Rioja</MenuItem>
                            <MenuItem value="Mendoza">Mendoza</MenuItem>
                            <MenuItem value="Misiones">Misiones</MenuItem>
                            <MenuItem value="Neuquén">Neuquén</MenuItem>
                            <MenuItem value="Río Negro">Río Negro</MenuItem>
                            <MenuItem value="Salta">Salta</MenuItem>
                            <MenuItem value="San Juan">San Juan</MenuItem>
                            <MenuItem value="San Luis">San Luis</MenuItem>
                            <MenuItem value="Santa Cruz">Santa Cruz</MenuItem>
                            <MenuItem value="Santa Fe">Santa Fe</MenuItem>
                            <MenuItem value="Santiago del Estero">Santiago del Estero</MenuItem>
                            <MenuItem value="Tierra del Fuego">Tierra del Fuego</MenuItem>
                            <MenuItem value="Tucumán">Tucumán</MenuItem>
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
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} >
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Back
                    </Button>

                    <Button
                        variant="contained"
                        sx={{ mt: 3, ml: 1 }}
                        disabled={!formValidation}
                        type={"submit"}
                    >Siguiente</Button>
                </Box>
            </Box>
        </React.Fragment>
    );
}