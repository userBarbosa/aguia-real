import { list, read, listLimit, readByForeignId, searchAppointment, store } from './appointment.repository';
import { Appointment, AppointmentDTO, AppointmentState, Payment } from './appointment.types';

export async function getAppointmentById(id: string): Promise<Appointment | null> {
  const appointment = await read(id);

  if (appointment) {
    return makeAppointmentResponse(appointment);
  }
  return null;
}

export async function getAllAppointments(query: {}, limit: number): Promise<Appointment[]> {
  const appointments = await listLimit(query, limit);
  return makeAppointmentListResponse(appointments);
}

export async function getNextAppointment(field: string, id: string): Promise<Appointment | null> {
  const appointment = await readByForeignId(field, id);

  if (appointment) {
    return makeAppointmentResponse(appointment);
  }
  return null;
}

export async function getAppointmentsByField(field: string, data: string): Promise<Appointment[] | null> {
  const query = {}
  const appointments = await listLimit(query, 50)
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
  date: Date
}): Promise<string | null> {
  const scheduleIsReserved = await isReserved(data.patiendId, data.employeeId, data.date);
  if (!scheduleIsReserved) {
    const response = await store({ ...data });
    return response;
  }
  return "already reserved";
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
export async function isReserved(patientId: string, employeeId: string, timeDate: Date, appointmentTime?: number): Promise<boolean> {
  return await searchAppointment(patientId, employeeId, timeDate);
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

function makeAppointmentListResponse(appointments: AppointmentDTO[]): Appointment[] {
  return appointments.map<Appointment>(app => makeAppointmentResponse(app))
}