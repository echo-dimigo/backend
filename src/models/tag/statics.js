import { TagModel } from '@/models'
import { EchoError } from '@/resources/error'
import checkAdmin from '@/resources/checkAdmin'

async function findByName (name) {
  const tag = await TagModel.findOne({ name })
  return tag
}

async function deleteTag (tagId, user) {
  const tag = await TagModel.findById(tagId)
  if (!tag) throw new EchoError(404, 'Post Not Found')
  if (!tag.checkPrivilege(user)) throw new EchoError(403)

  await tag.remove()
}

async function getAllTags (user) {
  const allTags = await TagModel.find({})
  if (checkAdmin(user)) return allTags

  const filteredTag = await TagModel.find({
    $or: [
      { joinOption: { $in: ['R', 'O'] } },
      { owner: user._id }
    ]
  })
  return filteredTag
}

async function createTag (tag, user) {
  const { name, description, joinOption } = tag
  if (await TagModel.findByName(name)) {
    throw new EchoError(409, 'Same Name Already Exists')
  }

  const newTag = new TagModel({
    name,
    description,
    joinOption,
    owner: user._id
  })
  const savedTag = await newTag.save()
  return savedTag
}

export default {
  findByName,
  deleteTag,
  getAllTags,
  createTag
}
