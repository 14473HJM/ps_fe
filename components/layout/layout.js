import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import {mainAdminListItems, mainProfessorListItems, mainStudentListItems, secondaryListItems} from './listItems';
import {AppBar} from './appbar'
import {Sidebar} from "./sidebar";
import { StickyFooter } from "../brand/stickyFooter";
import CardMedia from "@mui/material/CardMedia";
import { useSession, signOut } from "next-auth/react";
import Image from 'next/image'
import psuLogoWhite from '../../public/psa_b.png'
import psuLogoBlack from '../../public/psa_n.png'

const mdTheme = createTheme();

export default function Layout({ children }) {
    const [open, setOpen] = React.useState(true);
    const { data: session } = useSession()

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Box sx={{
                            display: 'flex',
                            flexGrow: 1,
                            justifyContent: open ? 'flex-end' : 'space-between',
                            alignItems: 'center',
                            py: 1,
                            ...(open && { height: 77 }),
                        }}>
                            {!open && <Image
                                src={psuLogoWhite}
                                alt="Práctica supervisada admin"
                                width={150}
                            />}
                            <Box>
                            <IconButton color="inherit" sx={{mr: 3}}>
                                <Badge badgeContent={4} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                                <IconButton color="inherit" onClick={signOut}>
                                <LogoutIcon />
                            </IconButton>
                            </Box>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Sidebar variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                            pt: [1]
                        }}
                    >
                        {open && <Image
                            src={psuLogoBlack}
                            alt="Práctica supervisada admin"
                            width={150}
                        />}
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider sx={{pt:1}}/>
                    <List component="nav">
                        {(session && session.user.roles.includes("ADMIN")) ? mainAdminListItems :
                            (session && session.user.roles.includes("PROFESSOR")) ? mainProfessorListItems : mainStudentListItems}
                        <Divider sx={{ my: 1 }} />
                        {secondaryListItems}
                    </List>
                </Sidebar>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}
                >
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, pt:10 }}>
                        {children}
                    </Container>
                    <StickyFooter color="black" />
                </Box>
            </Box>
        </ThemeProvider>
    )
}