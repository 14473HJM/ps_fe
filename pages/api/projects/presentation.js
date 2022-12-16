import { getToken } from 'next-auth/jwt';
import axios from 'axios';

const secret = process.env.SECRET;

const handler = async (req, res) => {
  const { method, body } = req;
  const token = await getToken({ req, secret });
  const { access_token, userId, roles } = token;
  const options = {
    headers: {
      'Authorization': 'Bearer ' + access_token,
    },
  };

  switch (method) {
    case 'POST':
      const { id } = body;

      axios.post(`http://localhost:8080/ps/projects/${id}/presentation`, body, options)
        .then(function (response) {
          res.status(200).json(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      break;
    default:
      res.status(404);
      break;
  }
};

export default handler;
