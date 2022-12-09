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
import {postProjectComment} from "../../pages/api/projects/projectsApi";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ProjectConversation(props) {

    console.log(props);
    const[ conversation, setConversation ]  = React.useState(props.project.conversation);
    const [openSnackbarOK, setOpenSnackbarOK] = React.useState(false);
    const [openSnackbarError, setOpenSnackbarError] = React.useState(false);

    const project = props.project;

    const { data: session, status } = useSession()

    const user = session.user;

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

    const handleSendMessage = async (event) => {
        event.preventDefault();
        const comment = {
            commentator: user.person,
            comment: event.target.message.value,
            createdDate: new Date(),
        };
        const response = await postProjectComment(session, project, comment)
        if (response && response.ok) {
            const _comment = await response.json();
            if (_comment) {
                const comments = project.conversation.comments;
                comments.push(_comment)
                setConversation({
                    ...conversation,
                    comments,
                });
                event.target.message.value = null;
                console.log(conversation);
            }
            handleOpenSnackbar("S")
        } else {
            handleOpenSnackbar("E")
        }
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
                    {project.conversation.comments.map(comment => <CommentCard {...comment} />)}
                </Paper>
            </Box>
            <Snackbar
                open={openSnackbarOK}
                autoHideDuration={6000}
                onClose={(e, r) => handleCloseSnackbar(e, r, 'S')}
                anchorOrigin={{vertical: 'botton', horizontal: 'center'}}
            >
                <Alert onClose={(e, r) => handleCloseSnackbar(e, r, 'S')} severity="success" sx={{ width: '100%' }}>
                    Mensaje enviado con exito!
                </Alert>
            </Snackbar>
            <Snackbar
                open={openSnackbarError}
                autoHideDuration={6000}
                onClose={(e, r) => handleCloseSnackbar(e, r, 'E')}
                anchorOrigin={{vertical: 'botton', horizontal: 'center'}}
            >
                <Alert onClose={(e, r) => handleCloseSnackbar(e, r, 'E')} severity="error" sx={{ width: '100%' }}>
                    Hubo un error al enviar el mensaje!!!
                </Alert>
            </Snackbar>
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
