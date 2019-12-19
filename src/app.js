import express from 'express'

import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import helmet from 'helmet'

import bearerToken from 'express-bearer-token'
import { attachUserInfo } from '@/resources/middlewares'

import swaggerGen from 'express-swagger-generator'
import swaggerOpt from '../swagger.json'

import router from '@/router'

dotenv.config('.env')
const app = express()

mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(helmet())

app.use(cors())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.set('jwtSecret', process.env.JWT_SECRET)

app.use(bearerToken({
  bodyKey: 'Authorization',
  queryKey: 'Authorization',
  headerKey: 'Bearer',
  reqKey: 'token'
}))
app.use(attachUserInfo)

app.use('/', router)

swaggerGen(app)({
  ...swaggerOpt,
  basedir: __dirname
})

app.use((error, req, res, next) => {
  if (error.name === 'ValidationError') {
    res.status(error.code)
      .json({
        properties: error.properties
      })
  } else if (error.name === 'EchoError') {
    res.status(error.code)
      .json({
        message: error.message
      })
  } else {
    res.status(500)
      .json({
        message: error.message
      })
  }
})

export default app
