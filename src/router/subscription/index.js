import { Router } from 'express'
import { check } from 'express-validator'
import controllers from './controllers'
import isObjectId from '@/resources/isObjectId'
import {
  needAuthorization,
  checkValidation
} from '@/resources/middlewares'

const router = Router()

/**
 * 태그를 구독합니다
 * @route POST /subscription/:tagId
 * @group Subscription - 구독 관련 메소드
 * @returns {object} - 생성한 구독 모델을 반환합니다.
 * @returns {Error} 403 - 권한이 없습니다.
 * @returns {Error} 404 - 태그가 존재하지 않습니다.
 * @returns {Error} 409 - 이미 구독한 태그입니다.
 */
router.post('/:tagId', [
  check('tagId').custom(isObjectId)
], checkValidation, needAuthorization, controllers.CreateSubscription)

/**
 * 태그의 구독을 취소합니다
 * @route DELETE /subscription/:tagId
 * @group Subscription - 구독 관련 메소드
 * @returns {object} 204 - 구독이 정상적으로 취소되었습니다.
 * @returns {Error} 404 - 구독하지 않은 태그입니다.
 */
router.delete('/:subscriptionId', [
  check('subscriptionId').custom(isObjectId)
], checkValidation, needAuthorization, controllers.CancelSubscription)

export default router
