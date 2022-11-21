export const getUsers = async (session) => {
    const user = session.user;
    const token = user.token;
    try {
        const request = await fetch("http://localhost:8080/ps/users", { // example URL
            method: "GET",
            credentials: "include",
            headers: {
                Authorization: `Bearer ${token}`,  // <-- add token to request
                "Content-Type": "application/json",
            },
        });
        const json = await request.text();
        if (request.ok) {
            return json
        } else {
            throw json.message;
        }
    } catch (e) {
        throw new Error(e);
    }
};

export const postUsers = async () => {
    try {
        const request = await fetch("http://localhost:8080/ps/users", { // example URL
            method: "POST",
            credentials: "include",
            headers: {
                Authorization: `Bearer ${token}`,  // <-- add token to request
                "Content-Type": "application/json",
            },
        });
        const json = await request.text();
        if (request.ok) {
            return json
        } else {
            throw json.message;
        }
    } catch (e) {
        throw new Error(e);
    }
};