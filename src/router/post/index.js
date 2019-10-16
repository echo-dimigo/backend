import { Router } from 'express'
import { check } from 'express-validator'
import { needAuthorization } from '@/resources/middlewares'
import controllers from './controllers'

const router = Router()

router.get('/brief', (req, res, next) => {})

router.get('/start/:startPage/end/:endPage', (req, res, next) => {})

router.post('/', [
  check('title').isString().not().isEmpty(),
  check('content').isString().not().isEmpty()
], needAuthorization, controllers.CreatePost)

router.delete('/:postId', needAuthorization, controllers.DeletePost)

router.put('/:postId', (req, res, next) => {})

router.get('/:postId/comments', (req, res, next) => {})

router.get('/:postId', (req, res, next) => {})

export default router
