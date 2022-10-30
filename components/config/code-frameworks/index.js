import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Title1} from './../../common/title';
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from '@mui/material/CardActions';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export function CodeFrameworksTable({ codeFrameworks }) {
    return (
        <React.Fragment>
            <Title1>Code Frameworks</Title1>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {codeFrameworks.map((row) =>
                        <TableRow key={row.id}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.type}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.description}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}

export function CodeFrameworksCard({codeFramework}) {
    return(
        <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
            <CardMedia
                component="img"
                sx={{
                    // 16:9
                    // pt: '0%',
                    //flexGrow: 2
                }}
                image={codeFramework.imageLink}
                alt="random"
            />
            <CardContent sx={{
                flexGrow: 1
            }}>
                <Typography gutterBottom variant="h5" component="h2">
                    {codeFramework.name}
                </Typography>
                <Typography>
                    {codeFramework.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">View</Button>
                <Button size="small">Edit</Button>
            </CardActions>
        </Card>
    );
}

export function CodeFrameworksCardList({codeFrameworks}) {
    return (
        <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
                {codeFrameworks.map((codeFramework) => (
                    <Grid item key={codeFramework.id} xs={12} sm={6} md={4}>
                        <CodeFrameworksCard codeFramework={codeFramework} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}