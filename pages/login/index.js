// import { getCsrfToken } from "next-auth/react"
//
// export default function SignIn({ csrfToken }) {
//     return (
//         <form method="post" action="/api/auth/callback/credentials">
//             <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
//             <label>
//                 Username
//                 <input name="username" type="text" />
//             </label>
//             <label>
//                 Password
//                 <input name="password" type="password" />
//             </label>
//             <button type="submit">Sign in</button>
//         </form>
//     )
// }
//
// export async function getServerSideProps(context) {
//     return {
//         props: {
//             csrfToken: await getCsrfToken(context),
//         },
//     }
// }

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getCsrfToken } from "next-auth/react"
import { signIn } from "next-auth/react"
import { SimpleCopyright, LogoCard } from "../../components/brand/copyright";

const theme = createTheme();

export default function Login({ csrfToken }) {
    const handleSubmit = (event) => {
        event.preventDefault();
        const credentials = {
            user_name: event.target.user_name.value,
            password: event.target.password.value,
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
                    <LogoCard sx={{ mt: 8, mb: 4 }}/>
                    {/*<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>*/}
                    {/*    <LockOutlinedIcon />*/}
                    {/*</Avatar>*/}
                    {/*<Typography component="h1" variant="h5">*/}
                    {/*    Sign in*/}
                    {/*</Typography>*/}
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
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <SimpleCopyright sx={{ mt: 8, mb: 4 }} />
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