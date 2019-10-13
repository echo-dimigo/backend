import mongoose, { Schema } from 'mongoose'
import { EchoError } from '@/resources/error'
import checkAdmin from '@/resources/checkAdmin'

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

postModel.statics.createPost = async function (post, user) {
  const { title, content } = post

  const newPost = new this({
    title,
    content,
    writer: user._id
  })

  const savedPost = await newPost.save()
  return savedPost
}

postModel.method('checkPrivilege', function (user) {
  return checkAdmin(user) ||
    this.writer.equals(user._id)
})

postModel.statics.deletePost = async function (postId, user) {
  const post = await this.findById(postId)
  if (!post) throw new EchoError(404, 'Post Not Found')
  if (!post.checkPrivilege(user)) throw new EchoError(403)

  if (post.writer === user._id) {
    post.status = 'deleted'
  } else {
    post.status = 'hided'
  }

  await post.save()
}

export default mongoose.model('Post', postModel)
