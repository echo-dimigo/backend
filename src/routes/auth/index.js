import { Router } from 'express'
import { check } from 'express-validator'
import controllers from './controllers'

const router = Router()

router.post('/join', [
  check('username').isString().not().isEmpty(),
  check('password').isString().not().isEmpty()
], controllers.Join)

router.post('/login', [
  check('username').isString().not().isEmpty(),
  check('password').isString().not().isEmpty()
], controllers.Login)

router.post('/refresh', controllers.Refresh)

export default router
