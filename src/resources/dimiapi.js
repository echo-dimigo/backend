import axios from 'axios'

export const getAuthURI = (username, password) => {
  return `${process.env.DIMIAPI_URL}` +
    `/v1/users/identify?username=${username}&password=${password}`
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
