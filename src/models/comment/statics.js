import { PostModel, CommentModel } from '@/models'
import { EchoError } from '@/resources/error'

async function createComment (comment, user) {
  const post = await PostModel.findById(comment.target)
  if (!post) throw new EchoError(404, 'Post Not Found')

  const { content, target } = comment
  const newComment = new CommentModel({
    content,
    target,
    writer: user._id
  })

  const savedComment = await newComment.save()
  return savedComment
}

async function deleteComment (commentId, user) {
  const comment = await CommentModel.findById(commentId)
  if (!comment) throw new EchoError(404, 'Comment Not Found')
  if (!comment.checkPrivilege(user)) throw new EchoError(403)

  if (comment.writer.equals(user._id)) {
    comment.status = 'D'
  } else {
    comment.status = 'H'
  }

  await comment.save()
}

async function editComment (commentId, newComment, user) {
  const origComment = await CommentModel.findById(commentId)
  if (!origComment) throw new EchoError(404, 'Comment Not Found')
  if (!origComment.checkPrivilege(user)) throw new EchoError(403)

  origComment.status = 'E'
  origComment.content = newComment.content

  const savedComment = await origComment.save()
  return savedComment
}

export default {
  createComment,
  deleteComment,
  editComment
}
