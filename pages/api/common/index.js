import {getToken} from "next-auth/jwt";
import * as React from "react";

export const getHeaders = async (session) => {
    const {user} = session;
    const {access_token} = user;
    console.log(session);
    console.log(user);
    console.log(access_token);
    if(access_token != null) {
        const headers = {
                'accept': '*/*',
                'charset': 'UTF-8',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token,
            };
        return headers;
    } else {
        return null;
    }
};
