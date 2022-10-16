import { Router } from 'express'
import { validateTokenMiddleware } from '../../utils/token'
import { getPatientByIdRoute } from './patient.controller'

const patientRouter = Router()
const basePath = '/patient'

patientRouter.get(`${basePath}/:id`, validateTokenMiddleware, getPatientByIdRoute)

export default patientRouter