import { Router } from 'express'
import { validateTokenMiddleware } from '../../utils/token'
import { getAppointmentByIdRoute, getAllAppointmentsRoute, createAppointmentRoute, updateAppointmentRoute, removeAppointmentRoute } from './appointment.controller'

const appointmentRouter = Router()
const basePath = '/appointments'

appointmentRouter.get(`${basePath}/:id`, validateTokenMiddleware, getAppointmentByIdRoute)
appointmentRouter.get(`${basePath}/`, validateTokenMiddleware, getAllAppointmentsRoute)

appointmentRouter.post(`${basePath}/`, validateTokenMiddleware, createAppointmentRoute)

appointmentRouter.patch(`${basePath}/:id`, validateTokenMiddleware, updateAppointmentRoute)

appointmentRouter.delete(`${basePath}/:id`, validateTokenMiddleware, removeAppointmentRoute)

export default appointmentRouter