import { TagModel } from '@/models'
import asyncWrapper from '@/resources/async-wrapper'

async function CreateTag (req, res, next) {
  const savedTag = await TagModel.createTag(req.body, req.user)
  res.json({
    tag: savedTag
  })
}

async function GetAllTags (req, res, next) {
  const allTags = await TagModel.getAllTags(req.user)
  res.json({
    tags: allTags
  })
}

async function DeleteTag (req, res, next) {
  await TagModel.deleteTag(req.params.tagId, req.user)
  res.status(204).end()
}

export default {
  CreateTag: asyncWrapper(CreateTag),
  GetAllTags: asyncWrapper(GetAllTags),
  DeleteTag: asyncWrapper(DeleteTag)
}
