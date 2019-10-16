import { Router } from 'express'
import { check } from 'express-validator'
import { checkValidation } from '@/resources/middlewares'
import controllers from './controllers'

const router = Router()

/**
 * 디미고 계정 정보를 받아 에코를 가입합니다.
 * @route POST /auth/join
 * @group Auth - 인증 관련 메소드
 * @param {string} username.query.required - 사용자 이름
 * @param {string} password.query.required - 사용자 비밀번호
 * @returns {object} 200 - 사용자 정보
 * @returns {Error}  401 - 일치하는 계정이 디미고 API에 존재하지 않습니다.
 */
router.post('/join', [
  check('username').isString().not().isEmpty(),
  check('password').isString().not().isEmpty()
], checkValidation, controllers.Join)

/**
 * 디미고 계정 정보를 받아 에코에서의 토큰을 발행합니다.
 * @route POST /auth/login
 * @group Auth - 인증 관련 메소드
 * @param {string} username.query.required - 사용자 이름
 * @param {string} password.query.required - 사용자 비밀번호
 * @returns {object} 200 - Access 토큰과 Refresh 토큰을 반환합니다.
 * @returns {Error}  401 - 일치하는 에코 계정 정보가 존재하지 않습니다.
 */
router.post('/login', [
  check('username').isString().not().isEmpty(),
  check('password').isString().not().isEmpty()
], checkValidation, controllers.Login)

/**
 * Refresh 토큰으로 새로운 Access 토큰과 Refresh 토큰을 발행합니다.
 * @route POST /auth/refresh
 * @group Auth - 인증 관련 메소드
 * @returns {object} 200 - Access 토큰과 Refresh 토큰을 반환합니다.
 * @returns {Error}  401 - 토큰이 Refresh 용이 아니거나 인증에 실패했습니다.
 * @security JWT - Refresh 토큰이 Bearer로 Authorization 헤더에 존재해야 합니다.
 */
router.post('/refresh', controllers.Refresh)

export default router
