import Link from "next/link";
import {useSession} from "next-auth/react";

export default function Projects() {

    const { data: session, status } = useSession()

    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (status === "unauthenticated") {
        return <p>Access Denied</p>
    }
    if (session && session.user.role === "USER") {
        return (
            <>
                <div>
                    <h1>User</h1>
                    <p>Welcome to the User Portal!</p>
                </div>
                <h1>Protected Page</h1>
                <p>You can view this page because you are signed in.</p>
                <p>You User is {session.user.name}</p>
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