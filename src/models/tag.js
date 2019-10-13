import mongoose, { Schema } from 'mongoose'
import { EchoError } from '@/resources/error'
import checkAdmin from '@/resources/checkAdmin'

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

tagModel.method('checkPrivilege', function (user) {
  return checkAdmin(user) ||
    this.owner.equals(user._id)
})

tagModel.statics.getAllTags = async function (user) {
  const allTags = this.find({})
  if (checkAdmin(user)) return allTags

  const filteredTag = this.find({ $or: [
    { joinOption: { $in: ['R', 'O'] } },
    { owner: user._id }
  ]})
  return filteredTag
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
