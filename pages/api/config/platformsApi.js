import {getHeaders} from "../common";

export const getPlatforms = async (session, inactives) => {
    const myHeaders = await getHeaders(session, inactives);
    if(!myHeaders) {
        return null
    } else {
        const options = {
            method: 'GET',
            headers: myHeaders,
            cache: 'default',
        };
        const res = await fetch('http://localhost:8080/ps/config/platforms', options);
        console.log(res);
        return res;
    }
};

export const getPlatform = async (session, id, inactives) => {
    const myHeaders = await getHeaders(session, inactives);
    if(!myHeaders) {
        return null
    } else {
        const options = {
            method: 'GET',
            headers: myHeaders,
            cache: 'default',
        };
        const res = await fetch(`http://localhost:8080/ps/config/platforms/${id}`, options);
        console.log(res);
        return res;
    }
};

export const postPlatform = async (session, element) => {
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
        const res = await fetch('http://localhost:8080/ps/config/platforms', options);
        console.log(res);
        return res;
    }
};

export const putPlatform = async (session, element) => {
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
        const res = await fetch(`http://localhost:8080/ps/config/platforms/${element.id}`, options);
        console.log(res);
        return res;
    }
};

export const deletePlatform = async (session, element) => {
    const myHeaders = await getHeaders(session);
    if(!myHeaders) {
        return null;
    } else {
        const options = {
            method: 'DELETE',
            headers: myHeaders,
            cache: 'default',
        };
        const res = await fetch(`http://localhost:8080/ps/config/platforms/${element.id}`, options);
        console.log(res);
        return res;
    }
};