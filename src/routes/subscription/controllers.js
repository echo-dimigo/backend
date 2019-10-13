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

export default {
  CreateSubscription: asyncWrapper(CreateSubscription)
}
