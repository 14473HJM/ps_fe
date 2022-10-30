import { useSession, getSession } from "next-auth/react"
import Link from "next/link";

export default function Dashboard({users}) {
    const { data: session, status } = useSession()

    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (status === "unauthenticated") {
        return <p>Access Denied</p>
    }

    if (session && session.user.role === "ADMIN") {


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
    const res = await fetch(`http://localhost:8080/ps/users`)
    const users = await res.json()

    // Pass data to the page via props
    return { props: { users } }
}