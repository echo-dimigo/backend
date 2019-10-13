import mongoose, { Schema } from 'mongoose'
import methods from './methods'
import statics from './statics'

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

Object.keys(methods).forEach(value => {
  userModel.method(value, methods[value])
})
Object.keys(statics).forEach(value => {
  userModel.statics[value] = statics[value]
})

export default mongoose.model('User', userModel)
