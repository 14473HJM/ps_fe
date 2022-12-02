import * as React from 'react';
import Layout from "../../components/layout/layout";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import {getToken} from "next-auth/jwt";
import Link from "next/link";
import ListItemButton from "@mui/material/ListItemButton";

export default function Projects({projects}) {

    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {projects.map((project) =>
                <ListItem>
                    <ListItemButton component="a" href={"/projects/" + project.id}>
                    <ListItemAvatar>
                        {project.imageLink ?
                            <Avatar alt={project.name} src={project.imageLink} />
                        :
                            <Avatar><WorkIcon /></Avatar>
                        }
                    </ListItemAvatar>
                    <ListItemText primary={project.name} secondary={project.createdDate} />
                    <ListItemText primary={"Proyecto del tipo " + project.projectType} secondary={"Descripción: " + project.description} />
                    </ListItemButton>
                </ListItem>
            )}
        </List>
    );

}

Projects.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}

export async function getServerSideProps(context) {

    const { req } = context;
    const token = await getToken({ req })
    if(token != null) {
        const {access_token} = token
        const {userId} = token

        const options = {
            headers: {
                'accept': '*/*',
                'charset': 'UTF-8',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token,
            }
        };

        // Fetch data from external API
        const res = await fetch(`http://localhost:8080/ps/projects?userId=` + userId, options)
        const projects = await res.json()
        // Pass data to the page via props
        return {props: {projects}}
    } else {
        return {props: {}};
    }
}