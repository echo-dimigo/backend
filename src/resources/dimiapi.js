import axios from 'axios'
import { UserModel } from '@/models'

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
  const identityFromDB = await UserModel.findByIdx(identity.id)
  if (identityFromDB) {
    return {
      ...identity,
      _id: identityFromDB._id
    }
  } else {
    return identity
  }
}
