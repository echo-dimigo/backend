import { Router } from 'express'
import { check } from 'express-validator'
import isObjectId from '@/resources/isObjectId'
import controllers from './controllers'
import {
  needAuthorization,
  checkValidation
} from '@/resources/middlewares'

const router = Router()

router.get('/:userId', (req, res, next) => {})

/**
 * 새로운 댓글을 생성합니다
 * @route POST /comment
 * @group Comment - 댓글 관련 메소드
 * @returns {object} 200 - 생성한 댓글을 반환합니다.
 * @returns {Error}  404 - 대상 게시물이 존재하지 않습니다.
 */
router.post('/', [
  check('content').isString().not().isEmpty(),
  check('target').custom(isObjectId)
], checkValidation, needAuthorization, controllers.CreateComment)

/**
 * 댓글을 삭제합니다.
 * @route DELETE /comment/:commentId
 * @group Comment - 댓글 관련 메소드
 * @returns {null} 204 - 댓글이 정상적으로 삭제되었습니다.
 * @returns {Error} 403 - 권한이 없습니다.
 * @returns {Error}  404 - 댓글이 존재하지 않습니다.
 */
router.delete('/:commentId', [
  check('commentId').custom(isObjectId)
], checkValidation, needAuthorization, controllers.DeleteComment)

/**
 * 댓글을 수정합니다.
 * @route PUT /comment/:commentId
 * @group Comment - 댓글 관련 메소드
 * @returns {null} 200 - 수정된 댓글을 반환합니다.
 * @returns {Error} 403 - 권한이 없습니다.
 * @returns {Error}  404 - 댓글이 존재하지 않습니다.
 */
router.put('/:commentId', [
  check('commentId').custom(isObjectId),
  check('content').isString().not().isEmpty()
], checkValidation, needAuthorization, controllers.EditComment)

export default router
