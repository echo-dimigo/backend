import mongoose, { Schema } from 'mongoose'
import methods from './methods'
import statics from './statics'

const tagModel = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  date: {
    type: Date,
    default: new Date()
  },
  joinOption: {
    type: String,
    enum: ['P', 'R', 'O'], // Private, Request, Opened
    required: true
  }
})

Object.keys(methods).forEach(value => {
  tagModel.method(value, methods[value])
})
Object.keys(statics).forEach(value => {
  tagModel.statics[value] = statics[value]
})

export default mongoose.model('Tag', tagModel)
