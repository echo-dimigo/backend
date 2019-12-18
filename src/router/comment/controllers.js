import { CommentModel } from '@/models'
import asyncWrapper from '@/resources/async-wrapper'

async function CreateComment (req, res, next) {
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
  const editedComment =
    await CommentModel.editComment(req.params.commentId, req.body, req.user)
  res.json({
    comment: editedComment
  })
}

async function GetCommentsByUser (req, res, next) {
  const comments = await CommentModel.getCommentsByUser(req.user)
  res.json({
    comments
  })
}

export default {
  CreateComment: asyncWrapper(CreateComment),
  DeleteComment: asyncWrapper(DeleteComment),
  EditComment: asyncWrapper(EditComment),
  GetCommentsByUser: asyncWrapper(GetCommentsByUser)
}
