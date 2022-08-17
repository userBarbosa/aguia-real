import logger from '../../utils/logger';
import { createHash, validateHash } from '../../utils/crypt';
import { getAppointmentByIdRoute, getAppointmentByUserRoute } from './appointment.repository';
import { Appointment, AppointmentDTO, AppointmentState, Payment } from './appointment.types';
import { createToken } from '../../utils/token';
import { TokenUserPayload } from '../../utils/token/types';

export async function getAppointmentById(id: string): Promise<Appointment | null> {
    return null;
}