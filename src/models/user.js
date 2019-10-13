import mongoose, { Schema } from 'mongoose'
import CreateError from 'http-errors'

const userModel = new Schema({
  id: { // in dimiapi
    type: Number,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: 'none'
  },
  type: {
    type: String,
    enum: ['T', 'D', 'S', 'A'],
    default: 'S'
  },
  serial: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['M', 'F'],
    required: true
  }
})

userModel.statics.findByIdx = async function (id) {
  const user = await this.findOne({ id })
  return user || false
}

userModel.statics.createUser = async function (identity) {
  if (await this.findByIdx(identity.id)) {
    throw new CreateError(409)
  }

  const newUser = new this({
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

export default mongoose.model('User', userModel)
