import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"


const options = {
    providers : [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                user_name: { label: "Username", type: "text", placeholder: "Your userName" },
                password: {  label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const res = await fetch("http://localhost:8080/oauth/login", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { accept: '*/*',
                        "Content-Type": "application/json" }
                })
                console.log(res)
                const beUser = await res.json()
                const user = {
                    name: beUser.user?.userName,
                    access_token : beUser.token,
                    role: beUser.user?.roles[0]?.name,
                    id: beUser.user.id,
                };
                // If no error and we have user data, return it
                if (user) {
                    return user
                }
                // Return null if user data could not be retrieved
                return null
            }
        })
    ],
    // session : {
    //     jwt: true,
    // },
    callbacks : {
        async jwt({ token, user, account, profile, isNewUser }) {
            if(account) {
                token.account = {
                    ...account
                };
            }
            if(user) {
                token.role = user.role;
                token.userId = user.id;
                token.access_token = user.access_token;
            }
            return token
        },
        async session({ session, token}) {
            session.user.role = token.role;
            session.user.id = token.userId;
            session.user.access_token = token.access_token;
            return session
        }
    },
    // pages: {
    //     signIn: '/login',
    // }
}

export default (req, res) => NextAuth(req, res, options)