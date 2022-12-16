import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"
import axios from 'axios';

const options = {
    providers : [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                user_name: { label: "Username", type: "text", placeholder: "Your userName" },
                password: {  label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                try {
                    const { data: beUser } = await axios.post("http://localhost:8080/oauth/login", credentials, {
                        headers: {
                            accept: '*/*',
                            "Content-Type": "application/json"
                        }
                    });

                    return {
                        name: beUser.user?.userName,
                        access_token: beUser.token,
                        roles: beUser.user?.roles,
                        id: beUser.user?.id,
                        person: beUser.user?.person,
                    };
                } catch ({ response }) {
                    const { message } = response.data;
                    throw new Error(message);
                }
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
                token.roles = user.roles;
                token.userId = user.id;
                token.access_token = user.access_token;
                token.person = user.person;
            }
            return token
        },
        async session({ session, token}) {
            session.user.roles = token.roles;
            session.user.id = token.userId;
            session.user.access_token = token.access_token;
            session.user.person = token.person;
            return session
        }
    },
    pages: {
        signIn: '/login',
        signOut: '/login',
        error: '/login',
    }
}

export default (req, res) => NextAuth(req, res, options)