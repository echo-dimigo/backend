import { validationResult } from 'express-validator'
import { SubscriptionModel } from '@/models'
import asyncWrapper from '@/resources/async-wrapper'
import { ValidationError } from '@/resources/error'

async function CreateSubscription (req, res, next) {
  if (!validationResult(req).isEmpty()) {
    throw new ValidationError(validationResult(req))
  }
  const newSubscription =
    await SubscriptionModel.createSubscription(req.params.tagId, req.user)
  res.json({
    subscription: newSubscription
  })
}

async function CancelSubscription (req, res, next) {
  if (!validationResult(req).isEmpty()) {
    throw new ValidationError(validationResult(req))
  }
  await SubscriptionModel.cancelSubscription(
    req.params.subscriptionId, req.user
  )
  res.status(204).end()
}

export default {
  CreateSubscription: asyncWrapper(CreateSubscription),
  CancelSubscription: asyncWrapper(CancelSubscription)
}
