import { insertOne, removeOne, select, selectAll, selectById, updateOne } from '../../services/database'
import { Appointment, AppointmentDTO } from "./appointment.types"
import logger from '../../utils/logger'

const DATASOURCE = "appointments"

export async function list(): Promise<AppointmentDTO[]> {
  try {
    const response = await selectAll<AppointmentDTO>(DATASOURCE, {})

    return response
  } catch (error) {
    logger.error('Error getting all appointments', error)
  }
  return []
}

export async function read(data: { id: string }): Promise<AppointmentDTO | null> {
  try {
    const response = await selectById<AppointmentDTO>(DATASOURCE, data.id)

    return response
  } catch (error) {
    logger.error('Error getting appointment by id', error)
  }
  return null
}

export async function getAppointmentByIdRoute(req: Request, res: Response) { }

export async function getAppointmentByUserRoute(req: Request, res: Response) { }