function checkPrivilege (user) {
  return this.user.equals(user._id)
}

export default {
  checkPrivilege
}
