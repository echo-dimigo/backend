import { Router } from 'express'
import { needAuthorization } from '@/resources/middlewares'
import { check } from 'express-validator'
import mongoose from 'mongoose'
import controllers from './controllers'

const router = Router()

router.get('/:userId', (req, res, next) => {})

router.post('/', [
  check('content').isString().not().isEmpty(),
  check('target').custom(value =>
    mongoose.Types.ObjectId.isValid(value))
], needAuthorization, controllers.CreateComment)

router.delete('/:commentId', [
  check('commentId').custom(value =>
    mongoose.Types.ObjectId.isValid(value))
], needAuthorization, controllers.DeleteComment)

router.put('/:commentId', [
  check('commentId').custom(value =>
    mongoose.Types.ObjectId.isValid(value)),
  check('content').isString().not().isEmpty()
], needAuthorization, controllers.EditComment)

export default router
