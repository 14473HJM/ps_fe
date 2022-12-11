import axios from "axios";
import { getToken } from "next-auth/jwt"

export async function getProjects({ req }) {
  const token = await getToken({ req })
  if (token) {
    const { access_token } = token
    const options = {
      headers: {
        'Authorization': 'Bearer ' + access_token,
      }
    };
    return axios.get('http://localhost:8080/ps/projects', options)
      .then((res => ({ props: { projects: res.data } })));
  }
  return { props: {} };
}

export async function getProjectById({ req, params }) {
  const { id } = params;
  const token = await getToken({ req })
  if (token && id != 'new') {
    const { access_token } = token
    const options = {
      headers: {
        'Authorization': 'Bearer ' + access_token,
      }
    };
    return axios.get(`http://localhost:8080/ps/projects/${id}`, options)
      .then((res => ({ props: { _project: res.data } })));
  }
  return { props: { _project: {} } };
}
