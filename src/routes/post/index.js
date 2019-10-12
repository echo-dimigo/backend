import { Router } from 'express'

const router = Router()

router.get('/brief', (req, res, next) => {})

router.get('/start/:startPage/end/:endPage', (req, res, next) => {})

router.post('/', (req, res, next) => {})

router.delete('/:postId', (req, res, next) => {})

router.put('/:postId', (req, res, next) => {})

router.get('/:postId/comments', (req, res, next) => {})

router.get('/:postId', (req, res, next) => {})

export default router
