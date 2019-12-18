import { EventModel } from '@/models'
import asyncWrapper from '@/resources/async-wrapper'

async function CreateEvent (req, res, next) {
  const event = await EventModel.createEvent(req.body, req.user)
  res.json({
    event
  })
}

async function DeleteEvent (req, res, next) {
  await EventModel.deleteEvent(req.params.eventId, req.user)
  res.status(204).end()
}

export default {
  CreateEvent: asyncWrapper(CreateEvent),
  DeleteEvent: asyncWrapper(DeleteEvent)
}
