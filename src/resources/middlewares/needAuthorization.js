import { verifyToken } from '@/resources/token'

export default (req, res, next) => {
  verifyToken(req.headers.authorization)
  next()
}
