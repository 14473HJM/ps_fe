import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getCsrfToken, signIn } from "next-auth/react"
import { Copyright, LogoCard } from "../../components/brand/copyright";

const theme = createTheme();

export default function Login({ csrfToken }) {
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
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Request it!"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright simple sx={{ mt: 8, mb: 4 }} color="black" />
            </Container>
        </ThemeProvider>
    );
}

// TODO - Agregado
export async function getServerSideProps(context) {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    }
}