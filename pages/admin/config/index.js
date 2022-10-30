import { useSession, getSession } from "next-auth/react"
import {CodeFrameworksCardList, CodeFrameworksTable} from './../../../components/config/code-frameworks'
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Link from "@mui/material/Link";
import * as React from "react";
import {Title1} from './../../../components/common/title';

export default function Config({rows}) {
    const { data: session, status } = useSession()

    if (status === "loading") {
        return <p>Loading...</p>
    }


    if (status === "unauthenticated") {
        return <p>Access Denied</p>
    }

    if (session && session.user.role === "ADMIN") {
        return (
            <div>
                <CodeFrameworksTable codeFrameworks={rows} />
                <CodeFrameworksCardList codeFrameworks={rows} />
            </div>
        )
    }else {
        return (
            <div>
                <h1>You are not authorized to view this page!</h1>
            </div>
        )
    }

}

export async function getServerSideProps() {

    // Fetch data from external API
    const res = await fetch(`http://localhost:8080/config/code/frameworks`)
    const rows = await res.json()

    // Pass data to the page via props
    return { props: { rows } }
}