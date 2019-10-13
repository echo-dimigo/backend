import errors from './messages'

export const getMessageFromCode = code => {
  const message = errors[code.toString()]
  return message
}

export const getCodeFromMessage = message => {
  const code = Object.keys(errors).find(v => {
    return errors[v] === message
  })
  return code
}

export class EchoError extends Error {
  constructor (code, message = getMessageFromCode(code)) {
    super(message)
    this.name = 'EchoError'
    this.code = code
    this.message = message
  }
}

export class ValidationError extends Error {
  constructor (error, code = 400) {
    super(error)
    this.name = 'ValidationError'
    this.code = code
    this.properties = error.errors
  }
}
