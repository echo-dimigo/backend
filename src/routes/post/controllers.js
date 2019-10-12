import { validationResult } from 'express-validator'
import { PostModel } from '@/models'
import asyncWrapper from '@/resources/async-wrapper'
import CreateError from 'http-errors'

async function CreatePost (req, res, next) {
  if (!validationResult(req).isEmpty()) throw new CreateError(400)
  
  const post = await PostModel.createPost(req.body, req.user)

  res.json({
    post
  })
}

export default {
  CreatePost: asyncWrapper(CreatePost)
}
