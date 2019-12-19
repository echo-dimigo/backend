import mongoose from 'mongoose'

export function isDate (value) {
  return !isNaN(Date.parse(value))
}

export function isObjectId (value) {
  return mongoose.Types.ObjectId.isValid(value)
}
