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

export default function Projects({projects}) {

    const handleAddTutor = () => {

    }

    return (

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
                                          <AvatarGroup max={3} sx={{maxWidth:1/3}}>
                                              {project.students.map(s =>
                                                  <Avatar key={s.id} alt={s.name + ' ' + s.lastName} src={s.imageProfile} href={"/users/" + s.id} />
                                              )}
                                          </AvatarGroup>
                                      } sx={{maxWidth:1/3}} />
                        <ListItemText primary="Tutor"
                                      secondary={project.tutor ?
                                          <Avatar key={project.tutor.id} alt={project.tutor.name + ' ' + project.tutor.lastName} src={project.tutor.imageProfile} href={"/users/" + project.tutor.id}/>
                                          :
                                          <Tooltip title="Proyecto sin Tutor asignado" placement="top-start">
                                              <Fab size={'small'} onClick={handleAddTutor}>
                                                  <PersonOffIcon/>
                                              </Fab>
                                          </Tooltip>
                                      } sx={{maxWidth:1/3,}}/>
                        <ListItemText primary="Observadores"
                                      secondary={
                                          <AvatarGroup max={3} sx={{maxWidth:1/3}}>
                                              {project.observers.length > 0 ?
                                                  project.observers.map(s =>
                                                      <Avatar key={s.id} alt={s.name + ' ' + s.lastName} src={s.imageProfile} href={"/users/" + s.id} />
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
    );

}

Projects.auth = true;

export async function getServerSideProps(context) {
    return await getProjects(context);
}