import { Router } from 'express'
import { validateTokenMiddleware } from '../../utils/token'
import {
  getAppointmentByIdRoute,
  getAllAppointmentsRoute,
  getAppointmentsByFieldRoute,
  getAppointmentsBySingleIdRoute,
  getAppointmentsInDateRangeRoute,
  createAppointmentRoute,
  updateAppointmentStateRoute,
  updateAppointmentObservationRoute,
  deleteAppointmentRoute
} from './appointment.controller'

const appointmentRouter = Router()
const basePath = '/appointments'

appointmentRouter.get(`${basePath}/:id`, validateTokenMiddleware, getAppointmentByIdRoute)
appointmentRouter.get(`${basePath}/all`, validateTokenMiddleware, getAllAppointmentsRoute)
appointmentRouter.get(`${basePath}/field`, validateTokenMiddleware, getAppointmentsByFieldRoute)
appointmentRouter.get(`${basePath}/singleid`, validateTokenMiddleware, getAppointmentsBySingleIdRoute)
appointmentRouter.get(`${basePath}/daterange`, validateTokenMiddleware, getAppointmentsInDateRangeRoute)

appointmentRouter.post(`${basePath}/`, validateTokenMiddleware, createAppointmentRoute)

appointmentRouter.patch(`${basePath}/:id/state`, validateTokenMiddleware, updateAppointmentStateRoute)
appointmentRouter.patch(`${basePath}/:id/observation`, validateTokenMiddleware, updateAppointmentObservationRoute)

appointmentRouter.delete(`${basePath}/:id`, validateTokenMiddleware, deleteAppointmentRoute)

export default appointmentRouter