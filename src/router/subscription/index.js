import { Router } from 'express'
import { check } from 'express-validator'
import controllers from './controllers'
import { isObjectId } from '@/resources/validators'
import {
  needAuthorization,
  checkValidation
} from '@/resources/middlewares'

const router = Router()

router.post('/:tagId', [
  check('tagId').custom(isObjectId)
], checkValidation, needAuthorization, controllers.CreateSubscription)

router.delete('/:subscriptionId', [
  check('subscriptionId').custom(isObjectId)
], checkValidation, needAuthorization, controllers.CancelSubscription)

export default router
