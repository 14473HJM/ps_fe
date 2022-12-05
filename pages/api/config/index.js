import {getToken} from "next-auth/jwt";

export const getCodeFrameworks = async (req, res) => {
    console.log(req);
    const token = getToken(req);
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
        const res = await fetch('http://localhost:8080/ps/config/code/frameworks', options);
        console.log(res);
        const codeFrameworks = await res.json();
        // Pass data to the page via props
        console.log(codeFrameworks);
        return {codeFrameworks};
    } else {
        return {codeFrameworks: {}};
    }
};

export const postCodeFrameworks = async (context) => {
    const { req } = context;
    console.log(context);
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
        const res = await fetch('http://localhost:8080/ps/config/code/frameworks', options);
        console.log(res);
        const codeFrameworks = await res.json();
        // Pass data to the page via props
        console.log(codeFrameworks);
        return {codeFrameworks}
    } else {
        return {codeFrameworks: {}};
    }
};