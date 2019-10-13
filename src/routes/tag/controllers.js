import { TagModel } from '@/models'
import asyncWrapper from '@/resources/async-wrapper'
import { ValidationError } from '@/resources/error'
import { validationResult } from 'express-validator'

async function CreateTag (req, res, next) {
  if (!validationResult(req).isEmpty()) {
    throw new ValidationError(validationResult(req))
  }
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

export default {
  CreateTag: asyncWrapper(CreateTag),
  GetAllTags: asyncWrapper(GetAllTags)
}
