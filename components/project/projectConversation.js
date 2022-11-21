import * as React from 'react';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import {useEffect} from "react";
import Divider from "@mui/material/Divider";

export default function ProjectConversation(props) {

    const[project, setProject]  = React.useState({});
    const[comments, setComments]  = React.useState({});

    const userMock = {
        person: {
            id: 123456,
            name: "Hernán Jesús",
            lastName: "Morais",
            imageProfile: "https://media-exp1.licdn.com/dms/image/C4E03AQGBhPy4NCQd3g/profile-displayphoto-shrink_800_800/0/1567771904876?e=1674691200&v=beta&t=eLC1SM3Q5BcHUvsKnNloZXH2lLLdeDkDpuLhxvqFYXo",
        }
    }

    const handleSendMessage = (event) => {
        const conversationDom = React.createElement(document.getElementById("conversation"));
        event.preventDefault();
        const comment = {
            commentator: userMock.person,
            comment: event.target.message.value,
            createdDate: new Date().toLocaleString(),
        };
        if(project.conversation == null) {
            project.conversation = {comments: []};
        }
        project.conversation.comments.push(comment)
        setProject(project);
        event.target.message.value = null;
        console.log(project);
        document.getElementById("conversation")

    };

    return(
        <React.Fragment>
            <Box component="form"
                 noValidate sx={{ mt: 1 }}
                 alignItems="center"
                 onSubmit={handleSendMessage}
            >
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={10}>
                        <TextField
                            required
                            id="message"
                            name="message"
                            label="Mensaje"
                            fullWidth
                            autoComplete="message"
                            multiline
                            rows={1}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Fab color="primary" aria-label="send" size="medium" sx={{m:0.5}} type="submit">
                            <SendIcon />
                        </Fab>
                    </Grid>
                </Grid>
                <Paper style={{ padding: "40px 20px", marginTop:20}} elevation={3} id="conversation">
                    {
                        (project.conversation != null && project.conversation.comments.length > 0) ?
                            (project.conversation.comments.map(
                                (comment) => getCommentCard( comment)
                            )) :
                            (<></>)
                    }
                </Paper>
            </Box>

        </React.Fragment>
    );

}

export function getCommentCard(comment) {
    console.log(comment);
    const sender = comment.commentator.name.concat(' ', comment.commentator.lastName);
    return(
        <React.Fragment>
        <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
                <Avatar alt={sender} src={comment.commentator.imageProfile} />
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "left" }}>{sender}</h4>
                <p style={{ textAlign: "left" }}>
                    {comment.comment}
                </p>
                <p style={{ textAlign: "left", color: "gray" }}>
                    posted el {comment.createdDate}
                </p>
            </Grid>
        </Grid>
        <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
        </React.Fragment>
    );
}
