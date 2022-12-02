import * as React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function ProjectInformation(props) {

    const [project, setProject]  = React.useState(props.project);
    const isDisabled = props.isDisabled;
    console.log(props);

    return(
        <React.Fragment>
            <Box component="form"
                 noValidate sx={{ mt: 1 }}
                 alignItems="center"
                 disabled={isDisabled}
            >
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12}>
                        <Typography variant="h6" gutterBottom>
                            Nombre del proyecto
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            requiredMessage="This field is required."
                            errorTarget="under"
                            id="name"
                            name="name"
                            //label="Nombre"
                            fullWidth
                            autoComplete="name"
                            //variant="standard"
                            defaultValue={project.name ? project.name : null}
                            disabled={isDisabled}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Typography variant="h6" gutterBottom>
                            Descripción del proyecto
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            id="description"
                            name="description"
                            //label="Descripción"
                            fullWidth
                            autoComplete="description"
                            multiline
                            rows={2}
                            //variant="standard"
                            defaultValue={project.description ? project.description : null}
                            //onBlur={handleName}
                            disabled={isDisabled}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Typography variant="h6" gutterBottom>
                            Objetivo del Sistema de Información
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            id="objective"
                            name="objective"
                            //label="Objetivo"
                            fullWidth
                            autoComplete="objective"
                            multiline
                            rows={4}
                            //variant="standard"
                            defaultValue={project.objective ? project.objective : null}
                            //onBlur={handleName}
                            disabled={isDisabled}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Typography variant="h6" gutterBottom>
                            Limite del Sistema de Información
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            id="projectLimit"
                            name="projectLimit"
                            //label="Limite"
                            fullWidth
                            autoComplete="projectLimit"
                            multiline
                            rows={3}
                            //variant="standard"
                            defaultValue={project.projectLimit ? project.projectLimit : null}
                            //onBlur={handleName}
                            disabled={isDisabled}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Typography variant="h6" gutterBottom>
                            Tipo de proyecto
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} >
                        <Select
                            labelId="projectType"
                            id="projectType"
                            //label="projectType"
                            fullWidth
                            required
                            defaultValue={project.projectType ? project.projectType : null}
                            //onBlur={handleIdType}
                            disabled={isDisabled}
                        >
                            <MenuItem value="WEB">Web</MenuItem>
                            <MenuItem value="MOBILE">Mobile</MenuItem>
                            <MenuItem value="WEB_MOBILE">Web & Mobile</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={4} ml={8}>
                        <FormControlLabel control={
                            <Checkbox disabled={isDisabled} checked={project.isRealProject ? project.isRealProject : false}/>
                        } label="Es un proyecto real" />
                    </Grid>
                    <Grid item xs={12} sm={4} ml={8}>

                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Typography variant="h6" gutterBottom>
                            Imagen del proyecto
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} >
                        <TextField
                            required
                            requiredMessage="This field is required."
                            errorTarget="under"
                            id="imageLink"
                            name="imageLink"
                            label="Link"
                            fullWidth
                            autoComplete="imageLink"
                            //variant="standard"
                            defaultValue={project.imageLink ? project.imageLink : null}
                            disabled={isDisabled}
                        />
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} >
                    <Button
                        variant="contained"
                        sx={{ mt: 3, ml: 1 }}
                        type={"submit"}
                        disabled={isDisabled}
                    >Enviar</Button>
                </Box>
            </Box>

        </React.Fragment>
    );

}
