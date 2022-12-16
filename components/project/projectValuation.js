import * as React from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LoadingButton from '@mui/lab/LoadingButton';
import usePost from '../../hooks/usePost';

export default function ProjectValuation(props) {
    const [project, setProject] = React.useState(props.project);
    const [isDisabled, setIsDisabled] = React.useState(props.isDisabled);
    const [enableSaveButton, setEnableSaveButton] = React.useState(false);
    const [form, setForm] = React.useState({
        projectManagementNote: '',
        productDevelopmentNote: '',
        finalNote: '',
        finalDocument: null,
    });
    const [body, setBody] = React.useState(null);
    const { data, error, loading } = usePost('/api/projects', body);

    const handleFormOnChange = e => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    }

    return (
        <React.Fragment>
            <Box component="form"
                noValidate sx={{ mt: 1 }}
                alignItems="center"
                disabled={isDisabled}
                onChange={handleFormOnChange}
            //onSubmit={handleSubmit}
            >
                <Grid container spacing={4} direction="column" sm={4}>
                    <Grid item xs={12} sm={12}>
                        <Grid container sx={{ alignItems: 'center' }}>
                            <Grid item xs={8} sm={10}>
                                <Typography variant="h6" gutterBottom>
                                    Nota Gestion del proyecto
                                </Typography>
                            </Grid>
                            <Grid item xs={8} sm={2}>
                                <TextField
                                    required
                                    requiredMessage="This field is required."
                                    errorTarget="under"
                                    id="projectManagementNote"
                                    name="projectManagementNote"
                                    fullWidth
                                    autoComplete="projectManagementNote"
                                    type="number"
                                    inputProps={{ min: 0, max: 10 }}
                                    size="small"
                                    disabled={isDisabled}
                                    value={form.projectManagementNote}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Grid container sx={{ alignItems: 'center' }}>
                            <Grid item xs={8} sm={10}>
                                <Typography variant="h6" gutterBottom>
                                    Nota Desarrollo del producto
                                </Typography>
                            </Grid>
                            <Grid item xs={8} sm={2}>
                                <TextField
                                    required
                                    requiredMessage="This field is required."
                                    errorTarget="under"
                                    id="productDevelopmentNote"
                                    name="productDevelopmentNote"
                                    fullWidth
                                    autoComplete="productDevelopmentNote"
                                    type="number"
                                    size="small"
                                    disabled={isDisabled}
                                    value={form.productDevelopmentNote}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Grid container sx={{ alignItems: 'center' }}>
                            <Grid item xs={8} sm={10}>
                                <Typography variant="h6" gutterBottom>
                                    Nota Final
                                </Typography>
                            </Grid>
                            <Grid item xs={8} sm={2}>
                                <TextField
                                    required
                                    requiredMessage="This field is required."
                                    errorTarget="under"
                                    id="finalNote"
                                    name="finalNote"
                                    fullWidth
                                    autoComplete="finalNote"
                                    type="number"
                                    size="small"
                                    disabled={isDisabled}
                                    value={form.finalNote}
                                />
                            </Grid>
                        </Grid>
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