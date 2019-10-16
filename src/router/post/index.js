import { Router } from 'express'
import { check } from 'express-validator'
import controllers from './controllers'
import {
  needAuthorization,
  checkValidation
} from '@/resources/middlewares'

const router = Router()

router.get('/brief', (req, res, next) => {})

router.get('/start/:startPage/end/:endPage', (req, res, next) => {})

router.post('/', [
  check('title').isString().not().isEmpty(),
  check('content').isString().not().isEmpty()
], checkValidation, needAuthorization, controllers.CreatePost)

router.delete('/:postId', needAuthorization, controllers.DeletePost)

router.put('/:postId', (req, res, next) => {})

router.get('/:postId/comments', (req, res, next) => {})

router.get('/:postId', (req, res, next) => {})

export default router
