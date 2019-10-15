import mongoose, { Schema } from 'mongoose'
import methods from './methods'
import statics from './statics'

const subscriptionModel = new Schema({
  tag: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Tag'
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  }
})

Object.keys(methods).forEach(value => {
  subscriptionModel.method(value, methods[value])
})
Object.keys(statics).forEach(value => {
  subscriptionModel.statics[value] = statics[value]
})

export default mongoose.model('Subscription', subscriptionModel)
