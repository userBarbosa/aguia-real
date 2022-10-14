import { Router } from 'express'
import { validateTokenMiddleware } from '../../utils/token'
import { healthCheck } from './utility.controller'

const utilitiesRouter = Router()
const basePath = '/utilities'

utilitiesRouter.get(`${basePath}/health-check`, healthCheck)
utilitiesRouter.get(`${basePath}/health-check/auth`, validateTokenMiddleware, healthCheck)

export default utilitiesRouter