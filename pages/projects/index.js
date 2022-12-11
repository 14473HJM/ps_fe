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

export default function Projects({projects}) {

    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {projects.length > 0 ? projects.map((project) =>
                <ListItem key={project.name}>
                    <ListItemButton component="a" href={"/projects/" + project.id}>
                    <ListItemAvatar>
                        {project.imageLink ?
                            <Avatar alt={project.name} src={project.imageLink} />
                        :
                            <Avatar><WorkIcon /></Avatar>
                        }
                    </ListItemAvatar>
                    <ListItemText primary={project.name} secondary={project.projectStatus} />
                    <ListItemText primary={"Proyecto del tipo " + project.projectType} secondary={"Descripción: " + project.description} />
                    </ListItemButton>
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