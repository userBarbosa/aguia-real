import { Router } from 'express'
import { validateTokenMiddleware } from '../../utils/token'
import { healthCheck } from './tasks.controller'

const tasksRouter = Router()
const basePath = '/tasks'

tasksRouter.get(`${basePath}/health-check`, healthCheck)
tasksRouter.get(`${basePath}/health-check/auth`, validateTokenMiddleware, healthCheck)

export default tasksRouter