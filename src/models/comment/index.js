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
    enum: ['normal', 'deleted', 'hided', 'edited'], // deleted: 사용자가 삭제, hided: 관리자가 숨김 처리
    default: 'normal'
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
