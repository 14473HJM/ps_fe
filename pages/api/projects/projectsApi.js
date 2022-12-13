import {getHeaders} from "../common";

export const getProjects = async (session, inactives) => {
    const myHeaders = await getHeaders(session, inactives);
    if(!myHeaders) {
        return null
    } else {
        const options = {
            method: 'GET',
            headers: myHeaders,
            cache: 'default',
        };
        const res = await fetch('http://localhost:8080/ps/projects', options);
        console.log(res);
        return res;
    }
};

export const getProject = async (session, id, inactives) => {
    const myHeaders = await getHeaders(session, inactives);
    if(!myHeaders) {
        return null
    } else {
        const options = {
            method: 'GET',
            headers: myHeaders,
            cache: 'default',
        };
        const res = await fetch(`http://localhost:8080/ps/projects/${id}`, options);
        console.log(res);
        return res;
    }
};

export const postProject = async (session, project) => {
    const myHeaders = await getHeaders(session);
    if(!myHeaders) {
        return null;
    } else {
        const options = {
            method: 'POST',
            headers: myHeaders,
            cache: 'default',
            body: JSON.stringify(project),
        };
        const res = await fetch('http://localhost:8080/ps/projects', options);
        console.log(res);
        return res;
    }
};

export const postProjectComment = async (session, project, comment) => {
    const myHeaders = await getHeaders(session);
    if(!myHeaders) {
        return null;
    } else {
        const options = {
            method: 'POST',
            headers: myHeaders,
            cache: 'default',
            body: JSON.stringify(comment),
        };
        const res = await fetch(`http://localhost:8080/ps/projects/${project.id}/conversation/comments`, options);
        console.log(res);
        return res;
    }
};

export const moveProject = async (session, project, comment, action) => {
    const myHeaders = await getHeaders(session);
    if(!myHeaders) {
        return null;
    } else {
        const options = {
            method: 'PUT',
            headers: myHeaders,
            cache: 'default',
            body: JSON.stringify(comment),
        };
        const res = await fetch(`http://localhost:8080/ps/projects/${project.id}/status?action=${action}`, options);
        console.log(res);
        return res;
    }
};

export const putProject = async (session, project) => {
    const myHeaders = await getHeaders(session);
    if(!myHeaders) {
        return null;
    } else {
        const options = {
            method: 'PUT',
            headers: myHeaders,
            cache: 'default',
            body: JSON.stringify(project),
        };
        const res = await fetch(`http://localhost:8080/ps/projects/${project.id}`, options);
        console.log(res);
        return res;
    }
};

export const addTutor = async (session, projectId, tutorId, comment) => {
    console.log(projectId)
    console.log(tutorId)
    const myHeaders = await getHeaders(session);
    if(!myHeaders) {
        return null;
    } else {
        if(comment != null) {
            const options = {
                method: 'PUT',
                headers: myHeaders,
                cache: 'default',
                body: JSON.stringify(comment),
            };
            const res = await fetch(`http://localhost:8080/ps/projects/${projectId}/tutor/${tutorId}`, options);
            console.log(res);
            return res;
        } else {
            const options = {
                method: 'PUT',
                headers: myHeaders,
                cache: 'default',
            };
            const res = await fetch(`http://localhost:8080/ps/projects/${projectId}/tutor/${tutorId}`, options);
            console.log(res);
            return res;
        }
    }
};

export const deleteProject = async (session, project) => {
    const myHeaders = await getHeaders(session);
    if(!myHeaders) {
        return null;
    } else {
        const options = {
            method: 'DELETE',
            headers: myHeaders,
            cache: 'default',
        };
        const res = await fetch(`http://localhost:8080/ps/projects/${project.id}`, options);
        console.log(res);
        return res;
    }
};