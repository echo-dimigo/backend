import { Router } from 'express'
import { check } from 'express-validator'
import controllers from './controllers'
import { needAuthorization } from '@/resources/middlewares'
import isObjectId from '@/resources/isObjectId'

const router = Router()

router.post('/:tagId', [
  check('tagId').custom(isObjectId)
], needAuthorization, controllers.CreateSubscription)

router.delete('/:subscriptionId', [
  check('subscriptionId').custom(isObjectId)
], needAuthorization, controllers.CancelSubscription)

export default router
