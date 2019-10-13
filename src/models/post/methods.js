import checkAdmin from '@/resources/checkAdmin'

function checkPrivilege (user) {
  return checkAdmin(user) ||
    this.writer.equals(user._id)
}

export default {
  checkPrivilege
}
