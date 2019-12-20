import { EventModel } from '@/models'
import { EchoError } from '@/resources/error'

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

async function editEvent (eventId, newEvent, user) {
  const event = await EventModel.findById(eventId)
  if (!event) throw new EchoError(404, 'Event Not Found')
  if (!event.checkPrivilege(user)) throw new EchoError(403)

  const properties = [
    'name', 'description', 'startTime', 'endTime', 'writer'
  ]
  properties.forEach(prop => {
    if ({}.hasOwnProperty.call(newEvent, prop)) {
      event[prop] = newEvent[prop]
    }
  })

  await event.save()
  return event
}

export default {
  createEvent,
  deleteEvent,
  editEvent
}
