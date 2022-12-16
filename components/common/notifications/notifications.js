import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Soon from '../soon';


export default function NotificationCard(props) {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                    Notification Type
                </Typography>
                <Typography variant="h6" component="div">
                    Notification Title
                </Typography>
                {/*<Typography sx={{ mb: 1.5 }} color="text.secondary">*/}
                {/*    Notification subtitle*/}
                {/*</Typography>*/}
                <Typography variant="body2">
                    Notification Body.
                    <br />
                    <br />
                </Typography>
                <Typography variant="body2" textAlign={'center'}>
                    {<Soon />}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color={'success'}>Leido</Button>
            </CardActions>
        </Card>
    );
}