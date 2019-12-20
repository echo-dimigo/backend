import { EventModel } from '@/models'
import { EchoError } from '@/resources/error'
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

async function EditEvent (req, res, next) {
  const editedEvent =
    await EventModel.editEvent(req.params.eventId, req.body, req.user)
  res.json({
    event: editedEvent
  })
}

async function GetEventById (req, res, next) {
  const event = await EventModel.findById(req.params.eventId)
  if (!event) throw new EchoError(404)

  return event
}

export default {
  CreateEvent: asyncWrapper(CreateEvent),
  DeleteEvent: asyncWrapper(DeleteEvent),
  EditEvent: asyncWrapper(EditEvent),
  GetEventById: asyncWrapper(GetEventById)
}
