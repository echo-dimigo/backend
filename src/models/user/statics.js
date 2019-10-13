import { UserModel } from '@/models'
import { EchoError } from '@/resources/error'

async function findByIdx (id) {
  const user = await UserModel.findOne({ id })
  return user || false
}

async function createUser (identity) {
  if (await UserModel.findByIdx(identity.id)) throw new EchoError(409)

  const newUser = new UserModel({
    id: identity.id,
    username: identity.username,
    name: identity.name,
    image: identity.photofile1,
    type: identity.user_type,
    serial: identity.id,
    email: identity.email,
    gender: identity.gender
  })

  const savedUser = await newUser.save()
  return savedUser
}

export default {
  findByIdx,
  createUser
}
