import {getHeaders} from "../common";

export const getCohorts = async (session, inactives) => {
    const myHeaders = await getHeaders(session, inactives);
    if(!myHeaders) {
        return null
    } else {
        const options = {
            method: 'GET',
            headers: myHeaders,
            cache: 'default',
        };
        const res = await fetch('http://localhost:8080/ps/config/cohorts', options);
        console.log(res);
        return res;
    }
};

export const getCohort = async (session, id, inactives) => {
    const myHeaders = await getHeaders(session, inactives);
    if(!myHeaders) {
        return null
    } else {
        const options = {
            method: 'GET',
            headers: myHeaders,
            cache: 'default',
        };
        const res = await fetch(`http://localhost:8080/ps/config/cohorts/${id}`, options);
        console.log(res);
        return res;
    }
};

export const postCohort = async (session, element) => {
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
        const res = await fetch('http://localhost:8080/ps/config/cohorts', options);
        console.log(res);
        return res;
    }
};

export const putCohort = async (session, element) => {
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
        const res = await fetch(`http://localhost:8080/ps/config/cohorts/${element.id}`, options);
        console.log(res);
        return res;
    }
};

export const deleteCohort = async (session, element) => {
    const myHeaders = await getHeaders(session);
    if(!myHeaders) {
        return null;
    } else {
        const options = {
            method: 'DELETE',
            headers: myHeaders,
            cache: 'default',
        };
        const res = await fetch(`http://localhost:8080/ps/config/cohorts/${element.id}`, options);
        console.log(res);
        return res;
    }
};