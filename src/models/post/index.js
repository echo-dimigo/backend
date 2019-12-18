import mongoose, { Schema } from 'mongoose'
import methods from './methods'
import statics from './statics'

const postModel = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    default: new Date()
  },
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['N', 'D', 'H', 'E'], // Normal, Deleted(자신이 삭제), Hided(관리자가 숨김), Edited(수정됨)
    default: 'N'
  }
})

Object.keys(methods).forEach(value => {
  postModel.method(value, methods[value])
})
Object.keys(statics).forEach(value => {
  postModel.statics[value] = statics[value]
})

export default mongoose.model('Post', postModel)
