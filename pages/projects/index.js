import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import WorkIcon from '@mui/icons-material/Work';
import AddIcon from '@mui/icons-material/Add';
import ListItemButton from "@mui/material/ListItemButton";
import { getProjects } from '../../services/projects.service';
import ListItemIcon from "@mui/material/ListItemIcon";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Tooltip from "@mui/material/Tooltip";
import {AvatarGroup} from "@mui/material";
import PersonOffIcon from '@mui/icons-material/PersonOff';
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {getProfessors} from "../../services/users.service";
import {useSession} from "next-auth/react";
import {addTutor} from "../api/projects/projectsApi";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Projects({projects, _professors}) {

    const [openTutorModal, setOpenTutorModal] = React.useState();
    const [professors, setProfessors] = React.useState(_professors);
    const [tutorSelected, setTutorSelected] = React.useState();
    const [projectToAdd, setProjectToAdd] = React.useState();
    const [openSnackbarOK, setOpenSnackbarOK] = React.useState(false);
    const [openSnackbarError, setOpenSnackbarError] = React.useState(false);
    const [message, setMessage] = React.useState();

    const { data: session, status } = useSession()
    const user = session.user;

    console.log(projects);

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const handleAddTutor = (event) => {
        event.preventDefault();
        const projectId = event.target.id;
        setProjectToAdd(projectId);
        setOpenTutorModal(true);
        console.log(projectId);
        console.log(projectToAdd);
    }

    const handleCloseTutorModal = (event) => {
        setOpenTutorModal(false);
        console.log(event);
    }

    const handleOpenSnackbar = (t) => {
        if(t === "E") {
            setOpenSnackbarError(true);
        } else if (t === "S") {
            setOpenSnackbarOK(true);
        }
    };
    const handleCloseSnackbar = (event, reason, t) => {
        if(t === "E") {
            if (reason === 'clickaway') {
                return;
            }
            setOpenSnackbarError(false);
        } else if (t === "S") {
            if (reason === 'clickaway') {
                return;
            }
            setOpenSnackbarOK(false);
        }
    };

    const handleSubmitTutorModal = async (event) => {
        event.preventDefault();
        let response;
        if(message != null) {
            const comment = {
                commentator: user.person,
                comment: message,
                createdDate: new Date(),
            };
            response = await addTutor(session, projectToAdd, tutorSelected, comment);
        } else {
            response = await addTutor(session, projectToAdd, tutorSelected, null);
        }
        if (response && response.ok) {
            handleOpenSnackbar("S")
        } else {
            handleOpenSnackbar("E")
        }
        handleCloseTutorModal();
        console.log(event);
    }
    const handleChangeSelect = (event) => {
        event.preventDefault();
        console.log(event.target.value);
        setTutorSelected(event.target.value);
    }

    const handleMessageChange = (event) => {
        setMessage(event.target.message.value);
    }


    return (
        <React.Fragment>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {projects.length > 0 ? projects.map((project) =>
                <ListItem key={project.name}>
                    <ListItemButton component="a" href={"/projects/" + project.id} sx={{maxWidth:2/3, minWidth:2/3}}>
                        <ListItemAvatar>
                            {project.imageLink ?
                                <Avatar alt={project.name} src={project.imageLink}  sx={{ width: 56, height: 56, mr:3 }}/>
                            :
                                <Avatar><WorkIcon /></Avatar>
                            }
                        </ListItemAvatar>
                        <ListItemText primary={project.name} secondary={project.projectStatus} sx={{maxWidth:3/8, minWidth:3/8}}/>
                        <ListItemText primary={"Proyecto del tipo " + project.projectType}
                                      secondary={"Descripción: " + project.description} sx={{maxWidth:6/8}}/>
                    </ListItemButton>
                    <ListItem sx={{maxWidth:1/3, minWidth:1/3}}>
                        <ListItemText primary="Estudiantes"
                                      secondary={
                                          <AvatarGroup max={3} sx={{maxWidth:1/3}} spacing={'small'}>
                                              {project.students.map(s =>
                                                  <Avatar key={s.id} alt={s.name + ' ' + s.lastName} src={s.imageProfile} component="a" href={"/users/" + s.id} />
                                              )}
                                          </AvatarGroup>
                                      } sx={{maxWidth:1/3}} />
                        <ListItemText primary="Tutor"
                                      secondary={project.tutor ?
                                          <Avatar key={project.tutor.id} alt={project.tutor.name + ' ' + project.tutor.lastName} component="a" src={project.tutor.imageProfile} href={"/users/" + project.tutor.id}/>
                                          :
                                          <Tooltip title="Proyecto sin Tutor asignado" placement="top-start" onClick={handleAddTutor}>
                                              <Fab size={'small'} onClick={handleAddTutor} sx={{boxShadow:'none'}} id={project.id}>
                                                  <PersonOffIcon id={project.id}/>
                                              </Fab>
                                          </Tooltip>
                                      } sx={{maxWidth:1/3,}}/>
                        <ListItemText primary="Observadores"
                                      secondary={
                                          <AvatarGroup max={3} sx={{maxWidth:1/3}} spacing={'small'}>
                                              {project.observers.length > 0 ?
                                                  project.observers.map(s =>
                                                      <Avatar key={s.id} alt={s.name + ' ' + s.lastName} component="a" src={s.imageProfile} href={"/users/" + s.id} sx={{bgcolor:'white'}}/>
                                                  ) :
                                                  <Tooltip title="Proyecto sin Observadores extras" placement="top-start">
                                                      <Avatar><PersonOffIcon/></Avatar>
                                                  </Tooltip>
                                              }
                                              <Avatar>
                                                  <Fab size={'small'} onClick={handleAddTutor}>
                                                      <AddIcon/>
                                                  </Fab>
                                              </Avatar>
                                          </AvatarGroup>
                                      } sx={{maxWidth:1/3}} />
                    </ListItem>
                </ListItem>
            ) :
                <ListItem>
                    <ListItemButton component="a" href="/projects/new">
                        <ListItemAvatar>
                            <Avatar>
                                <AddIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Crear proyecto" />
                    </ListItemButton>
                </ListItem>
            }
        </List>
    <Modal
            open={openTutorModal}
            onClose={handleCloseTutorModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <Typography id="modal-modal-title" variant="h4" component="h2">
                    Elegir el tutor
                </Typography>
                <Select
                    labelId="professors"
                    id="professors"
                    name="professors"
                    fullWidth
                    required
                    onChange={handleChangeSelect}
                >
                    {professors ? professors.map(p =>
                            <MenuItem id={p.id} key={p.id} value={p.id}>{p.name + ' ' + p.lastName}</MenuItem>
                    ) : null }
                </Select>
                <TextField
                    required
                    id="message"
                    name="message"
                    label="Mensaje"
                    fullWidth
                    autoComplete="message"
                    multiline
                    rows={3}
                    sx={{pt:2}}
                    onChange={handleMessageChange}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} >
                    <Button
                        variant="contained"
                        sx={{ mt: 3, ml: 1 }}
                        disabled={false}
                        color="error"
                        onClick={handleCloseTutorModal}
                    >Cancelar</Button>
                    <Button
                        variant="contained"
                        sx={{ mt: 3, ml: 1 }}
                        type={"submit"}
                        onClick={handleSubmitTutorModal}
                    >Guardar</Button>
                </Box>
            </Box>
        </Modal>
            <Snackbar
                open={openSnackbarOK}
                autoHideDuration={6000}
                onClose={(e, r) => handleCloseSnackbar(e, r, 'S')}
                anchorOrigin={{vertical: 'bottom', horizontal: 'bottom'}}
            >
                <Alert onClose={(e, r) => handleCloseSnackbar(e, r, 'S')} severity="success" sx={{ width: '100%' }}>
                    Operación realizada con exito!
                </Alert>
            </Snackbar>
            <Snackbar
                open={openSnackbarError}
                autoHideDuration={6000}
                onClose={(e, r) => handleCloseSnackbar(e, r, 'E')}
                anchorOrigin={{vertical: 'bottom', horizontal: 'bottom'}}
            >
                <Alert onClose={(e, r) => handleCloseSnackbar(e, r, 'E')} severity="error" sx={{ width: '100%' }}>
                    Hubo un error al procesar la operación
                </Alert>
            </Snackbar>
    </React.Fragment>
    );
}

Projects.auth = true;

export async function getServerSideProps(context) {

    const props = await getProjects(context);
    const projects = props.props.projects ? props.props.projects : props.props;
    const _professors = await getProfessors(context);
    return {props: {projects, _professors}};
}