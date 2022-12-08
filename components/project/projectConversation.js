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
import Divider from "@mui/material/Divider";
import {useSession} from "next-auth/react";
import axios from "axios";

export default function ProjectConversation(props) {

    console.log(props);
    const[ conversation, setConversation ]  = React.useState(props.project.conversation);
    // const[project, setProject]  = React.useState({
    //     conversation: {
    //         comments: [],
    //     },
    // });

    const project = props.project;

    const { data: session, status } = useSession()

    const user = session.user;

    console.log(user);

    const handleSendMessage = async (event) => {
        event.preventDefault();
        const comment = {
            commentator: user.person,
            comment: event.target.message.value,
            createdDate: new Date(),
        };
        const _comment = await postCommentProject(comment, project, user.access_token)
        if(_comment) {
            const comments = project.conversation.comments;
            comments.push(_comment)
            setConversation({
                ...conversation,
                comments,
            });

            // conversation.comments.push(_comment)
            // setConversation(conversation);
            event.target.message.value = null;
            console.log(conversation);
        }
        document.getElementById("conversation")
        // const comments = project.conversation.comments;
        // comments.push(comment)
        // setProject({
        //     ...project,
        //     comments,
        // });
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
                        (conversation != null && conversation.comments.length > 0) ?
                            (conversation.comments.map(
                                (comment) => getCommentCard( comment)
                            )) :
                            (<></>)
                    }
                    {/* project.conversation.comments.map(comment => <CommentCard {...comment} />) */}
                </Paper>
            </Box>

        </React.Fragment>
    );

}

const CommentCard = ({ commentator, comment, createdDate }) => {
    const sender = `${commentator.name} ${commentator.lastName}`;
    return(
        <React.Fragment>
        <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
                <Avatar alt={sender} src={commentator.imageProfile} />
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "left" }}>{sender}</h4>
                <p style={{ textAlign: "left" }}>
                    {comment}
                </p>
                <p style={{ textAlign: "left", color: "gray" }}>
                    posted el {createdDate}
                </p>
            </Grid>
        </Grid>
        <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
        </React.Fragment>
    );
}

async function postCommentProject(comment, project, access_token) {
        const options = {
            method: 'POST',
            body: JSON.stringify(comment),
            headers: {
                'accept': '*/*',
                'charset': 'UTF-8',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token,
            }
        };
        const res = await fetch('http://localhost:8080/ps/projects/' + project.id + "/conversation/comments", options);
        console.log(res);
        if(res.ok) {
            const _comment = await res.json();
            console.log(_comment);
            return _comment;
        } else {
            return null;
        }
}