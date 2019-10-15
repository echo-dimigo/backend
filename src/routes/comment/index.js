import { Router } from 'express'
import { needAuthorization } from '@/resources/middlewares'
import { check } from 'express-validator'
import isObjectId from '@/resources/isObjectId'
import controllers from './controllers'

const router = Router()

router.get('/:userId', (req, res, next) => {})

router.post('/', [
  check('content').isString().not().isEmpty(),
  check('target').custom(isObjectId)
], needAuthorization, controllers.CreateComment)

router.delete('/:commentId', [
  check('commentId').custom(isObjectId)
], needAuthorization, controllers.DeleteComment)

router.put('/:commentId', [
  check('commentId').custom(isObjectId),
  check('content').isString().not().isEmpty()
], needAuthorization, controllers.EditComment)

export default router
