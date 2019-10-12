import mongoose, { Schema } from 'mongoose'
import CreateError from 'http-errors'
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
    type: Number,
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
    writer: user.id
  })

  const savedPost = await newPost.save()
  return savedPost
}

postModel.method('checkPrivilege', function (user) {
  return checkAdmin(user) ||
    this.writer === user.id
})

postModel.statics.deletePost = async function (postId, user) {
  const post = await this.findById(postId)
  if (!post) throw new CreateError(404)
  if (!post.checkPrivilege(user)) throw new CreateError(403)

  if (post.writer === user.id) {
    post.status = 'deleted'
  } else {
    post.status = 'hided'
  }

  await post.save()
}

export default mongoose.model('Post', postModel)
