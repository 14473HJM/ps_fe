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
      const { id, valuations } = body;

      axios.post(`http://localhost:8080/ps/projects/${id}/valuations`, valuations, options)
        .then(function (response) {
          // Dato temporal hasta tener una respuesta válida.
          res.status(200).json(true);
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
