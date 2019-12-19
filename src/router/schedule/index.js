import { Router } from 'express'
import { needAuthorization } from '@/resources/middlewares'

const router = Router()

router.get('/monthly/:yyyymm', needAuthorization, (req, res, next) => {})

router.get('/daily/:yyyymmdd', needAuthorization, (req, res, next) => {})

router.get('/daily/today', needAuthorization, (req, res, next) => {})

export default router
