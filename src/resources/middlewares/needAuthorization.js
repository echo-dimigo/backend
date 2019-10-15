import { verifyToken } from '@/resources/token'

export default (req, res, next) => {
  verifyToken(req.token)
  next()
}
