import axios from "axios";
import { getToken } from "next-auth/jwt"

export async function getUsers({ req }) {
  const redirect = {
    destination: '/login',
    permanent: false,
  };
  const token = await getToken({ req })
  if (token) {
    const { access_token } = token
    const options = {
      headers: {
        'Authorization': 'Bearer ' + access_token,
      }
    };
    return axios.get('http://localhost:8080/ps/users', options)
      .then((res => ({ props: { users: res.data } })));
  }
  return { redirect };
}

export async function getUser({ req }) {
  const redirect = {
    destination: '/login',
    permanent: false,
  };
  const token = await getToken({ req })
  if (token) {
    const { access_token, userId } = token
    const options = {
      headers: {
        'Authorization': 'Bearer ' + access_token,
      }
    };
    return axios.get(`http://localhost:8080/ps/users/${userId}`, options)
      .then((res => ({ props: { users: res.data } })));
  }
  return { redirect };
}

export async function getProfessors({ req }) {
  const redirect = {
    destination: '/login',
    permanent: false,
  };
  const token = await getToken({ req })
  if (token) {
    const { access_token } = token
    const options = {
      headers: {
        'Authorization': 'Bearer ' + access_token,
      }
    };
    return axios.get('http://localhost:8080/ps/professors', options)
        .then((res => (res.data)));
  }
  return { redirect };
}