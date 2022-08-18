import cors from 'cors';
import express, { json, urlencoded } from "express"
import userRouter from '../../app/users/user.route';
import appointmentRouter from '../../app/appointments/appointment.route';
import tasksRouter from '../tasks/tasks.route'
import { environment } from '../../config/environment';
import logger from '../logger';

export function startServer() {
  const app = express()
  
  app.use(cors())
  app.use(urlencoded())
  app.use(json())
  
  app.use('/', userRouter)
  app.use('/', appointmentRouter)
  app.use('/', tasksRouter)
  
  app.listen(environment.PORT, () => logger.info(`Running on server via ${environment.PORT} port`));
}