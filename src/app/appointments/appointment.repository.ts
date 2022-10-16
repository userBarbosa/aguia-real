import { insertOne, removeOne, select, selectAll, selectById, selectWithLimit, updateOne } from '../../services/database'
import { Appointment, AppointmentDTO } from './appointment.types'
import logger from '../../utils/logger'

const COLLECTION = "appointments"

export async function list(): Promise<AppointmentDTO[]> {
  try {
    const response = await selectAll<AppointmentDTO>(COLLECTION, {})

    return response
  } catch (error) {
    logger.error('Error getting all appointments', error)
  }
  return []
}

export async function listLimit(query: any, limit: number): Promise<AppointmentDTO[]> {
  try {
    const response = await selectWithLimit<AppointmentDTO>(COLLECTION, query, limit)

    return response
  } catch (error) {
    logger.error('Error getting all appointments', error)
  }
  return []
}

export async function read(id: string): Promise<AppointmentDTO | null> {
  try {
    const response = await selectById<AppointmentDTO>(COLLECTION, id)

    return response
  } catch (error) {
    logger.error('Error getting appointment by id', error)
  }
  return null
}

export async function readByForeignId(field: string, id: string): Promise<AppointmentDTO | null> {
  try {
    let data: { [key: string]: string } = {};
    data[field] = id;

    const response = await select<AppointmentDTO>(COLLECTION, data)

    return response
  } catch (error) {
    logger.error('Error getting appointment by id', error)
  }
  return null
}

export async function searchAppointment(patientId: string, employeeId: string, timeDate: Date, appointmentTime?: number): Promise<boolean> {
  try {
    const gteDate = timeDate.toISOString()
    const ltDate = new Date(timeDate.getTime() + (appointmentTime || 30 * 60 * 1000)).toISOString()
    const data = {
      patientId: patientId,
      employeeId: employeeId,
      date: {
        $gte: gteDate,
        $lt: ltDate
      }
    }

    const result = await select<AppointmentDTO>(COLLECTION, data);

    if (result) {
      return true;
    }
  } catch (error) {
    logger.error('error finding reserved appointment', error)
  }
  return false;
}

export async function store(data: {id: string, patiendId: string, ownerId: string, employeeId: string}): Promise<string | null> {
  return null;
}

// interface simpleObject {
//   [key: string]: string
// }