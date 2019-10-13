import { CommentModel } from '@/models'
import { validationResult } from 'express-validator'
import asyncWrapper from '@/resources/async-wrapper'
import CreateError from 'http-errors'

async function CreateComment (req, res, next) {
  if (!validationResult(req).isEmpty()) throw validationResult(req)
  const comment = await CommentModel.createComment(req.body, req.user)

  res.json({
    comment
  })
}

export default {
  CreateComment: asyncWrapper(CreateComment)
}
