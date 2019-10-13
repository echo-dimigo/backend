import checkAdmin from '@/resources/checkAdmin'

function checkPrivilege (user) {
  return checkAdmin(user) ||
    this.owner.equals(user._id)
}

export default {
  checkPrivilege
}
