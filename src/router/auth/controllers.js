import { UserModel } from '@/models'
import { getUserIdentity } from '@/resources/dimiapi'
import asyncWrapper from '@/resources/async-wrapper'
import { generateAccessToken, generateRefreshToken, isRefreshToken } from '@/resources/token'
import { EchoError } from '@/resources/error'

async function Join (req, res, next) {
  let identity
  try {
    const { username, password } = req.body
    identity = await getUserIdentity(username, password)
  } catch (error) {
    throw new EchoError(401, 'Unauthorized From DIMIAPI')
  }

  const savedIdentity = await UserModel.createUser(identity)
  res.json({
    identity: savedIdentity
  })
}

async function Login (req, res, next) {
  let identity
  try {
    const { username, password } = req.body

    identity = await getUserIdentity(username, password)
    identity = await UserModel.findByIdx(identity.id)

    if (!identity) throw new EchoError(401)
  } catch (error) {
    throw new EchoError(401)
  }

  const accessToken = generateAccessToken(identity)
  const refreshToken = generateRefreshToken(identity)

  res.json({
    accessToken,
    refreshToken
  })
}

async function Refresh (req, res, next) {
  if (!isRefreshToken(req.token)) throw new EchoError(401, 'Refresh Token Required')
  const identity = await UserModel.findById(req.user._id)

  const accessToken = generateAccessToken(identity)
  const refreshToken = generateRefreshToken(identity)

  res.json({
    accessToken,
    refreshToken
  })
}

export default {
  Join: asyncWrapper(Join),
  Login: asyncWrapper(Login),
  Refresh: asyncWrapper(Refresh)
}
