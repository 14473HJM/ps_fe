import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

export default function PersonlInformation(props) {

    const student = props.student;
    const setStudent = props.setStudent;
    const handleNext = props.handleNext;
    const [formValidation, setFormValidation] = React.useState(false);

    const handleName = (event) => {
        event.preventDefault();
        if(!event.target.value && !event.target.value.trim().length) {
            student.name = null;
        } else {
            student.name = event.target.value;
            setStudent(student);
        }
        handleChangeForm();
    };

    const handleLastName = (event) => {
        if(!event.target.value && !event.target.value.trim().length) {
            student.lastName = null
        } else {
            student.lastName = event.target.value;
            setStudent(student);
        }
        handleChangeForm();
    };

    const handleIdType = (event) => {
        if(!event.target.value && !event.target.value.trim().length) {
            student.personIdentification.identificationType = null;
        } else {
            student.personIdentification.identificationType = event.target.value;
            setStudent(student);
        }
        handleChangeForm();
    };

    const handleIdentification = (event) => {
        if(!event.target.value && !event.target.value.trim().length) {
            student.personIdentification.identification = null;
        } else {
            student.personIdentification.identification = event.target.value;
            setStudent(student);
        }
        handleChangeForm();
    };

    const handleBirthDay = (event) => {
        if(!event.target.value && !event.target.value.trim().length) {
            student.birthday = null;
        } else {
            student.birthday = event.target.value;
            setStudent(student);
        }
        handleChangeForm();
    };

    const handleChangeForm = () => {
        if(student.name != null &&
            student.lastName != null &&
            student.personIdentification &&
            student.personIdentification.identificationType != null &&
            student.personIdentification.identification != null &&
            student.universityIdentification.identificationType != null &&
            student.universityIdentification.identification != null) {
            setFormValidation(true);
        } else {
            if(student.universityIdentification.identification == null && props.legajo != null) {
                student.universityIdentification.identification = props.legajo;
            }
            setFormValidation(false);
        }
    }

    const handleErrors = () => {
        return (
            <React.Fragment>
                {student.name == null?
            (<Alert severity="error">El nombre es requerido para seguir adelante</Alert>) : <></>}
                {student.lastName == null?
            (<Alert severity="error">El apellido es requerido para seguir adelante</Alert>) : <></>}
                {student.personIdentification.identificationType == null ?
            (<Alert severity="error">El tipo de documento es requerido para seguir adelante</Alert>) : <></>}
                {student.personIdentification.identification == null ?
            (<Alert severity="error">El numero de documento para seguir adelante</Alert>) : <></>}
        </React.Fragment>);
    }

    return (
        <React.Fragment>
            <Box component="form"
                 onSubmit={handleNext}
                 onChange={handleErrors}
                 noValidate sx={{ mt: 1 }}
            >
                <Typography variant="h6" gutterBottom>
                    Ingresá tus datos personales
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            requiredMessage="This field is required."
                            errorTarget="under"
                            id="legajo"
                            name="legajo"
                            label="Legajo"
                            fullWidth
                            autoComplete="legajo"
                            variant="standard"
                            defaultValue={student.universityIdentification.identification}
                            disabled={true}
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
                            defaultValue={student.name}
                            onBlur={handleName}
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
                            defaultValue={student.lastName}
                            onBlur={handleLastName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Select
                            labelId="identificationType-select"
                            id="identificationType-select"
                            label="Identification Type"
                            fullWidth
                            required
                            defaultValue={student.personIdentification.identificationType? student.personIdentification.identificationType : "DNI"}
                            onBlur={handleIdType}
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
                            defaultValue={student.personIdentification.identification}
                            onBlur={handleIdentification}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            id="birthday"
                            name="birthday"
                            type="date"
                            label="Birth Day"
                            sx={{ width: 220 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            defaultValue={student.birthday? student.birthday : "1900-01-01"}
                            onBlur={handleBirthDay}
                        />
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} >
                    <Button
                        variant="contained"
                        sx={{ mt: 3, ml: 1 }}
                        disabled={!formValidation}
                        type={"submit"}
                    >Next</Button>
                </Box>
            </Box>
            <Box id="errors" sx={{ mt: 1 }}>
                {handleErrors()}
            </Box>
        </React.Fragment>
    );
}