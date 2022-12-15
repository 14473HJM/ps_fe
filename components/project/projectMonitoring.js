import * as React from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import LoadingButton from '@mui/lab/LoadingButton';
import Divider from "@mui/material/Divider";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router'
import usePut from '../../hooks/usePut';

export default function ProjectMonitoring(props) {

    const { data: session } = useSession();

    const [project, setProject] = React.useState(props.project);
    const [isDisabled, setIsDisabled] = React.useState(props.isDisabled);
    const [repositories, setRepositories] = React.useState(props.project.codeRepositories);
    const [currentRepository, setCurrentRepository] = React.useState({
        internetPlatform: { id: '' },
        ownerName: '',
        repositoryLink: '',
        productionBranchName: '',
    });
    const [issueTracker, setIssueTracker] = React.useState({
        internetPlatform: { id: '' },
        projectLink: '',
        projectName: '',
        ownerName: '',
    });
    const [internetPlatforms, setInternetPlatforms] = React.useState(props.availableInternetPlatforms);
    const [enableSaveButton, setEnableSaveButton] = React.useState(false);
    const [body, setBody] = React.useState(null);
    const { data, error, loading } = usePut('/api/projects', body);
    const router = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault();
        setBody({
            ...project,
            students: project.students.map(student => ({ id: student.id, objectType: student.objectType })),
            tutor: { id: project.tutor.id, objectType: project.tutor.objectType },
            conversation: { id: project.conversation.id, objectType: project.conversation.objectType },
            codeRepositories: repositories,
            issueTracker,
        })
    }
    const handleAddRepository = () => {
        setRepositories([
            ...repositories, currentRepository,
        ]);
        setCurrentRepository({
            internetPlatform: { id: '' },
            ownerName: '',
            repositoryLink: '',
            productionBranchName: '',
        });
    }
    const handleDeleteRepository = index => {
        const newRepositories = [...repositories];
        newRepositories[index].recordStatus = 'deleted';
        setRepositories(newRepositories);
    }
    const handleIssueTrackerChanges = (event) => {
        event.preventDefault();
        const value = event.target.value;
        const field = event.target.name;
        setIssueTracker({
            ...issueTracker,
            [field]: value,
        });
    }
    const handleRepositoryChanges = (event) => {
        event.preventDefault();
        const value = event.target.value;
        const field = event.target.name;
        setCurrentRepository({
            ...currentRepository,
            [field]: field === 'internetPlatform' ? internetPlatforms[value - 1] : value,
        });
    }
    const handleIssueTrackerInternetPlatformChanges = (event) => {
        event.preventDefault();
        const internetPlatform = internetPlatforms[event.target.value - 1];
        setIssueTracker({
            ...issueTracker,
            ['internetPlatform']: internetPlatform,
        });
    }

    React.useEffect(() => {
        const issueTrackerIsValid = Object.keys(issueTracker).every(key => !!issueTracker[key] === true);
        const repositoriesAreValid = repositories.length > 0 && repositories.every(repo => {
            return Object.keys(repo).every(key => !!repo[key] === true);
        });
        console.log('ISSUE TRACKER: ', issueTrackerIsValid)
        console.log('REPOSITORIES: ', repositoriesAreValid)
        setEnableSaveButton(issueTrackerIsValid && repositoriesAreValid);
    }, [issueTracker, repositories])

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
                            defaultValue={project.issueTracker ? project.issueTracker.internetPlatform.id : null}
                            disabled={isDisabled}
                        >
                            {internetPlatforms ? internetPlatforms.map((i, index) =>
                                i.type == "ISSUE_TRACKER" ?
                                    <MenuItem id={index} key={i.id} value={i.id}>{i.name}</MenuItem> : null
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
                            Usuario owner del proyecto
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
                            onChange={handleIssueTrackerChanges}
                        />
                    </Grid>
                </Grid>
                <Divider sx={{ m: 3 }} />
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
                                {repositories.map((repo, i) => {
                                    if (repo.recordStatus !== 'deleted') {
                                        return (
                                            <ListItem
                                                key={`${repo.internetPlatform}-${i}-list-item`}
                                                sx={{ pr: 0 }}

                                            >
                                                <Grid container item xs={12} sm={12} columnSpacing={13.5}>
                                                    <Grid item sm={2}>{repo.internetPlatform.name}</Grid>
                                                    <Grid item sm={2}>{repo.ownerName}</Grid>
                                                    <Grid item sm={5}><Link href={repo.repositoryLink} targproductionBranchNameet="_blank">{repo.repositoryLink}</Link></Grid>
                                                    <Grid item sm={2}>{repo.productionBranchName}</Grid>
                                                </Grid>
                                                <Grid item xs={12} sm={1} alignItems="center" textAlign={"center"} paddingRight={'22px'}>
                                                    <Fab color="error" aria-label="add" size="small" onClick={() => handleDeleteRepository(i)} >
                                                        <DeleteIcon />
                                                    </Fab>
                                                </Grid>
                                            </ListItem>
                                        )
                                    }
                                })}
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
                            onChange={handleRepositoryChanges}
                            value={currentRepository.internetPlatform.id}
                        >
                            {internetPlatforms ? internetPlatforms.map((i, index) =>
                                i.type == "REPOSITORY" ?
                                    <MenuItem id={index} key={i.id} value={i.id}>{i.name}</MenuItem> : null
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
                            value={currentRepository.ownerName}
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
                            value={currentRepository.repositoryLink}
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
                            value={currentRepository.productionBranchName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={1} alignItems="center" textAlign={"center"} paddingRight={'22px'}>
                        <Fab color="success" aria-label="add" size="small" onClick={handleAddRepository} >
                            <AddIcon />
                        </Fab>
                    </Grid>
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} >
                    <LoadingButton
                        loading={loading}
                        variant="contained"
                        sx={{ mt: 3, ml: 1 }}
                        type={"submit"}
                        disabled={isDisabled || !enableSaveButton}
                    >Guardar</LoadingButton>
                </Box>
            </Box>

        </React.Fragment>
    );
}
