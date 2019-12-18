import { EventModel } from '@/models'

async function createEvent (event, user) {
  const { name, description, startTime, endTime } = event

  const newEvent = new EventModel({
    name,
    description,
    startTime,
    endTime,
    writer: user._id
  })

  const savedEvent = await newEvent.save()
  return savedEvent
}

export default {
  createEvent
}
