import { Router } from 'express'
import { check } from 'express-validator'
import controllers from './controllers'
import isDate from '@/resources/isDate'
import isObjectId from '@/resources/isObjectId'
import {
  needAuthorization,
  checkValidation
} from '@/resources/middlewares'

const router = Router()

router.post('/', [
  check('name').isString().not().isEmpty(),
  check('description').isString().not().isEmpty(),
  check('startTime').custom(isDate),
  check('endTime').custom(isDate)
], checkValidation, needAuthorization, controllers.CreateEvent)

router.delete('/:eventId', [
  check('eventId').custom(isObjectId)
], checkValidation, needAuthorization, controllers.DeleteEvent)

router.put('/:eventId', needAuthorization, (req, res, next) => {})

router.get('/:eventId', needAuthorization, (req, res, next) => {})

router.post('/:eventId/attend', needAuthorization, (req, res, next) => {})

router.delete('/:eventId/attend', needAuthorization, (req, res, next) => {})

export default router
