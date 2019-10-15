import checkAdmin from '@/resources/checkAdmin'

function checkPrivilege (user) {
  return checkAdmin(user) ||
    this.owner.equals(user._id)
}

function checkSubPermission (user) { // 구독 가능 여부
  return this.checkPrivilege(user) ||
    this.joinOption === 'O'
}

export default {
  checkPrivilege,
  checkSubPermission
}
