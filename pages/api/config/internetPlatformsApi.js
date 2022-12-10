import {getHeaders} from "../common";

export const getInternetPlatforms = async (session, inactives) => {
    const myHeaders = await getHeaders(session, inactives);
    if(!myHeaders) {
        return null
    } else {
        const options = {
            method: 'GET',
            headers: myHeaders,
            cache: 'default',
        };
        const res = await fetch('http://localhost:8080/ps/config/internet/platforms', options);
        console.log(res);
        return res;
    }
};

export const getInternetPlatform = async (session, id, inactives) => {
    const myHeaders = await getHeaders(session, inactives);
    if(!myHeaders) {
        return null
    } else {
        const options = {
            method: 'GET',
            headers: myHeaders,
            cache: 'default',
        };
        const res = await fetch(`http://localhost:8080/ps/config/internet/platforms/${id}`, options);
        console.log(res);
        return res;
    }
};

export const postInternetPlatform = async (session, element) => {
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
        const res = await fetch('http://localhost:8080/ps/config/internet/platforms', options);
        console.log(res);
        return res;
    }
};

export const putInternetPlatform = async (session, element) => {
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
        const res = await fetch(`http://localhost:8080/ps/config/internet/platforms/${element.id}`, options);
        console.log(res);
        return res;
    }
};

export const deleteInternetPlatform = async (session, element) => {
    const myHeaders = await getHeaders(session);
    if(!myHeaders) {
        return null;
    } else {
        const options = {
            method: 'DELETE',
            headers: myHeaders,
            cache: 'default',
        };
        const res = await fetch(`http://localhost:8080/ps/config/internet/platforms/${element.id}`, options);
        console.log(res);
        return res;
    }
};