import {getToken} from "next-auth/jwt";
import Users from "../users";
import DataGridReport from "../../components/common/tables/dataGridReports";
import Typography from "@mui/material/Typography";
import * as React from "react";

function getCohortName(param) {
    return `${param.row.cohort.name}`;
}

function getStudents(param) {
    return `${param.row.students.map(s => s.name + ' ' + s.lastName)}`;
}

function getTutor(param) {
    return `${param.row.tutor.name + ' ' + param.row.tutor.lastName}`;
}

const columns = [
    { field: 'name', headerName: 'Nombre', type:'string', resizable: true },
    { field: 'projectType', headerName: 'Tipo', type:'string'},
    { field: 'projectStatus', headerName: 'Estado', type:'string'},
    { field: 'cohort', headerName: 'Cohorte', type:'string', valueGetter: getCohortName},
    { field: 'projectTheme', headerName: 'Tema', type:'string', minWidth: 200},
    { field: 'isRealProject', headerName: 'Real', type:'boolean'},
    { field: 'students', headerName: 'Estudiantes', type:'string', valueGetter: getStudents, minWidth: 200},
    { field: 'tutor', headerName: 'Tutor', type:'string', valueGetter: getTutor, minWidth: 150},
];

export default function ProjectsReport({projects}) {

    return(
        <React.Fragment>
            <Typography component="h1" variant="h5" color="primary" gutterBottom mr={10}>
                Reporte de Proyectos
            </Typography>
            <br/>
            <DataGridReport columns={columns} rows={projects} />
        </React.Fragment>
    );
}

ProjectsReport.auth = true;

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
        const res = await fetch(`http://localhost:8080/ps/projects`, options)
        const projects = await res.json()
        // Pass data to the page via props
        return {props: {projects}}
    } else {
        return {props: {}};
    }
}