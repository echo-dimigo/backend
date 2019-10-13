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

async function cancelSubscription (subscriptionId, user) {
  const subscription = await SubscriptionModel.findById(subscriptionId)
  if (!subscription) throw new EchoError(403)
  if (!subscription.checkPrivilege(user)) throw new EchoError(403)

  await subscription.remove()
}

export default {
  getSubscriptionsByUser,
  createSubscription,
  cancelSubscription
}
