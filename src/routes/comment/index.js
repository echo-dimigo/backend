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

router.delete('/:commentId',
  needAuthorization, controllers.DeleteComment)

router.put('/:commentId', (req, res, next) => {})

export default router
