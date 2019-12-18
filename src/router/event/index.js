import { Router } from 'express'
import { needAuthorization } from '@/resources/middlewares'

const router = Router()

router.post('/', needAuthorization, (req, res, next) => {})

router.delete('/:eventId', needAuthorization, (req, res, next) => {})

router.put('/:eventId', needAuthorization, (req, res, next) => {})

router.get('/:eventId', needAuthorization, (req, res, next) => {})

router.post('/:eventId/attend', needAuthorization, (req, res, next) => {})

router.delete('/:eventId/attend', needAuthorization, (req, res, next) => {})
