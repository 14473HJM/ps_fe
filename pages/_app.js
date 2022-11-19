import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"

export default function MyApp({
                              Component,
                              pageProps: { session, ...pageProps },
                            }) {

    const getLayout = Component.getLayout || ((page) => page)

    return (
        getLayout(<SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>)
    )
}
