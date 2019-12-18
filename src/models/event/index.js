import mongoose, { Schema } from 'mongoose'
import methods from './methods'
import statics from './statics'

const eventModel = new Schema({
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
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

Object.keys(methods).forEach(value => {
  eventModel.method(value, methods[value])
})
Object.keys(statics).forEach(value => {
  eventModel.statics[value] = statics[value]
})

export default mongoose.model('Event', eventModel)
