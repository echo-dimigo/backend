import { Router } from 'express'
import { check } from 'express-validator'
import isObjectId from '@/resources/isObjectId'
import controllers from './controllers'
import {
  needAuthorization,
  checkValidation
} from '@/resources/middlewares'

const router = Router()

router.get('/writer/:userId', [
  check('userId').custom(isObjectId)
], checkValidation, needAuthorization, controllers.GetCommentsByUser)

router.post('/', [
  check('content').isString().not().isEmpty(),
  check('target').custom(isObjectId)
], checkValidation, needAuthorization, controllers.CreateComment)

router.delete('/:commentId', [
  check('commentId').custom(isObjectId)
], checkValidation, needAuthorization, controllers.DeleteComment)

router.put('/:commentId', [
  check('commentId').custom(isObjectId),
  check('content').isString().not().isEmpty()
], checkValidation, needAuthorization, controllers.EditComment)

export default router
