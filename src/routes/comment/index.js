import { Router } from 'express'

const router = Router()

router.get('/', async (req, res, next) => {})

router.get('/:userId', (req, res, next) => {})

router.post('/', (req, res, next) => {})

router.delete('/:commentId', (req, res, next) => {})

router.put('/:commentId', (req, res, next) => {})

export default router
