import {getHeaders} from "../common";

export const getInvitations = async (session, inactives) => {
    const myHeaders = await getHeaders(session, inactives);
    if(!myHeaders) {
        return null
    } else {
        const options = {
            method: 'GET',
            headers: myHeaders,
            cache: 'default',
        };
        const res = await fetch('http://localhost:8080/ps/invitations', options);
        console.log(res);
        return res;
    }
};

export const getInvitation = async (session, id, inactives) => {
    const myHeaders = await getHeaders(session, inactives);
    if(!myHeaders) {
        return null
    } else {
        const options = {
            method: 'GET',
            headers: myHeaders,
            cache: 'default',
        };
        const res = await fetch(`http://localhost:8080/ps/invitations/${id}`, options);
        console.log(res);
        return res;
    }
};

export const getInvitationNyHash = async (session, hash, inactives) => {
    const myHeaders = await getHeaders(session, inactives);
    if(!myHeaders) {
        return null
    } else {
        const options = {
            method: 'GET',
            headers: myHeaders,
            cache: 'default',
        };
        const res = await fetch(`http://localhost:8080/ps/invitations/hash/${hash}`, options);
        console.log(res);
        return res;
    }
};

export const postInvitation = async (session, invitation) => {
    const myHeaders = await getHeaders(session);
    if(!myHeaders) {
        return null;
    } else {
        const options = {
            method: 'POST',
            headers: myHeaders,
            cache: 'default',
            body: JSON.stringify(invitation),
        };
        const res = await fetch('http://localhost:8080/ps/invitations', options);
        console.log(res);
        return res;
    }
};

export const resendInvitation = async (session, id) => {
    const myHeaders = await getHeaders(session);
    if(!myHeaders) {
        return null;
    } else {
        const options = {
            method: 'PUT',
            headers: myHeaders,
            cache: 'default',
        };
        const res = await fetch(`http://localhost:8080/ps/invitations/${id}/resend`, options);
        console.log(res);
        return res;
    }
};

export const cancelInvitation = async (session, id) => {
    const myHeaders = await getHeaders(session);
    if(!myHeaders) {
        return null;
    } else {
        const options = {
            method: 'PUT',
            headers: myHeaders,
            cache: 'default'
        };
        const res = await fetch(`http://localhost:8080/ps/invitations/${id}/cancel`, options);
        console.log(res);
        return res;
    }
};

export const putInvitation = async (session, invitation) => {
    const myHeaders = await getHeaders(session);
    if(!myHeaders) {
        return null;
    } else {
        const options = {
            method: 'PUT',
            headers: myHeaders,
            cache: 'default',
            body: JSON.stringify(invitation),
        };
        const res = await fetch(`http://localhost:8080/ps/invitations/${invitation.id}`, options);
        console.log(res);
        return res;
    }
};
