import { useSession, getSession } from "next-auth/react"
import Link from "next/link";
import axios from "axios";
import { getToken } from "next-auth/jwt"
import Layout from "../../components/layout/layout";

export default function Dashboard({users}) {
    const { data: session, status } = useSession()

    return (
        <>
            <div>
                <h1>Admin</h1>
                <p>Welcome to the Admin Portal!</p>
            </div>
            <h1>Protected Page</h1>
            <p>You can view this page because you are signed in.</p>
            <p>You User is {session.user.name}</p>
            <p>You User ID is {session.user.id}</p>
            <p>Your session expire in {session.expires}</p>
            <div>
                <h1>Project</h1>
                <ul>
                    <li>
                        <Link href="/">Dashboard</Link>
                    </li>
                    <li>
                        <Link href="/projects">Projects</Link>
                    </li>
                </ul>
            </div>
            {console.log(users)}
            <ul>
                { users.map((user) => (
                    <li>{user.userName}</li>
                ))}
            </ul>
        </>
    )

}

Dashboard.auth = true;

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