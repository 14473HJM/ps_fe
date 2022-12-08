import axios from 'axios';

const handler = async (req, res) => {
  const { body } = req;

  axios.post('http://localhost:8080/ps/students', body, {})
    .then(function (response) {
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export default handler;
