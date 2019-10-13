import { PostModel } from '@/models'
import { EchoError } from '@/resources/error'

async function createPost (post, user) {
  const { title, content } = post

  const newPost = new PostModel({
    title,
    content,
    writer: user._id
  })

  const savedPost = await newPost.save()
  return savedPost
}

async function deletePost (postId, user) {
  const post = await PostModel.findById(postId)
  if (!post) throw new EchoError(404, 'Post Not Found')
  if (!post.checkPrivilege(user)) throw new EchoError(403)

  if (post.writer.equals(user._id)) {
    post.status = 'D'
  } else {
    post.status = 'H'
  }

  await post.save()
}

export default {
  createPost,
  deletePost
}
