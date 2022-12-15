import * as React from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LoadingButton from '@mui/lab/LoadingButton';
import usePost from '../../hooks/usePost';

export default function ProjectPresentation(props) {
    const [project, setProject]  = React.useState(props.project);
    const [isDisabled, setIsDisabled] = React.useState(props.isDisabled);
    const [enableSaveButton, setEnableSaveButton] = React.useState(false);
    const [form, setForm] = React.useState({
        presentationVideoLink: '',
        demoVideoLink: '',
        deliveryLink: '',
        finalDocument: null,
    });
    const [body, setBody] = React.useState(null);
    const { data, error, loading } = usePost('/api/projects', body);

    console.log(props);

    const handleFormOnChange = e => {
        console.log(e.target.files);
        const { name, value, files } = e.target;
        setForm({
            ...form,
            [name]: name === 'finalDocument' ? files : value,
        });
    }

    return(
        <React.Fragment>
            <Box component="form"
                noValidate sx={{ mt: 1 }}
                alignItems="center"
                disabled={isDisabled}
                onChange={handleFormOnChange}
                //onSubmit={handleSubmit}
            >
                <Grid container spacing={1} >
                    <Grid item xs={12} sm={12}>
                        <Typography variant="h6" gutterBottom>
                            Video presentación
                        </Typography>
                        <TextField
                            required
                            requiredMessage="This field is required."
                            errorTarget="under"
                            id="presentationVideoLink"
                            name="presentationVideoLink"
                            fullWidth
                            autoComplete="presentationVideoLink"
                            disabled={isDisabled}
                            value={form.presentationVideoLink}
                            //onChange={handleIssueTrackerChanges}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Typography variant="h6" gutterBottom>
                            Video demo
                        </Typography>
                        <TextField
                            required
                            requiredMessage="This field is required."
                            errorTarget="under"
                            id="demoVideoLink"
                            name="demoVideoLink"
                            fullWidth
                            autoComplete="demoVideoLink"
                            disabled={isDisabled}
                            value={form.demoVideoLink}
                            //onChange={handleIssueTrackerChanges}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Typography variant="h6" gutterBottom>
                            URL del proyecto
                        </Typography>
                        <TextField
                            required
                            requiredMessage="This field is required."
                            errorTarget="under"
                            id="deliveryLink"
                            name="deliveryLink"
                            fullWidth
                            autoComplete="deliveryLink"
                            disabled={isDisabled}
                            value={form.deliveryLink}
                            //onChange={handleIssueTrackerChanges}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Typography variant="h6" gutterBottom>
                            Documento final
                        </Typography>
                        <TextField
                            required
                            requiredMessage="This field is required."
                            errorTarget="under"
                            id="finalDocument"
                            name="finalDocument"
                            fullWidth
                            type="file"
                            inputProps={{ accept: "application/pdf" }}
                            disabled={isDisabled}
                        />
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} >
                    <LoadingButton
                        loading={loading}
                        variant="contained"
                        sx={{ mt: 3, ml: 1 }}
                        type={"submit"}
                        disabled={isDisabled || !enableSaveButton}
                    >
                        Guardar
                    </LoadingButton>
                </Box>
            </Box>
        </React.Fragment>
    );

}