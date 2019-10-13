import mongoose, { Schema } from 'mongoose'
import methods from './methods'
import statics from './statics'

const commentModel = new Schema({
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
    required: true,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['N', 'D', 'H', 'E'], // Normal, Deleted(자신이 삭제), Hided(관리자가 숨김), E(수정됨)
    default: 'N'
  },
  target: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Post'
  }
})

Object.keys(methods).forEach(value => {
  commentModel.method(value, methods[value])
})
Object.keys(statics).forEach(value => {
  commentModel.statics[value] = statics[value]
})

export default mongoose.model('Comment', commentModel)
