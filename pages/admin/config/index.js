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
import Invitations from "../../invitations";

export default function Config({rows}) {
    const { data: session } = useSession()

    if (session && session.user.roles.includes("ADMIN")) {
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

Config.auth = true;

export async function getServerSideProps() {

    // Fetch data from external API
    const res = await fetch(`http://localhost:8080/config/code/frameworks`)
    const rows = await res.json()

    // Pass data to the page via props
    return { props: { rows } }
}