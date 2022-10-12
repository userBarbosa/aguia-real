import logger from '../../utils/logger';
import { createHash, validateHash } from '../../utils/crypt';
import { read } from './appointment.repository';
import { Appointment, AppointmentDTO, AppointmentState, Payment } from './appointment.types';
import { createToken } from '../../utils/token';
import { TokenUserPayload } from '../../utils/token/types';

export async function getAppointmentById(query: { id: string }): Promise<Appointment | null> {
  const appointment = await read({ id: query.id });

  if (appointment) {
    return makeAppointmentResponse(appointment);
  }
  return null;
}
export async function getAllAppointments(query: { id: string, limit: number }): Promise<Appointment[] | null> {
  return null;
}
export async function getNextAppointment(query: { field: string, id: string }): Promise<Appointment | null> {
  return null;
}
export async function getAppointmentsByField(query: { field: string, data: string }): Promise<Appointment[] | null> {
  return null;
}
export async function getAppointmentsBySingleId(query: { field: string, data: string }): Promise<Appointment[] | null> {
  return null;
}
export async function getAppointmentsInDateRange(query: { field: string, lt: Date, gte: Date }): Promise<Appointment[] | null> {
  return null;
}
export async function createAppointment(data: {
  id: string,
  patiendId: string,
  ownerId: string,
  employeeId: string,
  observation: string,
  appointmentState: AppointmentState,
  payment: Payment,
  value: number
}): Promise<string | null> {
  return null;
}
export async function updateAppointmentState(data: { id: string, appointmentState: AppointmentState }): Promise<string | null> {
  return null;
}
export async function updateAppointmentObservation(data: { id: string, observation: string }): Promise<string | null> {
  return null;
}
export async function deleteAppointment(data: { id: string }): Promise<string | null> {
  return null;
}
export async function isReserved(query: { field: string, id: string, gte: Date }): Promise<boolean> {
  // findScheduleAppointment
  // Date dateLt = new Date(dateGte.getTime() + (30 * 60 * 1000));
  return false;
}

function makeAppointmentResponse(appointment: AppointmentDTO): Appointment {
  return {
    id: appointment.id,
    patiendId: appointment.patiendId,
    ownerId: appointment.ownerId,
    employeeId: appointment.employeeId,
    appointmentState: appointment.appointmentState
  }
}