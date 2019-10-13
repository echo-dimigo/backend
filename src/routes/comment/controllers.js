import { CommentModel } from '@/models'
import { validationResult } from 'express-validator'
import asyncWrapper from '@/resources/async-wrapper'

async function CreateComment (req, res, next) {
  if (!validationResult(req).isEmpty())
    throw new ValidationError(validationResult(req))

  const comment = await CommentModel.createComment(req.body, req.user)
  res.json({
    comment
  })
}

async function DeleteComment (req, res, next) {
  await CommentModel.deleteComment(req.params.commentId, req.user)
  res.status(204).end()
}

async function EditComment (req, res, next) {
  if (!validationResult(req).isEmpty())
    throw new ValidationError(validationResult(req))

  const editedComment =
    await CommentModel.editComment(req.params.commentId, req.body, req.user)
  res.json({
    comment: editedComment
  })
}

export default {
  CreateComment: asyncWrapper(CreateComment),
  DeleteComment: asyncWrapper(DeleteComment),
  EditComment: asyncWrapper(EditComment)
}
