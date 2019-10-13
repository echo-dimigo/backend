import { SubscriptionModel, TagModel } from '@/models'
import { EchoError } from '@/resources/error'

async function getSubscriptionsByUser (user) {
  const subscriptions = await SubscriptionModel.find({
    user: user._id
  })
  return subscriptions
}

async function createSubscription (tagId, user) {
  const tag = await TagModel.findById(tagId)
  if (!tag) throw new EchoError(403)
  if (!tag.checkSubPermission(user)) throw new EchoError(403)

  const newSubscription = new SubscriptionModel({
    tag: tagId,
    user
  })
  const savedSubscription = await newSubscription.save()
  return savedSubscription
}

export default {
  getSubscriptionsByUser,
  createSubscription
}
