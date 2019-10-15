import { decodeToken } from '@/resources/token'

export default async (req, res, next) => {
  const token = req.token

  if (token) {
    const identity = await decodeToken(token)
    req.user = identity
  }

  next()
}
