import jwt from 'jsonwebtoken'
import { EchoError } from '@/resources/error'
import dotenv from 'dotenv'

dotenv.config('.env')
const jwtSecret = process.env.JWT_SECRET

export const generateAccessToken = identity => {
  try {
    const accessToken = jwt.sign({
      _id: identity._id,
      id: identity.id,
      username: identity.username,
      name: identity.name,
      type: identity.type
    }, jwtSecret, { expiresIn: '1w' })
    return accessToken
  } catch (error) {
    throw new EchoError(500)
  }
}

export const generateRefreshToken = identity => {
  try {
    const refreshToken = jwt.sign({
      _id: identity._id,
      username: identity.username,
      refresh: true
    }, jwtSecret, { expiresIn: '1m' })
    return refreshToken
  } catch (error) {
    throw new EchoError(500)
  }
}

export const verifyToken = token => {
  if (!token) throw new EchoError(401, 'Authorization Header Error')

  try {
    jwt.verify(token, jwtSecret)
  } catch (error) {
    throw new EchoError(401)
  }
}

export const decodeToken = token => {
  try {
    const decoded = jwt.decode(token)
    return decoded
  } catch (error) {
    throw new EchoError(401)
  }
}
