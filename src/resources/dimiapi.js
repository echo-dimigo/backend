import axios from 'axios'

export const getAuthURI = (id, password) => {
  return `${process.env.DIMIAPI_URL}` +
    `/v1/users/identify?username=${id}&password=${password}`
}

export const getUserIdentity = async (username, password) => {
  const identity = (await axios.get(getAuthURI(username, password), {
    auth: {
      username: process.env.DIMIAPI_ID,
      password: process.env.DIMIAPI_PW
    }
  })).data
  return identity
}
