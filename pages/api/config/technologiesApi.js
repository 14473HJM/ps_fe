import {getHeaders} from "../common";

export const getTechnologies = async (session, inactives) => {
    const myHeaders = await getHeaders(session, inactives);
    if(!myHeaders) {
        return null
    } else {
        const options = {
            method: 'GET',
            headers: myHeaders,
            cache: 'default',
        };
        const res = await fetch('http://localhost:8080/ps/config/technologies', options);
        console.log(res);
        return res;
    }
};

export const getTechnology = async (session, id, inactives) => {
    const myHeaders = await getHeaders(session, inactives);
    if(!myHeaders) {
        return null
    } else {
        const options = {
            method: 'GET',
            headers: myHeaders,
            cache: 'default',
        };
        const res = await fetch(`http://localhost:8080/ps/config/technologies/${id}`, options);
        console.log(res);
        return res;
    }
};

export const postTechnology = async (session, element) => {
    const myHeaders = await getHeaders(session);
    if(!myHeaders) {
        return null;
    } else {
        const options = {
            method: 'POST',
            headers: myHeaders,
            cache: 'default',
            body: JSON.stringify(element),
        };
        const res = await fetch('http://localhost:8080/ps/config/technologies', options);
        console.log(res);
        return res;
    }
};

export const putTechnology = async (session, element) => {
    const myHeaders = await getHeaders(session);
    if(!myHeaders) {
        return null;
    } else {
        const options = {
            method: 'PUT',
            headers: myHeaders,
            cache: 'default',
            body: JSON.stringify(element),
        };
        const res = await fetch(`http://localhost:8080/ps/config/technologies/${element.id}`, options);
        console.log(res);
        return res;
    }
};

export const deleteTechnology = async (session, element) => {
    const myHeaders = await getHeaders(session);
    if(!myHeaders) {
        return null;
    } else {
        const options = {
            method: 'DELETE',
            headers: myHeaders,
            cache: 'default',
        };
        const res = await fetch(`http://localhost:8080/ps/config/technologies/${element.id}`, options);
        console.log(res);
        return res;
    }
};