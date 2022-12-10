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
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { useRouter } from 'next/router'
import usePost from '../../hooks/usePost';

export default function ProjectInformation(props) {
    const [project, setProject] = React.useState(props.project);
    const [isDisabled, setIsDisabled] = React.useState(props.isDisabled);
    const [body, setBody] = React.useState(null);
    const [currentScope, setCurrentScope] = React.useState('');
    const [scopes, setScopes] = React.useState([]);
    const { data, error, loading } = usePost('/api/projects', body);
    const router = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault();
        const {
            name,
            description,
            objective,
            projectLimit,
            projectType,
            isRealProject,
            imageLink,
        } = e.target;

        const formData = {
            name: name.value,
            description: description.value,
            objective: objective.value,
            projectLimit: projectLimit.value,
            projectType: projectType.value,
            isRealProject: isRealProject.checked,
            imageLink: imageLink.value,
            scopes,
        }

        console.log('FORM DATA: ', formData);
        setBody(formData);
    }

    const handleScopeChange = e => {
        setCurrentScope(e.target.value);
    }

    const handleAddScope = () => {
        setScopes([
            ...scopes,
            { scope: currentScope },
        ]);
        setCurrentScope('');
    }

    React.useEffect(() => {
        setBody(null);
        if (data) router.push('/projects');
        if (error) alert('Error');
    }, [data, error])

    return (
        <React.Fragment>
            <Box component="form"
                noValidate sx={{ mt: 1 }}
                alignItems="center"
                disabled={isDisabled}
                onSubmit={handleSubmit}
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
                            fullWidth
                            autoComplete="name"
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
                            fullWidth
                            autoComplete="description"
                            multiline
                            rows={2}
                            defaultValue={project.description ? project.description : null}
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
                            fullWidth
                            autoComplete="objective"
                            multiline
                            rows={4}
                            defaultValue={project.objective ? project.objective : null}
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
                            fullWidth
                            autoComplete="projectLimit"
                            multiline
                            rows={3}
                            defaultValue={project.projectLimit ? project.projectLimit : null}
                            disabled={isDisabled}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Typography variant="h6" gutterBottom>
                            Alcance del Sistema de Información
                        </Typography>
                    </Grid>
                    {scopes.length > 0 &&
                        <Grid item xs={12} sm={12}>
                            <List>
                                {scopes.map(item => (
                                    <ListItem key={`${item.scope}-list-item`}>
                                        <ListItemText
                                            primary={item.scope}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                    }
                    <Grid item xs={12} sm={12}>
                        <Grid container alignItems="center" columnSpacing={4}>
                            <Grid item xs={11}>
                                <TextField
                                    required
                                    id="scope"
                                    name="scope"
                                    fullWidth
                                    autoComplete="scope"
                                    defaultValue={currentScope}
                                    disabled={isDisabled}
                                    onChange={handleScopeChange}
                                />
                            </Grid>
                            <Grid item>
                                <Fab color="success" aria-label="add" size="small" onClick={handleAddScope}>
                                    <AddIcon />
                                </Fab>
                            </Grid>
                        </Grid>
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
                            name="projectType"
                            fullWidth
                            required
                            defaultValue={project.projectType ? project.projectType : null}
                            disabled={isDisabled}
                        >
                            <MenuItem value="WEB">Web</MenuItem>
                            <MenuItem value="MOBILE">Mobile</MenuItem>
                            <MenuItem value="WEB_MOBILE">Web & Mobile</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={4} ml={8}>
                        <FormControlLabel control={
                            <Checkbox disabled={isDisabled} name="isRealProject" />
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
