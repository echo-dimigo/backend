import { validationResult } from 'express-validator'
import { PostModel } from '@/models'
import asyncWrapper from '@/resources/async-wrapper'
import { ValidationError } from '@/resources/error'

async function CreatePost (req, res, next) {
  if (!validationResult(req).isEmpty()) {
    throw new ValidationError(validationResult(req))
  }

  const post = await PostModel.createPost(req.body, req.user)
  res.json({
    post
  })
}

async function DeletePost (req, res, next) {
  await PostModel.deletePost(req.params.postId, req.user)
  res.status(204).end()
}

export default {
  CreatePost: asyncWrapper(CreatePost),
  DeletePost: asyncWrapper(DeletePost)
}
