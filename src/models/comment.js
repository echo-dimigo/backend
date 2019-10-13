import mongoose, { Schema } from 'mongoose'
import { PostModel } from '@/models'
import CreateError from 'http-errors'

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
    enum: ['normal', 'deleted', 'hided'], // deleted: 사용자가 삭제, hided: 관리자가 숨김 처리
    default: 'normal'
  },
  target: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Post'
  }
})

commentModel.statics.createComment = async function (comment, user) {
  const post = await PostModel.findById(comment.target)
  if (!post) throw new CreateError(404)

  const { content, target } = comment
  const newComment = new this({
    content,
    target,
    writer: user._id
  })

  const savedComment = await newComment.save()
  return savedComment
}

export default mongoose.model('Comment', commentModel)
