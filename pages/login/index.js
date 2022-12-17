import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getCsrfToken, signIn } from "next-auth/react"
import { Copyright, LogoCard } from "../../components/brand/copyright";
import Soon from '../../components/common/soon';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const theme = createTheme();

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login({ csrfToken, _error}) {

    const [openSnackbarError, setOpenSnackbarError] = React.useState(_error? true : false);

    const handleCloseSnackbar = (event, reason, t) => {
        if(t === "E") {
            if (reason === 'clickaway') {
                return;
            }
            setOpenSnackbarError(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const credentials = {
            user_name: event.target.user_name.value,
            password: event.target.password.value,
            callbackUrl: '/projects',
        };
        signIn("credentials", credentials);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <LogoCard sx={{ mt: 8, mb: 4 }} color="black" width={300} />
                    <Box component="form"
                         onSubmit={handleSubmit}
                         noValidate sx={{ mt: 1 }}
                         // action="/api/auth/callback/credentials">
                        >
                        {/* TODO - Agregado */}
                        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="user_name"
                            label="UserName"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            color="primary"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Tooltip title={<Soon />} arrow>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Tooltip>
                            </Grid>
                            <Grid item>
                                <Tooltip title={<Soon />} arrow>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Request it!"}
                                    </Link>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright simple sx={{ mt: 8, mb: 4 }} color="black" />
            </Container>
            <Snackbar
                open={openSnackbarError}
                autoHideDuration={6000}
                onClose={(e, r) => handleCloseSnackbar(e, r, 'E')}
                anchorOrigin={{vertical: 'bottom', horizontal: 'bottom'}}
            >
                <Alert onClose={(e, r) => handleCloseSnackbar(e, r, 'E')} severity="error" sx={{ width: '100%' }}>
                    {_error}
                </Alert>
            </Snackbar>
        </ThemeProvider>
    );
}

// TODO - Agregado
export async function getServerSideProps(context) {
    const error = context.query.error ? context.query.error : '';
    return {
        props: {
            csrfToken: await getCsrfToken(context),
            _error: error,
        },
    }
}