import logger from "../../utils/logger";
import {
  read,
  listLimit,
  readByForeignId,
  readByField,
  searchAppointment,
  store,
  update,
  remove,
  updateState,
  insertDiagnostic,
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
  diagnostic: Diagnostic | undefined;
  employeeId: string;
  appointmentState: AppointmentState;
  observation: string;
  paymentMethod: PaymentMethod;
  reason: Reason;
  value: number;
  date: Date;
}): Promise<string | null> {
  const scheduleIsReserved = await isReserved(
    data.date,
    data.patientId,
    data.employeeId,
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

export async function updateAppointmentState(
  id: string,
  appointmentState: AppointmentState
): Promise<boolean> {
  const log = logger.child({ func: "updateAppointmentState", appId: id });
  try {
    const response = await updateState(id, appointmentState);
    return response;
  } catch (error) {
    log.error("error while updating appointment state");
    throw error;
  }
}

export async function insertDiagnosticAndAppState(data: {
  id: string;
  appointmentState: AppointmentState;
  diagnostic: Diagnostic;
}): Promise<boolean> {
  const log = logger.child({
    func: "insertDiagnosticAndAppState",
    appId: data.id,
  });
  try {
    const response = await insertDiagnostic({ ...data });
    return response;
  } catch (error) {
    log.error("error while updating appointment state");
    throw error;
  }
}

export async function updateAppointment(data: {
  id: string;
  employeeId: string;
  appointmentState: AppointmentState;
  paymentMethod: PaymentMethod;
  reason: Reason;
  value: number;
  observation: string;
  date: Date;
}): Promise<boolean> {
  const log = logger.child({ func: "updateAppointment", appId: data.id });
  try {
    const response = await update({
      ...data,
    });
    return response;
  } catch (error) {
    log.error("error while updating appointment");
    throw error;
  }
}

export async function deleteAppointment(id: string): Promise<boolean> {
  const log = logger.child({ func: "deleteAppointment", appId: id });
  try {
    const response = await remove(id);
    return response;
  } catch (error) {
    log.error("error while removing appointment");
    throw error;
  }
}

export async function isReserved(
  timeDate: Date,
  patientId?: string,
  employeeId?: string,
  appointmentTime?: number
): Promise<AppointmentDTO | null> {
  return await searchAppointment(
    timeDate,
    patientId,
    employeeId,
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
