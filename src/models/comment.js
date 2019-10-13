import mongoose, { Schema } from 'mongoose'
import { PostModel } from '@/models'
import { EchoError } from '@/resources/error'
import checkAdmin from '@/resources/checkAdmin'

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

commentModel.statics.createComment = async function (comment, user) {
  const post = await PostModel.findById(comment.target)
  if (!post) throw new EchoError(404, 'Post Not Found')

  const { content, target } = comment
  const newComment = new this({
    content,
    target,
    writer: user._id
  })

  const savedComment = await newComment.save()
  return savedComment
}

commentModel.method('checkPrivilege', function (user) {
  return checkAdmin(user) ||
    this.writer.equals(user._id)
})

commentModel.statics.deleteComment = async function (commentId, user) {
  const comment = await this.findById(commentId)
  if (!comment) throw new EchoError(404, 'Comment Not Found')
  if (!comment.checkPrivilege(user)) throw new EchoError(403)

  if (comment.writer === user._id) {
    comment.status = 'deleted'
  } else {
    comment.status = 'hided'
  }

  await comment.save()
}

commentModel.statics.editComment = async function (commentId, newComment, user) {
  const origComment = await this.findById(commentId)
  if (!origComment) throw new EchoError(404, 'Comment Not Found')
  if (!origComment.checkPrivilege(user)) throw new EchoError(403)

  origComment.status = 'edited'
  origComment.content = newComment.content

  const savedComment = await origComment.save()
  return savedComment
}

export default mongoose.model('Comment', commentModel)
