import jwt from 'jsonwebtoken'
import CreateError from 'http-errors'
import dotenv from 'dotenv'

dotenv.config('.env')
const jwtSecret = process.env.JWT_SECRET

export const generateAccessToken = identity => {
  try {
    const accessToken = jwt.sign({
      id: identity.id,
      username: identity.username,
      name: identity.name,
      type: identity.type
    }, jwtSecret, { expiresIn: '1w' })
    return accessToken
  } catch (error) {
    throw new CreateError(500)
  }
}

export const generateRefreshToken = identity => {
  try {
    const refreshToken = jwt.sign({
      username: identity.username
    }, jwtSecret, { expiresIn: '1m' })
    return refreshToken
  } catch (error) {
    throw new CreateError(500)
  }
}

export const verifyToken = token => {
  try {
    jwt.verify(token, jwtSecret)
  } catch (error) {
    throw new CreateError(401)
  }
}

export const decodeToken = token => {
  try {
    const decoded = jwt.decode(token)
    return decoded
  } catch (error) {
    throw new CreateError(401)
  }
}
