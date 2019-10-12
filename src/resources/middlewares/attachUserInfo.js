import { decodeToken } from '@/resources/token'

export default async (req, res, next) => {
  const token = req.headers.authorization

  if (token) {
    const identity = await decodeToken(token)
    req.user = identity
  }

  next()
}
