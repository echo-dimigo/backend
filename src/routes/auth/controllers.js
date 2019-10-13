import { validationResult } from 'express-validator'
import { UserModel } from '@/models'
import { getUserIdentity } from '@/resources/dimiapi'
import asyncWrapper from '@/resources/async-wrapper'
import { generateAccessToken, generateRefreshToken } from '@/resources/token'
import CreateError from 'http-errors'

async function Join (req, res, next) {
  if (!validationResult(req).isEmpty()) throw validationResult(req)

  let identity
  try {
    const { username, password } = req.body
    identity = await getUserIdentity(username, password)
  } catch (error) {
    throw new CreateError(401)
  }

  await UserModel.createUser(identity)
  res.json({
    identity
  })
}

async function Login (req, res, next) {
  if (!validationResult(req).isEmpty()) throw validationResult(req)

  let identity
  try {
    const { username, password } = req.body

    identity = await getUserIdentity(username, password)
    identity = await UserModel.findByIdx(identity.id)

    if (!identity) throw new CreateError(401)
  } catch (error) {
    throw new CreateError(401)
  }

  const accessToken = generateAccessToken(identity)
  const refreshToken = generateRefreshToken(identity)

  res.json({
    accessToken,
    refreshToken
  })
}

async function Refresh (req, res, next) {
  if (!validationResult(req).isEmpty()) throw validationResult(req)
  throw new CreateError(423)
}

export default {
  Join: asyncWrapper(Join),
  Login: asyncWrapper(Login),
  Refresh: asyncWrapper(Refresh)
}
