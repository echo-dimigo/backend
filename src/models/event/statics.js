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

async function deleteEvent (eventId, user) {
  const event = await EventModel.findById(eventId)
  if (!event) throw new EchoError(404, 'Event Not Found')
  if (!event.checkPrivilege(user)) throw new EchoError(403)

  await event.remove()
}

export default {
  createEvent,
  deleteEvent
}
