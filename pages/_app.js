import '../styles/globals.css'
import {SessionProvider, useSession} from "next-auth/react"
import Layout from "../components/layout/layout";

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
    return(
        <SessionProvider session={session}>
            {Component.auth ? (
                <Auth>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </Auth>
            ) : (
                <Component {...pageProps} />
            )}
        </SessionProvider>
    )
}

function Auth({ children }) {
    // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
    const { status } = useSession({ required: true })
    if (status === "loading") {
        return <div>Loading...</div>
    }
    if (status === "unauthenticated") {
        return <p>Access Denied</p>
    }
    return children
}

export default MyApp;
