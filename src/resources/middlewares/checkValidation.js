import { validationResult } from 'express-validator'
import { ValidationError } from '@/resources/error'

export default (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    throw new ValidationError(validationResult(req))
  }
  next()
}
