import { Router } from 'express'
import { check } from 'express-validator'
import controllers from './controllers'
import {
  needAuthorization,
  checkValidation
} from '@/resources/middlewares'

const router = Router()

/**
 * 자신이 볼 수 있는 태그를 모두 반환합니다.
 * @route GET /tag
 * @group Tag - 태그 관련 메소드
 * @returns {object} - 모든 태그를 반환합니다.
 */
router.get('/', needAuthorization, controllers.GetAllTags)

/**
 * 새로운 태그를 생성합니다.
 * @route POST /tag
 * @group Tag - 태그 관련 메소드
 * @returns {object} - 새로운 태그를 반환합니다.
 */
router.post('/', [
  check('name').isString().not().isEmpty(),
  check('description').isString().not().isEmpty(),
  check('joinOption').isIn(['P', 'R', 'O'])
], checkValidation, needAuthorization, controllers.CreateTag)

/**
 * 태그를 삭제합니다.
 * @route POST /tag
 * @group Tag - 태그 관련 메소드
 * @returns {object} 204 - 태그를 정상적으로 삭제했습니다.
 * @returns {Error} 403 - 권한이 없습니다.
 * @returns {Error} 404 - 존재하지 않는 태그입니다.
 */
router.delete('/:tagId', needAuthorization, controllers.DeleteTag)

router.put('/:tagId', (req, res, next) => {})

router.get('/:tagId/subscribers', (req, res, next) => {})

export default router
