import {getHeaders} from "../common";

export const getCodeFrameworks = async (session) => {
    const myHeaders = await getHeaders(session);
    if(!myHeaders) {
        return null
    } else {
        const options = {
            method: 'GET',
            headers: myHeaders,
            cache: 'default',
        };
        const res = await fetch('http://localhost:8080/ps/config/code/frameworks', options);
        console.log(res);
        return res;
    }
};

export const getCodeFramework = async (session, id) => {
    const myHeaders = await getHeaders(session);
    if(!myHeaders) {
        return null
    } else {
        const options = {
            method: 'GET',
            headers: myHeaders,
            cache: 'default',
        };
        const res = await fetch(`http://localhost:8080/ps/config/code/frameworks/${id}`, options);
        console.log(res);
        return res;
    }
};

export const postCodeFramework = async (session, codeFramework) => {
    const myHeaders = await getHeaders(session);
    if(!myHeaders) {
        return null;
    } else {
        const options = {
            method: 'POST',
            headers: myHeaders,
            cache: 'default',
            body: JSON.stringify(codeFramework),
        };
        const res = await fetch('http://localhost:8080/ps/config/code/frameworks', options);
        console.log(res);
        return res;
    }
};

export const putCodeFramework = async (session, codeFramework) => {
    const myHeaders = await getHeaders(session);
    if(!myHeaders) {
        return null;
    } else {
        const options = {
            method: 'PUT',
            headers: myHeaders,
            cache: 'default',
            body: JSON.stringify(codeFramework),
        };
        const res = await fetch(`http://localhost:8080/ps/config/code/frameworks/${codeFramework.id}`, options);
        console.log(res);
        return res;
    }
};

export const deleteCodeFramework = async (session, codeFramework) => {
    const myHeaders = await getHeaders(session);
    if(!myHeaders) {
        return null;
    } else {
        const options = {
            method: 'DELETE',
            headers: myHeaders,
            cache: 'default',
        };
        const res = await fetch(`http://localhost:8080/ps/config/code/frameworks/${codeFramework.id}`, options);
        console.log(res);
        return res;
    }
};