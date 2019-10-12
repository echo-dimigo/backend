export default user => {
  return user.type === 'A' ||
    user.type === 'T' ||
    user.type === 'D'
}
