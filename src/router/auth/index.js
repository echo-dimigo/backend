import { Router } from 'express'
import { check } from 'express-validator'
import { checkValidation } from '@/resources/middlewares'
import controllers from './controllers'

const router = Router()

router.post('/join', [
  check('username').isString().not().isEmpty(),
  check('password').isString().not().isEmpty()
], checkValidation, controllers.Join)

router.post('/login', [
  check('username').isString().not().isEmpty(),
  check('password').isString().not().isEmpty()
], checkValidation, controllers.Login)

router.post('/refresh', controllers.Refresh)

export default router
