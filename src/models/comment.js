import mongoose, { Schema } from 'mongoose'

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
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['normal', 'deleted', 'hided'], // deleted: 사용자가 삭제, hided: 관리자가 숨김 처리
    default: 'normal'
  },
  for: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }
})

export default mongoose.model('Comment', commentModel)
