import { SubscriptionModel, TagModel } from '@/models'
import { EchoError } from '@/resources/error'

async function getSubscriptionsByUser (user) {
  const subscriptions = await SubscriptionModel.find({
    user: user._id
  })
  return subscriptions
}

async function isUserSubscribed (tagId, user) {
  const subscription =
    await SubscriptionModel.findOne({
      tag: tagId,
      user: user._id
    })
  return Boolean(subscription)
}

async function getSubscription (tagId, user) {
  if (!await SubscriptionModel.isUserSubscribed(tagId, user)) {
    throw new EchoError(404, 'No Such Subscription')
  }

  const subscription = await SubscriptionModel.findOne({
    tag: tagId,
    user: user._id
  })
  return subscription
}

async function createSubscription (tagId, user) {
  const tag = await TagModel.findById(tagId)
  if (!tag) throw new EchoError(403)
  if (!tag.checkSubPermission(user)) throw new EchoError(403)

  if (await SubscriptionModel.isUserSubscribed(tagId, user)) {
    throw new EchoError(409, 'Already Subscribed')
  }

  const newSubscription = new SubscriptionModel({
    tag: tagId,
    user
  })
  const savedSubscription = await newSubscription.save()
  return savedSubscription
}

async function cancelSubscription (tagId, user) {
  if (!await SubscriptionModel.isUserSubscribed(tagId, user)) {
    throw new EchoError(404, 'No Such Subscription')
  }
  const subscription =
    await SubscriptionModel.getSubscription(tagId, user)
  if (!subscription) throw new EchoError(404, 'Subscription Not Found')
  if (!subscription.checkPrivilege(user)) throw new EchoError(403)

  await subscription.remove()
}

export default {
  getSubscriptionsByUser,
  createSubscription,
  cancelSubscription,
  isUserSubscribed,
  getSubscription
}
