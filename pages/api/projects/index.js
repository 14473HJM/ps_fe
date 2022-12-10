import { getToken } from 'next-auth/jwt'; 
import axios from 'axios';

const secret = process.env.SECRET;

const handler = async (req, res) => {
    const { body } = req;
    const token = await getToken({ req, secret });
    console.log(token);
    const { access_token, userId, roles } = token;
    body.students = [{ id: userId, objectType: roles[0]}]
    const options = {
        headers: {
            'Authorization': 'Bearer ' + access_token,
        },
    };

    axios.post('http://localhost:8080/ps/projects', body, options)
        .then(function (response) {
            res.status(200).json(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
};

export default handler;
