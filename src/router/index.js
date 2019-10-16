import { Router } from 'express'

import authRouter from './auth'
import commentRouter from './comment'
import postRouter from './post'
import tagRouter from './tag'
import subscriptionRouter from './subscription'

const router = Router()

router.use('/auth', authRouter)
router.use('/comment', commentRouter)
router.use('/post', postRouter)
router.use('/tag', tagRouter)
router.use('/subscription', subscriptionRouter)

export default router
