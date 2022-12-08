import * as React from 'react';
import {getToken} from "next-auth/jwt";
import EnhancedTable from "../../components/common/tables/sortingAndSelectingTable";
import DataGridReport from "../../components/common/tables/dataGridReports";

export default function Test({data}) {

    function createData(id, userName, createdDate, lastUpdatedDate, roles) {
        return {
            id, userName, createdDate, lastUpdatedDate, roles
        };
    }
    const rows = data.map(
        (u) => createData(u.id, u.userName, u.createdDate, u.lastUpdatedDate, u.roles.concat())
    );

    const columns = [
        {
            field: 'id',
            editable: false,
            width: 90,
            type: 'number',
            headerName: 'ID',
        },
        {
            field: 'userName',
            editable: false,
            width: 150,
            headerName: 'Usuario',
        },
        {
            field: 'createdDate',
            editable: false,
            width: 150,
            headerName: 'Fecha de creación',
        },
        {
            field: 'lastUpdatedDate',
            editable: false,
            width: 150,
            sortable: false,
            headerName: 'Última Modificación',
        },
        {
            field: 'roles',
            editable: true,
            width: 150,
            description: 'This column has a value getter and is not sortable.',
            headerName: 'Roles',
        }
    ];

    return(
        <DataGridReport columns={columns} rows={rows} title="Usuarios" />
    );
}


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
        const res = await fetch(`http://localhost:8080/ps/users`, options)
        const data = await res.json()
        // Pass data to the page via props
        return {props: {data}}
    } else {
        return {props: {}};
    }
}