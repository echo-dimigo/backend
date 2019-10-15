import checkAdmin from '@/resources/checkAdmin'
import { SubscriptionModel } from '@/models'

function checkPrivilege (user) {
  return checkAdmin(user) ||
    this.owner.equals(user._id)
}

function checkSubPermission (user) { // 구독 가능 여부
  return this.checkPrivilege(user) ||
    this.joinOption === 'O'
}

async function deleteSubscriptions () {
  const deletedTags = await SubscriptionModel.remove({ tag: this._id })
  return deletedTags
}

export default {
  checkPrivilege,
  checkSubPermission,
  deleteSubscriptions
}
