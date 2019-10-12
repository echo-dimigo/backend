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
