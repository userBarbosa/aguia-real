import { Router } from 'express'
import { validateTokenMiddleware } from '../../utils/token'
import { healthCheck } from './tasks.controller'

const tasksRouter = Router()
const basePath = '/tasks'



tasksRouter.get(`${basePath}/healthcheck`, healthCheck)


export default tasksRouter