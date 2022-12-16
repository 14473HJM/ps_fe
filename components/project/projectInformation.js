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
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import Fab from "@mui/material/Fab";
import InputAdornment from "@mui/material/InputAdornment";
import { useRouter } from 'next/router'
import usePost from '../../hooks/usePost';

export default function ProjectInformation(props) {
    const [project, setProject] = React.useState(props.project);
    const [isDisabled, setIsDisabled] = React.useState(props.isDisabled);
    const [body, setBody] = React.useState(null);
    const [currentScope, setCurrentScope] = React.useState('');
    const [scopes, setScopes] = React.useState((props.project && props.project.scopes) || []);
    const [scopetoEdit, setScopetoEdit] = React.useState(null);
    const { data, error, loading } = usePost('/api/projects', body);
    const [isValidToSave, setIsValidToSave] = React.useState(true);
    const [formValidation, setFormValidation]= React.useState({name: project.name || null,
        description: project.description || null,
        objective:project.objective || null,
        projectLimit:project.projectLimit || null,
        projectType:project.projectType || null,
        isRealProject:project.isRealProject || null,
        imageLink:project.imageLink || null,
        scopes:project.scopes || null});
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
            projectTheme,
        } = e.target;

        const formData = {
            name: name.value,
            description: description.value,
            objective: objective.value,
            projectLimit: projectLimit.value,
            projectType: projectType.value,
            isRealProject: isRealProject.checked,
            imageLink: imageLink.value,
            projectTheme: projectTheme.value,
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

    const handleEditScope = index => {
        setScopetoEdit({ index, ...scopes[index] });
    }

    const handleDeleteScope = index => {
        const newScopes = [...scopes];
        newScopes.splice(index, 1);
        setScopes(newScopes);
    }

    const handleOnChangeScopeEdit = e => {
        setScopetoEdit({
            ...scopetoEdit,
            scope: e.target.value,
        })
    }

    const handleSaveScopeEdit = () => {
        const newScopes = [...scopes];
        newScopes[scopetoEdit.index] = {
            scope: scopetoEdit.scope,
        };
        setScopes(newScopes);
        setScopetoEdit(null);
    }

    const handleCancelScopeEdit = () => {
        setScopetoEdit(null);
    }

    React.useEffect(() => {
        setBody(null);
        if (data) router.push('/projects');
        if (error) alert('Error');
    }, [data, error])

    React.useEffect(() => {handleCheckValidToSave()
    }, [formValidation])


    const handleCheckValidToSave = (event) => {
        if(event) {
            event.preventDefault();
            console.log('event: ', event);
            const field = event.target.name;
            setFormValidation({...formValidation, [field]: event.target.value})
            if (formValidation.name && formValidation.description &&
                formValidation.objective && formValidation.projectLimit &&
                scopes.length > 0) {
                setIsValidToSave(false);
            } else {
                setIsValidToSave(true);
            }
            console.log('EVENT ON FORM: ', formValidation)
        } else {
            if (formValidation.name != null && formValidation.description != null &&
                formValidation.objective != null && formValidation.projectLimit != null &&
                scopes.length > 0) {
                setIsValidToSave(false);
            } else {
                setIsValidToSave(true);
            }
        }
    }

    return (
        <React.Fragment>
            <Box component="form"
                noValidate sx={{ mt: 1 }}
                alignItems="center"
                disabled={isDisabled}
                onSubmit={handleSubmit}
                 onChange={handleCheckValidToSave}
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
                            inputProps={{maxlength: 100}}
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
                            inputProps={{maxlength: 250}}
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
                            inputProps={{maxlength: 1000}}
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
                            inputProps={{maxlength: 1000}}
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
                                {scopes.map((item, index) => { 
                                    if (scopetoEdit && scopetoEdit.index === index) {
                                        return (
                                            <ListItem
                                                key={`${item.scope}-list-item`}
                                                dense
                                                sx={{ px: 0.5 }}
                                            >
                                                <TextField
                                                    required
                                                    id="scope"
                                                    name="scope"
                                                    fullWidth
                                                    autoFocus
                                                    autoComplete="scope"
                                                    value={scopetoEdit.scope}
                                                    disabled={isDisabled}
                                                    onChange={handleOnChangeScopeEdit}
                                                    margin="none"
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="end">
                                                            <IconButton edge="end" aria-label="save" onClick={handleSaveScopeEdit}>
                                                                <SaveIcon />
                                                            </IconButton>
                                                            <IconButton edge="end" aria-label="cancel" onClick={handleCancelScopeEdit}>
                                                                <CloseIcon />
                                                            </IconButton>
                                                        </InputAdornment>,
                                                        maxlength: 250
                                                    }}
                                                />
                                            </ListItem>
                                        )
                                    } else {
                                        return (
                                        <ListItem
                                            key={`${item.scope}-list-item`}
                                            secondaryAction={
                                                <>
                                                    <IconButton edge="end" aria-label="edit" onClick={() => handleEditScope(index)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteScope(index)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </>
                                            }
                                        >
                                            <ListItemText
                                                primary={item.scope}
                                            />
                                        </ListItem>
                                    )}
                                })}
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
                                    value={currentScope}
                                    disabled={isDisabled}
                                    inputProps={{maxlength: 250}}
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
                    <Grid item xs={12} sm={7}>
                        <Typography variant="h6" gutterBottom>
                            Tema del proyecto
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Typography variant="h6" gutterBottom>
                            Tipo de proyecto
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>

                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <TextField
                            required
                            requiredMessage="This field is required."
                            errorTarget="under"
                            id="projectTheme"
                            name="projectTheme"
                            fullWidth
                            autoComplete="projectTheme"
                            inputProps={{maxlength: 250}}
                            defaultValue={project.projectTheme ? project.projectTheme : null}
                            disabled={isDisabled}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2} >
                        <Select
                            labelId="projectType"
                            id="projectType"
                            name="projectType"
                            fullWidth
                            required
                            defaultValue={project.projectType ? project.projectType : null}
                            disabled={isDisabled}
                            inputProps={{maxlength: 100}}
                            onChange={handleCheckValidToSave}
                        >
                            <MenuItem value="WEB">Web</MenuItem>
                            <MenuItem value="MOBILE">Mobile</MenuItem>
                            <MenuItem value="WEB_MOBILE">Web & Mobile</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={2} ml={4} mt={0.8}>
                        <FormControlLabel control={
                            <Checkbox disabled={isDisabled} name="isRealProject" />
                        } label="Es un proyecto real" />
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
                            inputProps={{maxlength: 250}}
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
                        disabled={isValidToSave}
                    >Guardar Datos</Button>
                </Box>
            </Box>
        </React.Fragment>
    );

}

ProjectInformation.auth = true;
