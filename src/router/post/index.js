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

/**
 * 새로운 게시물을 생성합니다
 * @route POST /post
 * @group Post - 게시물 관련 메소드
 * @returns {object} 200 - 생성한 게시물을 반환합니다.
 */
router.post('/', [
  check('title').isString().not().isEmpty(),
  check('content').isString().not().isEmpty()
], checkValidation, needAuthorization, controllers.CreatePost)

/**
 * 게시물을 삭제합니다.
 * @route DELETE /post/:postId
 * @group Post - 게시물 관련 메소드
 * @returns {object} 204 - 게시물이 정상적으로 삭제되었습니다.
 * @returns {Error} 403 - 권한이 없습니다.
 * @returns {Error}  404 - 댓글이 존재하지 않습니다.
 */
router.delete('/:postId', needAuthorization, controllers.DeletePost)

router.put('/:postId', (req, res, next) => {})

router.get('/:postId/comments', (req, res, next) => {})

router.get('/:postId', (req, res, next) => {})

export default router
