import { SubscriptionModel } from '@/models'
import asyncWrapper from '@/resources/async-wrapper'

async function CreateSubscription (req, res, next) {
  const newSubscription =
    await SubscriptionModel.createSubscription(req.params.tagId, req.user)
  res.json({
    subscription: newSubscription
  })
}

async function CancelSubscription (req, res, next) {
  await SubscriptionModel.cancelSubscription(
    req.params.subscriptionId, req.user
  )
  res.status(204).end()
}

export default {
  CreateSubscription: asyncWrapper(CreateSubscription),
  CancelSubscription: asyncWrapper(CancelSubscription)
}
