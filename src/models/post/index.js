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
    enum: ['normal', 'deleted', 'hided'], // deleted: 사용자가 삭제, hided: 관리자가 숨김 처리
    default: 'normal'
  }
})

Object.keys(methods).forEach(value => {
  postModel.method(value, methods[value])
})
Object.keys(statics).forEach(value => {
  postModel.statics[value] = statics[value]
})

export default mongoose.model('Post', postModel)
