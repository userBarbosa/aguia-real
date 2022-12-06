import { Router } from 'express'
import { validateTokenMiddleware } from '../../utils/token'
import { healthCheck } from './utility.controller'

const utilitiesRouter = Router()
const basePath = '/utilities'

utilitiesRouter.get(`${basePath}/healthcheck`, healthCheck)
utilitiesRouter.get(`${basePath}/healthcheck/auth`, validateTokenMiddleware, healthCheck)

export default utilitiesRouter