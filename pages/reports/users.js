import {getToken} from "next-auth/jwt";
import Users from "../users";
import DataGridReport from "../../components/common/tables/dataGridReports";

const columns = [
    {field: 'userName', headerName: 'Usuario', type:'string', },
    { field: 'createdDate', headerName: 'Fecha Creación', type:'datetime', minWidth: 200},
    { field: 'recordStatus', headerName: 'Estado del registro', type:'string'},
    { field: 'avatar', headerName: 'Avatar', type:'string'},
    { field: 'enabled', headerName: 'Habilitado', type:'boolean'},
    { field: 'accountExpired', headerName: 'Cuenta Expirada', type:'boolean', minWidth: 150},
    { field: 'accountLocked', headerName: 'Cuenta Bloqueada', type:'boolean', minWidth: 150},
    { field: 'passwordExpirationDate', headerName: 'Expiración de password', type:'date', minWidth: 200},
    { field: 'credentialExpired', headerName: 'Password Expirada', type:'boolean', minWidth: 150},
];

export default function UsersReport({users}) {

    return(
        <DataGridReport columns={columns} rows={users} />
    );
}

UsersReport.auth = true;

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
        const users = await res.json()
        // Pass data to the page via props
        return {props: {users}}
    } else {
        return {props: {}};
    }
}