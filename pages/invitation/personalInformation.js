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
    const { student, setStudent, handleNext } = props;
    const [formValidation, setFormValidation] = React.useState(false);
    const [errors, setErrors] = React.useState({
        name: false,
        lastName: false,
        identificationType: false,
        identification: false,
        birthday: false
    })

    const handleOnBlur = (event) => {
        const { name, value } = event.target;
        if (['identificationType', 'identification'].includes(name)) {
            student.personIdentification[name] = value || null;
        }
        student[name] = value || null;
        setStudent(student);
        setErrors({
            ...errors,
            [name]: !value,
        });
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
                            error={errors.name}
                            id="name"
                            name="name"
                            label="Nombre"
                            fullWidth
                            autoComplete="name"
                            variant="standard"
                            defaultValue={student.name}
                            onBlur={handleOnBlur}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            error={errors.lastName}
                            id="lastName"
                            name="lastName"
                            label="Apellido"
                            fullWidth
                            autoComplete="lastName"
                            variant="standard"
                            defaultValue={student.lastName}
                            onBlur={handleOnBlur}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Select
                            labelId="identificationType-select"
                            id="identificationType-select"
                            name="identificationType"
                            label="Tipo de identificación"
                            fullWidth
                            required
                            error={errors.identificationType}
                            defaultValue={student.personIdentification.identificationType || "DNI"}
                            onBlur={handleOnBlur}
                        >
                            <MenuItem value="DNI">DNI</MenuItem>
                            <MenuItem value="CUIL">CUIL</MenuItem>
                            <MenuItem value="CUIT">CUIT</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            error={errors.identification}
                            id="identification"
                            name="identification"
                            label="Número de identificación"
                            fullWidth
                            autoComplete="identification"
                            variant="standard"
                            defaultValue={student.personIdentification.identification}
                            onBlur={handleOnBlur}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            error={errors.birthday}
                            id="birthday"
                            name="birthday"
                            type="date"
                            label="Fecha de nacimiento"
                            sx={{ width: 220 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            defaultValue={student.birthday? student.birthday : "1900-01-01"}
                            onBlur={handleOnBlur}
                        />
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} >
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