import mongoose, { Schema } from 'mongoose'
import { EchoError } from '@/resources/error'

const tagModel = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    default: new Date()
  },
  joinOption: {
    type: String,
    enum: ['P', 'R', 'O'], // Private, Request, Opened
    required: true
  }
})

tagModel.statics.findByName = async function (name) {
  const tag = await this.findOne({ name })
  return tag
}

tagModel.statics.createTag = async function (tag, user) {
  const { name, description, joinOption } = tag
  if (await this.findByName(name)) {
    throw new EchoError(409, 'Same Name Already Exists')
  }

  const newTag = new this({
    name,
    description,
    joinOption,
    owner: user._id
  })
  const savedTag = await newTag.save()
  return savedTag
}

export default mongoose.model('Tag', tagModel)
