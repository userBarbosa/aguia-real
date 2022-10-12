import cors from 'cors';
import express, { json, urlencoded } from 'express'
import userRouter from '../../app/users/user.route';
import appointmentRouter from '../../app/appointments/appointment.route';
import tasksRouter from '../../app/tasks/tasks.route'
import { environment } from '../../config/environment';
import logger from '../logger';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../utils/documentation/swagger';
import jsonDoc from '../documentation/swagger-output.json'

export default function startServer() {
  const app = express()
  
  app.use('/api-docs', swaggerUi.serve);
  app.get('/api-docs', swaggerUi.setup(jsonDoc || swaggerDocument));
  app.use(cors())
  app.use(urlencoded({ extended: true }))
  app.use(json())
  
  app.use('/', userRouter)
  app.use('/', appointmentRouter)
  app.use('/', tasksRouter)
  
  app.listen(environment.PORT, () => logger.info(`Running on server via ${environment.PORT} port`));
}