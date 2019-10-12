import mongoose, { Schema } from 'mongoose'

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

export default mongoose.model('Post', postModel)
