import {
  read,
  listLimit,
  readByForeignId,
  readByField,
  searchAppointment,
  store,
} from "./appointment.repository";
import {
  Appointment,
  AppointmentDTO,
  AppointmentState,
  Diagnostic,
  PaymentMethod,
  Reason,
} from "./appointment.types";

export async function getAppointmentById(
  id: string
): Promise<Appointment | null> {
  const appointment = await read(id);

  if (appointment) {
    return makeAppointmentResponse(appointment);
  }
  return null;
}

export async function getAllAppointments(
  query: {},
  limit: number
): Promise<Appointment[]> {
  const appointments = await listLimit(query, limit);
  return makeAppointmentListResponse(appointments);
}

// export async function getNextAppointment(
//   field: string,
//   id: string
// ): Promise<Appointment | null> {
//   const appointment = await readByForeignId(field, id);

//   if (appointment) {
//     return makeAppointmentResponse(appointment);
//   }
//   return null;
// }

export async function getAppointmentsByField(
  data: string | number | boolean,
  field: string
): Promise<Appointment[] | null> {
  const appointments = await readByField(data, field, 50);

  if (appointments) {
    return makeAppointmentListResponse(appointments);
  }
  return null;
}
export async function getAppointmentsByForeignId(
  field: string,
  id: string
): Promise<Appointment[] | null> {
  try {
    const appointments = await readByForeignId(field, id, 50);

    if (appointments) {
      return makeAppointmentListResponse(appointments);
    }
    return null;
  } catch (error) {
    throw error;
  }
}
export async function getAppointmentsInDateRange(query: {
  field: string;
  lt: Date;
  gte: Date;
}): Promise<Appointment[] | null> {
  return null;
}
export async function createAppointment(data: {
  patientId: string;
  ownerId: string;
  diagnostic: Diagnostic;
  employeeId: string;
  appointmentState: AppointmentState;
  observation: string;
  paymentMethod: PaymentMethod;
  reason: Reason;
  value: number;
  date: Date;
}): Promise<string | null> {
  const scheduleIsReserved = await isReserved(
    data.patientId,
    data.employeeId,
    data.date
  );
  if (!scheduleIsReserved) {
    try {
      const response = await store({
        ...data,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
  return "already reserved";
}
export async function updateAppointmentState(data: {
  id: string;
  appointmentState: AppointmentState;
}): Promise<string | null> {
  return null;
}
export async function updateAppointmentObservation(data: {
  id: string;
  observation: string;
}): Promise<string | null> {
  return null;
}
export async function deleteAppointment(data: {
  id: string;
}): Promise<string | null> {
  return null;
}
export async function isReserved(
  patientId: string,
  employeeId: string,
  timeDate: Date,
  appointmentTime?: number
): Promise<boolean> {
  return await searchAppointment(
    patientId,
    employeeId,
    timeDate,
    appointmentTime
  );
}

function makeAppointmentResponse(appointment: AppointmentDTO): Appointment {
  return {
    patientId: appointment.patientId,
    ownerId: appointment.ownerId,
    diagnostic: appointment.diagnostic,
    employeeId: appointment.employeeId,
    appointmentState: appointment.appointmentState,
    observation: appointment.observation,
    paymentMethod: appointment.paymentMethod,
    reason: appointment.reason,
    value: appointment.value,
    date: appointment.date,
  };
}

function makeAppointmentListResponse(
  appointments: AppointmentDTO[]
): Appointment[] {
  return appointments.map<Appointment>((app) => makeAppointmentResponse(app));
}
