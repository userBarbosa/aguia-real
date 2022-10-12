import { Router } from 'express'
import { validateTokenMiddleware } from '../../utils/token'
import { getTutorByIdRoute } from './tutor.controller'

const tutorRouter = Router()
const basePath = '/tutor'

tutorRouter.get(`${basePath}/:id`, validateTokenMiddleware, getTutorByIdRoute)

export default tutorRouter