import { Router } from 'express'

import authRouter from './auth'
import commentRouter from './comment'
import postRouter from './post'
import tagRouter from './tag'
import subscriptionRouter from './subscription'
import eventRouter from './event'
import scheduleRouter from './schedule'

const router = Router()

router.use('/auth', authRouter)
router.use('/comment', commentRouter)
router.use('/post', postRouter)
router.use('/tag', tagRouter)
router.use('/subscription', subscriptionRouter)
router.use('/event', eventRouter)
router.use('/schedule', scheduleRouter)

export default router
