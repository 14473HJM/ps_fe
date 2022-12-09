import {getHeaders} from "../common";

export const getCodeLanguages = async (session, inactives) => {
    const myHeaders = await getHeaders(session, inactives);
    if(!myHeaders) {
        return null
    } else {
        const options = {
            method: 'GET',
            headers: myHeaders,
            cache: 'default',
        };
        const res = await fetch('http://localhost:8080/ps/config/code/languages', options);
        console.log(res);
        return res;
    }
};

export const getCodeLanguage = async (session, id, inactives) => {
    const myHeaders = await getHeaders(session, inactives);
    if(!myHeaders) {
        return null
    } else {
        const options = {
            method: 'GET',
            headers: myHeaders,
            cache: 'default',
        };
        const res = await fetch(`http://localhost:8080/ps/config/code/languages/${id}`, options);
        console.log(res);
        return res;
    }
};

export const postCodeLanguage = async (session, codeLanguage) => {
    const myHeaders = await getHeaders(session);
    if(!myHeaders) {
        return null;
    } else {
        const options = {
            method: 'POST',
            headers: myHeaders,
            cache: 'default',
            body: JSON.stringify(codeLanguage),
        };
        const res = await fetch('http://localhost:8080/ps/config/code/languages', options);
        console.log(res);
        return res;
    }
};

export const putCodeLanguage = async (session, codeLanguage) => {
    const myHeaders = await getHeaders(session);
    if(!myHeaders) {
        return null;
    } else {
        const options = {
            method: 'PUT',
            headers: myHeaders,
            cache: 'default',
            body: JSON.stringify(codeLanguage),
        };
        const res = await fetch(`http://localhost:8080/ps/config/code/languages/${codeLanguage.id}`, options);
        console.log(res);
        return res;
    }
};

export const deleteCodeLanguage = async (session, codeLanguage) => {
    const myHeaders = await getHeaders(session);
    if(!myHeaders) {
        return null;
    } else {
        const options = {
            method: 'DELETE',
            headers: myHeaders,
            cache: 'default',
        };
        const res = await fetch(`http://localhost:8080/ps/config/code/languages/${codeLanguage.id}`, options);
        console.log(res);
        return res;
    }
};