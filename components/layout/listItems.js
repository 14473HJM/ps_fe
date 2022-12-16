import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BadgeIcon from '@mui/icons-material/Badge';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import WorkIcon from '@mui/icons-material/Work';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SettingsIcon from '@mui/icons-material/Settings';



export const mainProfessorListItems = (
    <React.Fragment>
        <ListItemButton href='/dashboard'>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton  href='/projects'>
            <ListItemIcon>
                <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Proyectos" />
        </ListItemButton>
        <ListItemButton  href='/invitations'>
            <ListItemIcon>
                <LocalActivityIcon />
            </ListItemIcon>
            <ListItemText primary="Invitaciones" />
        </ListItemButton>
        <ListItemButton  href='/profile'>
            <ListItemIcon>
                <BadgeIcon />
            </ListItemIcon>
            <ListItemText primary="Mi Perfil" />
        </ListItemButton>
        <ListItemButton href='/help'>
            <ListItemIcon>
                <SupportAgentIcon />
            </ListItemIcon>
            <ListItemText primary="Ayuda" />
        </ListItemButton>
    </React.Fragment>
);

export const mainAdminListItems = (
    <React.Fragment>
        <ListItemButton href='/dashboard'>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton  href='/projects'>
            <ListItemIcon>
                <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Proyectos" />
        </ListItemButton>
        <ListItemButton  href='/invitations'>
            <ListItemIcon>
                <LocalActivityIcon />
            </ListItemIcon>
            <ListItemText primary="Invitaciones" />
        </ListItemButton>
        <ListItemButton  href='/users'>
            <ListItemIcon>
                <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText primary="Usuarios" />
        </ListItemButton>
        <ListItemButton  href='/admin/config'>
            <ListItemIcon>
                <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Configuración" />
        </ListItemButton>
        <ListItemButton  href='/profile'>
            <ListItemIcon>
                <BadgeIcon />
            </ListItemIcon>
            <ListItemText primary="Mi Perfil" />
        </ListItemButton>
        <ListItemButton href='/help'>
            <ListItemIcon>
                <SupportAgentIcon />
            </ListItemIcon>
            <ListItemText primary="Ayuda" />
        </ListItemButton>
    </React.Fragment>
);

export const mainStudentListItems = (
    <React.Fragment>
        <ListItemButton  href='/projects'>
            <ListItemIcon>
                <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Proyectos" />
        </ListItemButton>
        <ListItemButton  href='/profile'>
            <ListItemIcon>
                <BadgeIcon />
            </ListItemIcon>
            <ListItemText primary="Mi Perfil" />
        </ListItemButton>
        <ListItemButton href='/help'>
            <ListItemIcon>
                <SupportAgentIcon />
            </ListItemIcon>
            <ListItemText primary="Ayuda" />
        </ListItemButton>
    </React.Fragment>
);

export const adminSecondaryListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset>
            Reportes
        </ListSubheader>
        <ListItemButton href='/reports/users'>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Usuarios" />
        </ListItemButton>
        <ListItemButton href='/reports/projects'>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Projectos" />
        </ListItemButton>
        <ListItemButton href='/reports/invitations'>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Invitaciones" />
        </ListItemButton>
    </React.Fragment>
);

export const professorSecondaryListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset>
            Reportes
        </ListSubheader>
        <ListItemButton href='/reports/projects'>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Projectos" />
        </ListItemButton>
        <ListItemButton href='/reports/invitations'>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Invitaciones" />
        </ListItemButton>
    </React.Fragment>
);