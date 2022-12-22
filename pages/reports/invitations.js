import {getToken} from "next-auth/jwt";
import Users from "../users";
import DataGridReport from "../../components/common/tables/dataGridReports";
import Typography from "@mui/material/Typography";
import * as React from "react";


const columns = [
    { field: 'legajo', headerName: 'Legajo', type:'string', },
    { field: 'email', headerName: 'Email', type:'string', minWidth: 250},
    { field: 'invitationStatus', headerName: 'Estado', type:'string'},
    { field: 'usedDate', headerName: 'Fecha de Uso', type:'string', minWidth: 200 },
    { field: 'dueDateTime', headerName: 'Fecha de Vencimiento', type:'string', minWidth: 200},
    { field: 'numberOfDeliveries', headerName: 'Cantidad de envios', type:'number',  minWidth: 200}
];

export default function InvitationsReport({invitations}) {

    return(
        <React.Fragment>
            <Typography component="h1" variant="h5" color="primary" gutterBottom mr={10}>
                Reporte de Invitaciones
            </Typography>
            <br/>
            <DataGridReport columns={columns} rows={invitations} />
        </React.Fragment>
    );
}

InvitationsReport.auth = true;

export async function getServerSideProps(context) {

    const { req } = context;
    const token = await getToken({ req })
    if(token != null) {
        const {access_token} = token

        const options = {
            headers: {
                'accept': '*/*',
                'charset': 'UTF-8',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token,
            }
        };

        // Fetch data from external API
        const res = await fetch('http://localhost:8080/ps/invitations', options);
        const invitations = await res.json()
        // Pass data to the page via props
        return {props: {invitations}}
    } else {
        return {props: {}};
    }
}