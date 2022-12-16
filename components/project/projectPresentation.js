import * as React from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter } from 'next/router'
import usePost from '../../hooks/usePost';

export default function ProjectPresentation(props) {
    const [project, setProject]  = React.useState(props.project);
    const [isDisabled, setIsDisabled] = React.useState(props.isDisabled);
    const [enableSaveButton, setEnableSaveButton] = React.useState(false);
    const [form, setForm] = React.useState({
        presentationVideoLink: '',
        demoVideoLink: '',
        deliveryLink: '',
        finalDocumentLink: null,
    });
    const [body, setBody] = React.useState(null);
    const { data, error, loading } = usePost('/api/projects/presentation', body);
    const router = useRouter()

    const handleFormOnChange = e => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setBody({
            ...project,
            students: project.students.map(student => ({ id: student.id, objectType: student.objectType })),
            tutor: { id: project.tutor.id, objectType: project.tutor.objectType },
            conversation: { id: project.conversation.id, objectType: project.conversation.objectType },
            projectPresentation: form,
        })
    }

    React.useEffect(() => {
        setEnableSaveButton(Object.keys(form).every(key => !!form[key]));
    }, [form])

    React.useEffect(() => {
        setBody(null);
        if (data) router.push('/projects');
        if (error) alert('Error');
    }, [data, error])

    return(
        <React.Fragment>
            <Box component="form"
                noValidate sx={{ mt: 1 }}
                alignItems="center"
                disabled={isDisabled}
                onChange={handleFormOnChange}
                onSubmit={handleSubmit}
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
                            id="finalDocumentLink"
                            name="finalDocumentLink"
                            fullWidth
                            disabled={isDisabled}
                            value={form.finalDocumentLink}
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