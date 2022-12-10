import * as React from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import {getInternetPlatforms} from "../../pages/api/config/internetPlatformsApi";
import {useSession} from "next-auth/react";

export default function ProjectMonitoring(props) {

    const { data: session } = useSession();

    const [project, setProject]  = React.useState(props.project);
    const [isDisabled, setIsDisabled] = React.useState(props.isDisabled);
    const [repositories, setRepositories] = React.useState([]);
    const [currentRepository, setCurrentRepository] = React.useState({});
    const [issueTracker, setIssueTracker] = React.useState();
    const [internetPlatforms, setInternetPlatforms] = React.useState(props.availableInternetPlatforms);
    console.log(props);

    const handleSubmit = (event) => {

    }
    const handleAddRepository = () => {
        setRepositories([
            ...repositories, currentRepository ,
        ]);
        setCurrentRepository({});
    }
    const handleIssueTrackerChanges = (event) => {
        event.preventDefault();
        const value = event.target.value;
        const field = event.target.name;
        setIssueTracker({
            ...issueTracker,
            [field]: value,
        });
        console.log(issueTracker);
    }
    const handleRepositoryChanges = (event) => {
        event.preventDefault();
        const value = event.target.value;
        const field = event.target.name;
        setCurrentRepository({
            ...currentRepository,
            [field]: value,
        });
        console.log(currentRepository);
    }
    const handleIssueTrackerInternetPlatformChanges = (event) => {
        event.preventDefault();
        const internetPlatform = internetPlatforms[event.target.value];
        setIssueTracker({
            ...issueTracker,
            ['internetPlatform']: internetPlatform,
        });
        console.log(event);
        console.log(issueTracker);
    }
    const handleRepositoryInternetPlatformChanges = (event) => {
        event.preventDefault();
        const internetPlatform = internetPlatforms[event.target.value];
        setCurrentRepository({
            ...currentRepository,
            ['internetPlatform']: internetPlatform,
        });
        console.log(event);
        console.log(currentRepository);
    }

    return (
        <React.Fragment>
            <Box component="form"
                 noValidate sx={{ mt: 1 }}
                 alignItems="center"
                 disabled={isDisabled}
                 onSubmit={handleSubmit}
            >
                <Grid container spacing={1} >
                    <Grid item xs={12} sm={12}>
                        <Typography variant="h6" gutterBottom>
                            Seguimiento del proyecto
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h8" gutterBottom>
                            Herramienta
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Typography variant="h8" gutterBottom>
                            Link al proyecto
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} >
                        <Select
                            labelId="internetPlatform"
                            id="internetPlatform"
                            name="internetPlatform"
                            fullWidth
                            required
                            onChange={handleIssueTrackerInternetPlatformChanges}
                            defaultValue={project.issueTracker ? project.issueTracker.internetPlatform.name : null}
                            disabled={isDisabled}
                        >
                            {internetPlatforms ? internetPlatforms.map((i, index) =>
                                i.type == "ISSUE_TRACKER" ?
                                <MenuItem id={index} key={i.id} value={index}>{i.name}</MenuItem> : null
                            ) : <MenuItem id={-1} value="None">No disponible</MenuItem>
                            }
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            required
                            requiredMessage="This field is required."
                            errorTarget="under"
                            id="projectLink"
                            name="projectLink"
                            fullWidth
                            autoComplete="projectLink"
                            defaultValue={project.issueTracker ? project.issueTracker.projectLink : null}
                            disabled={isDisabled}
                            onChange={handleIssueTrackerChanges}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h8" gutterBottom>
                            Nombre del proyecto
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h8" gutterBottom>
                            Usuario wner del proyecto
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            requiredMessage="This field is required."
                            errorTarget="under"
                            id="projectName"
                            name="projectName"
                            fullWidth
                            autoComplete="projectName"
                            defaultValue={project.issueTracker ? project.issueTracker.projectName : null}
                            disabled={isDisabled}
                            onChange={handleIssueTrackerChanges}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            requiredMessage="This field is required."
                            errorTarget="under"
                            id="ownerName"
                            name="ownerName"
                            fullWidth
                            autoComplete="ownerName"
                            defaultValue={project.issueTracker ? project.issueTracker.ownerName : null}
                            disabled={isDisabled}
                        />
                    </Grid>
                </Grid>
                <Divider sx={{m:3}}/>
                <Grid container alignItems="center" spacing={1} >
                    <Grid item xs={12} sm={12}>
                        <Typography variant="h6" gutterBottom>
                            Repositorios de código
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Typography variant="h8" gutterBottom>
                            Herramienta
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Typography variant="h8" gutterBottom>
                            Usuario de la plataforma
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <Typography variant="h8" gutterBottom>
                            Link al repositorio
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Typography variant="h8" gutterBottom>
                            Rama stable por defecto
                        </Typography>
                    </Grid>
                    {repositories.length > 0 &&
                        <Grid item xs={12} sm={12}>
                            <List>
                                {repositories.map(item => (
                                    <ListItem key={`${item.scope}-list-item`}>
                                        <ListItemText
                                            primary={item.scope}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                    }
                    <Grid item xs={12} sm={2} >
                                <Select
                                    labelId="internetPlatform"
                                    id="internetPlatform"
                                    name="internetPlatform"
                                    fullWidth
                                    required
                                    disabled={isDisabled}
                                    onChange={handleRepositoryInternetPlatformChanges}
                                >
                                    {internetPlatforms ? internetPlatforms.map((i, index) =>
                                        i.type == "REPOSITORY" ?
                                            <MenuItem id={index} key={i.id} value={index}>{i.name}</MenuItem> : null
                                    ) : <MenuItem id={-1} value="None">No disponible</MenuItem>
                                    }
                                </Select>
                            </Grid>
                    <Grid item xs={12} sm={2}>
                                <TextField
                                    required
                                    requiredMessage="This field is required."
                                    errorTarget="under"
                                    id="ownerName"
                                    name="ownerName"
                                    fullWidth
                                    autoComplete="ownerName"
                                    disabled={isDisabled}
                                    onChange={handleRepositoryChanges}
                                />
                            </Grid>
                    <Grid item xs={12} sm={5}>
                                    <TextField
                                        required
                                        id="repositoryLink"
                                        name="repositoryLink"
                                        fullWidth
                                        autoComplete="repositoryLink"
                                        disabled={isDisabled}
                                        onChange={handleRepositoryChanges}
                                    />
                                </Grid>
                    <Grid item xs={12} sm={2}>
                                <TextField
                                    required
                                    id="productionBranchName"
                                    name="productionBranchName"
                                    fullWidth
                                    autoComplete="productionBranchName"
                                    disabled={isDisabled}
                                    onChange={handleRepositoryChanges}
                                />
                            </Grid>
                    <Grid item xs={12} sm={1} alignItems="center" textAlign={"center"} paddingRight={'22px'}>
                        <Fab color="success" aria-label="add" size="small" onClick={handleAddRepository} >
                            <AddIcon />
                        </Fab>
                    </Grid>
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} >
                    <Button
                        variant="contained"
                        sx={{ mt: 3, ml: 1 }}
                        type={"submit"}
                        disabled={isDisabled}
                    >Guardar</Button>
                </Box>
            </Box>

        </React.Fragment>
    );
}
